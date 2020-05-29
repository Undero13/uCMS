import {
  Controller,
  Post,
  Get,
  Body,
  Injectable,
} from "https://deno.land/x/alosaur@v0.12.2/src/mod.ts";
import { setCookie, delCookie } from "https://deno.land/std/http/cookie.ts";
import { environment } from "../environment.ts";
import { ApiUserCredentials } from "../model/ApiUserCredentials.ts";
import { ApiUserRegister } from "../model/ApiUserRegister.ts";
import { AuthService } from "../services/AuthService.ts";
import { JWTokenService } from "../services/JWTokenService.ts";

@Controller("/api/user") @Injectable()
export class UserController {
  private cookieName: string;

  constructor(
    private authService: AuthService,
    private jwtService: JWTokenService,
  ) {
    this.cookieName = environment.jwtCookieName;
  }

  @Post("/login") @Body()
  private async login(body: ApiUserCredentials) {
    if (!await this.authService.validateCredentials(body)) {
      return this.setResponse(false, this.authService.getMessage());
    }

    const token = this.jwtService.makeJWToken(body.login);
    setCookie({}, { name: this.cookieName, value: token, httpOnly: true });

    return this.setResponse(true);
  }

  @Post("/register") @Body()
  private async register(body: ApiUserRegister) {
    if (this.authService.validateRegisterData(body)) {
      const id = await this.authService.createUser(body);
      return this.setResponse(true, "", [id]);
    }

    return this.setResponse(false, this.authService.getMessage());
  }

  @Get("/logout")
  private userList() {
  }

  @Get("/logout")
  private logout() {
    delCookie({}, this.cookieName);
    return this.setResponse(true);
  }

  private setResponse(
    status = false,
    error = "",
    extraParams: unknown[] = [],
  ) {
    return {
      status,
      error,
      extraParams,
    };
  }
}
