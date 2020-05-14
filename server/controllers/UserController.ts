import {
  Controller,
  Post,
  Body,
  Injectable,
} from "https://deno.land/x/alosaur/src/mod.ts";
import { setCookie } from "https://deno.land/std/http/cookie.ts";
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
  private login(body: ApiUserCredentials) {
    if (!this.authService.validateCredentials(body)) {
      return this.setResponse(false, this.authService.getMessage());
    }

    const token = this.jwtService.makeJWToken(body.login);
    setCookie({}, { name: this.cookieName, value: token });

    return this.setResponse(true, "");
  }

  @Post("/register") @Body()
  private register(body: ApiUserRegister) {
    if (this.authService.validateRegisterData(body)) {
      this.authService.genPasswordHash(body.password);
      return this.setResponse(true, "");
    }

    return this.setResponse(false, this.authService.getMessage());
  }

  private setResponse(status: boolean, error: string = "") {
    return {
      status,
      error,
    };
  }
}
