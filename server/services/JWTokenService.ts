import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt@v0.9.0/create.ts";
import { validateJwt } from "https://deno.land/x/djwt@v0.9.0/validate.ts";
import { environment } from "../environment.ts";

export class JWTokenService {
  private key: string;

  constructor() {
    this.key = environment.jwtSecretKey;
  }

  public makeJWToken(user: string): string {
    const payload: Payload = {
      iss: "joe",
      exp: setExpiration(new Date().getTime() + 60000),
      user,
    };
    const header: Jose = { alg: "HS256", typ: "JWT" };

    return makeJwt({ header, payload, key: this.key });
  }

  public async validateJWToken(token: string) {
    return !!await validateJwt(token, this.key, { isThrowing: false });
  }
}
