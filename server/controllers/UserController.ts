import {
  Controller,
  Post,
  Body,
} from "https://deno.land/x/alosaur/src/mod.ts";
import { environment } from "../environment.ts";
import { ApiUserCredentials } from "../model/ApiUserCredentials.ts";

@Controller("/api/user")
export class UserController {
  @Post("/login") @Body()
  login(body: ApiUserCredentials) {
    return body;
  }

  @Post("/register")
  register() {
    return { text: "test" };
  }
}
