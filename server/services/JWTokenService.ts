import { makeJwt, setExpiration, Jose, Payload, validateJwt, parseAndDecode } from "../deno_modules.ts";
import { environment } from "../environment.ts";
import { Jwt } from "../models/ApiJwtToken.ts";
import OperatorModel from "../db/OperatorModel.ts";

export default class JWTokenService {
  private key: string;

  constructor() {
    this.key = environment.jwtSecretKey;
  }

  public async makeJWToken(operator: string): Promise<string> {
    const permission = await OperatorModel.getOperatorPermission(operator);

    const payload: Payload = {
      iss: "joe",
      exp: setExpiration(new Date().getTime() + 6000000000),
      operator,
      permission
    };
    const header: Jose = { alg: "HS256", typ: "JWT" };

    return makeJwt({ header, payload, key: this.key });
  }

  public async validateJWToken(token: string): Promise<boolean> {
    return !!(await validateJwt(token, this.key, { isThrowing: true }));
  }

  public async decodeJWT(token: string): Promise<Jwt> {
    return <any>await parseAndDecode(token);
  }
}
