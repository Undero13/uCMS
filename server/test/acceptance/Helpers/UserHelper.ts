import { users } from "../../../db/connection.ts";
import { AuthService } from "../../../services/AuthService.ts";
import JWTokenService from "../../../services/JWTokenService.ts";

export default class UserHelper {
  public static async removeUser(user: string) {
    await users.deleteOne({ login: user });
  }

  public static async createRandomUser() {
    const authService = new AuthService();
    const jwTokenService = new JWTokenService();
    const login = `test${Math.floor(Math.random() * 500)}@test.eu`;

    await authService.createUser(
      { login },
    );
    return { login, token: await jwTokenService.makeJWToken(login) };
  }
}
