import { Controller, Param, Post, Get, Patch, Body, Req, Injectable, UseHook } from "../deno_modules.ts";
import { OperatorCredentials, OperatorRegister, OperatorResetPassword, OperatorPermission } from "../models/ApiOperator.ts";
import { Response, ResponseData } from "../models/ApiResponse.ts";
import AuthService from "../services/AuthService.ts";
import JWTokenService from "../services/JWTokenService.ts";
import OperatorModel from "../db/OperatorModel.ts";
import { PermissionHooks } from "../hooks/PermissionHooks.ts";
import { environment } from "../environment.ts";

@Injectable()
@Controller("/api/operator")
export class OperatorController implements Response {
  constructor(private authService: AuthService, private jwtService: JWTokenService, private operatorModel: OperatorModel) {}

  @Post("/login")
  private async login(@Body() body: OperatorCredentials) {
    const isValid = await this.authService.validateCredentials(body);

    if (!isValid) {
      return this.setResponse(false, this.authService.getMessage());
    }

    const token = await this.jwtService.makeJWToken(body.login);
    return this.setResponse(true, "", [{ token }]);
  }

  @Post("/register")
  @UseHook(PermissionHooks, "operator.register")
  private async register(@Body() body: OperatorRegister) {
    const isValid = this.authService.validateRegisterData(body);

    if (!isValid) {
      return this.setResponse(false, this.authService.getMessage());
    }

    const id = await this.authService.createOperator(body);
    return this.setResponse(true, "", [{ id }]);
  }

  @Patch("/reset-password")
  private async resetPassword(@Body() body: OperatorResetPassword) {
    const { token, password, remindPassword } = body;
    const isTokenValid = await this.jwtService.validateJWToken(token);
    const isPasswordValid = this.authService.validatePassword(password, remindPassword);

    let success = false;

    if (isTokenValid && isPasswordValid) {
      const { payload } = await this.jwtService.decodeJWT(token);
      success = await this.authService.setPassword((<any>payload).operator, password);
    }

    const error = success ? "" : "operator.password.not.saved";
    return this.setResponse(success, error);
  }

  @Patch("/permission")
  @UseHook(PermissionHooks, "operator.permission")
  private async setPermission(@Body() body: OperatorPermission) {
    const status = await this.authService.setPermission(body);
    return this.setResponse(status, this.authService.getMessage());
  }

  @Get("/list/:limit/:skip")
  private async getList(@Param("limit") limit: string = "10", @Param("skip") skip: string = "0") {
    const limitInt = parseInt(limit, 10);
    const skipInt = parseInt(skip, 10);

    const operatorList = await this.operatorModel.getOperatorList(limitInt, skipInt);
    const operatorCount = await this.operatorModel.getOperatorCount();

    return this.setResponse(true, "", operatorList, Math.ceil(operatorCount / limitInt));
  }

  @Req()
  @Get("/search")
  private async getSearchList({ url }: { url: string }) {
    const operatorList = await this.operatorModel.getOperatorByData(url);
    return this.setResponse(true, "", operatorList);
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
