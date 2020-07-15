import { operators } from "../../../db/connection.ts";
import AuthService from "../../../services/AuthService.ts";
import JWTokenService from "../../../services/JWTokenService.ts";

export default class OperatorHelper {
  public static async removeOperator(operator: string) {
    await operators.deleteOne({ login: operator });
  }

  public static async createRandomOperator() {
    const authService = new AuthService();
    const jwTokenService = new JWTokenService();
    const login = `test${Math.floor(Math.random() * 500)}@test.eu`;

    await authService.createOperator({ login });
    return { login, token: await jwTokenService.makeJWToken(login) };
  }
}
