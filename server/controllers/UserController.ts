import { Controller, Post, Get, Body, Injectable } from "../deno_modules.ts";
import { UserCredentials, UserRegister } from "../models/ApiUser.ts";
import { Response, ResponseData } from "../models/ApiResponse.ts";
import { AuthService } from "../services/AuthService.ts";
import JWTokenService from "../services/JWTokenService.ts";
import UserModel from "../db/UserModel.ts";

@Controller("/api/user") @Injectable()
export class UserController implements Response {
  constructor(
    private authService: AuthService,
    private jwtService: JWTokenService,
    private userModel: UserModel,
  ) {}

  @Post("/login") @Body()
  private async login(body: UserCredentials) {
    if (!await this.authService.validateCredentials(body)) {
      return this.setResponse(false, this.authService.getMessage());
    }

    const token = this.jwtService.makeJWToken(body.login);
    return this.setResponse(true, "", [{ token }]);
  }

  @Post("/register") @Body()
  private async register(body: UserRegister) {
    if (!this.authService.validateRegisterData(body)) {
      return this.setResponse(false, this.authService.getMessage());
    }

    const id = await this.authService.createUser(body);
    return this.setResponse(true, "", [id]);
  }

  @Get("/list")
  private async getList() {
    const userList = await this.userModel.getUserList();
    return this.setResponse(true, "", userList);
  }

  setResponse(status = false, error = "", data: unknown[] = []): ResponseData {
    return { status, error, data };
  }
}
