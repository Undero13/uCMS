import { Controller, QueryParam, Post, Get, Patch, Body, Req, Injectable, UseHook } from "../deno_modules.ts";
import { UserCredentials, UserRegister, UserResetPassword, UserPermission } from "../models/ApiUser.ts";
import { Response, ResponseData } from "../models/ApiResponse.ts";
import { AuthService } from "../services/AuthService.ts";
import JWTokenService from "../services/JWTokenService.ts";
import UserModel from "../db/UserModel.ts";
import { PermissionHooks } from "../hooks/PermissionHooks.ts";

@Controller("/api/user")
@Injectable()
export class UserController implements Response {
  constructor(private authService: AuthService, private jwtService: JWTokenService, private userModel: UserModel) {}

  @Post("/login")
  @Body()
  private async login(body: UserCredentials) {
    if (!(await this.authService.validateCredentials(body))) {
      return this.setResponse(false, this.authService.getMessage());
    }

    const token = await this.jwtService.makeJWToken(body.login);
    return this.setResponse(true, "", [{ token }]);
  }

  @UseHook(PermissionHooks, "operator")
  @Post("/register")
  @Body()
  private async register(body: UserRegister) {
    if (!this.authService.validateRegisterData(body)) {
      return this.setResponse(false, this.authService.getMessage());
    }

    const id = await this.authService.createUser(body);
    return this.setResponse(true, "", [id]);
  }

  @Patch("/reset-password")
  @Body()
  private async resetPassword(body: UserResetPassword) {
    const { token, password, remindPassword } = body;
    const tokenValid = await this.jwtService.validateJWToken(token);
    const passwordValid = this.authService.validatePassword(password, remindPassword);

    let success = false;

    if (tokenValid && passwordValid) {
      const { payload } = await this.jwtService.decodeJWT(token);

      success = await this.authService.setPassword((<any>payload).user, password);
    }

    const error = success ? "" : "user.password.not.saved";
    return this.setResponse(success, error);
  }

  @UseHook(PermissionHooks, "operator")
  @Patch("/permission")
  @Body()
  private async setPermission(body: UserPermission) {
    const status = await this.authService.setPermission(body);
    return this.setResponse(status, this.authService.getMessage());
  }

  @Get("/list")
  @QueryParam("skip")
  @QueryParam("limit")
  private async getList(limit: string = "10", skip: string = "0") {
    const limitInt = parseInt(limit, 10);
    const skipInt = parseInt(skip, 10);

    const userList = await this.userModel.getUserList(limitInt, skipInt);
    const userCount = await this.userModel.getUserCount();

    return this.setResponse(true, "", userList, Math.ceil(userCount / limitInt));
  }

  @Get("/search")
  @Req()
  private async getSearchList({ url }: { url:string }) {
    const userList = await this.userModel.getUserByData(url);
    return this.setResponse(true, "", userList);
  }

  public setResponse(status = false, error = "", data: unknown[] = [], pageCount: number = 0): ResponseData {
    return { status, error, data, pageCount };
  }
}
