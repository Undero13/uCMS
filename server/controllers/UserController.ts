import { Controller, Param, Post, Get, Patch, Body, Req, Injectable, UseHook } from "../deno_modules.ts";
import { UserCredentials, UserRegister, UserResetPassword, UserPermission } from "../models/ApiUser.ts";
import { Response, ResponseData } from "../models/ApiResponse.ts";
import AuthService from "../services/AuthService.ts";
import JWTokenService from "../services/JWTokenService.ts";
import UserModel from "../db/UserModel.ts";
import { PermissionHooks } from "../hooks/PermissionHooks.ts";
import { environment } from "../environment.ts";

@Injectable()
@Controller("/api/user")
export class UserController implements Response {
  constructor(private authService: AuthService, private jwtService: JWTokenService, private userModel: UserModel) {}

  @Post("/login")
  private async login(@Body() body: UserCredentials) {
    const isValid = await this.authService.validateCredentials(body);

    if (!isValid) {
      return this.setResponse(false, this.authService.getMessage());
    }

    const token = await this.jwtService.makeJWToken(body.login);
    return this.setResponse(true, "", [{ token }]);
  }

  @Post("/register")
  @UseHook(PermissionHooks, "operator.register")
  private async register(@Body() body: UserRegister) {
    const isValid = this.authService.validateRegisterData(body);

    if (!isValid) {
      return this.setResponse(false, this.authService.getMessage());
    }

    const id = await this.authService.createUser(body);
    return this.setResponse(true, "", [{ id }]);
  }

  @Patch("/reset-password")
  private async resetPassword(@Body() body: UserResetPassword) {
    const { token, password, remindPassword } = body;
    const isTokenValid = await this.jwtService.validateJWToken(token);
    const isPasswordValid = this.authService.validatePassword(password, remindPassword);

    let success = false;

    if (isTokenValid && isPasswordValid) {
      const { payload } = await this.jwtService.decodeJWT(token);
      success = await this.authService.setPassword((<any>payload).user, password);
    }

    const error = success ? "" : "user.password.not.saved";
    return this.setResponse(success, error);
  }

  @Patch("/permission")
  @UseHook(PermissionHooks, "operator.permission")
  private async setPermission(@Body() body: UserPermission) {
    const status = await this.authService.setPermission(body);
    return this.setResponse(status, this.authService.getMessage());
  }

  @Get("/list/:limit/:skip")
  private async getList(@Param("limit") limit: string = "10", @Param("skip") skip: string = "0") {
    const limitInt = parseInt(limit, 10);
    const skipInt = parseInt(skip, 10);

    const userList = await this.userModel.getUserList(limitInt, skipInt);
    const userCount = await this.userModel.getUserCount();

    return this.setResponse(true, "", userList, Math.ceil(userCount / limitInt));
  }

  @Req()
  @Get("/search")
  private async getSearchList({ url }: { url: string }) {
    const userList = await this.userModel.getUserByData(url);
    return this.setResponse(true, "", userList);
  }

  @Get("/list/permission")
  @UseHook(PermissionHooks, "operator.permission")
  private async getPermissionList() {
    return this.setResponse(true, "", environment.permissionList);
  }

  public setResponse(status = false, error = "", data: unknown[] = [], pageCount: number = 0): ResponseData {
    return { status, error, data, pageCount };
  }
}
