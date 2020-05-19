import { users } from "./connection.ts";
import { ApiUserCredentials } from "../model/ApiUserCredentials.ts";

export class UserModel {
  public static async getUser(
    userLogin: string,
  ): Promise<ApiUserCredentials | null> {
    return await users.findOne({ login: { $eq: userLogin } });
  }

  public static async createUser(
    login: string,
    password: string,
  ): Promise<string> {
    return await users.insertOne({
      login,
      password,
    });
  }
}
