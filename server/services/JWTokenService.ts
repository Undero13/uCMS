import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
  validateJwt,
  parseAndDecode,
} from "../deno_modules.ts";
import { environment } from "../environment.ts";

export default class JWTokenService {
  private key: string;

  constructor() {
    this.key = environment.jwtSecretKey;
  }

  public makeJWToken(user: string): string {
    const payload: Payload = {
      iss: "joe",
      exp: setExpiration(new Date().getTime() + 6000000000),
      user,
    };
    const header: Jose = { alg: "HS256", typ: "JWT" };

    return makeJwt({ header, payload, key: this.key });
  }

  public async validateJWToken(token: string): Promise<boolean> {
    return !!await validateJwt(token, this.key, { isThrowing: false });
  }

  public async decodeJWT(token: string) {
    return await parseAndDecode(token);
  }
}
