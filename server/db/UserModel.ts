import { users } from "./connection.ts";
import { UserCredentials } from "../models/ApiUser.ts";
import { UserDbRecord } from "../models/ApiUser.ts";
import { uuid } from "../deno_modules.ts";

export default class UserModel {
  public static async getUser(
    userLogin: string,
  ): Promise<UserCredentials | null> {
    return await users.findOne({ login: { $eq: userLogin } });
  }

  public static async createUser(
    login: string,
    password: string,
  ): Promise<string> {
    const id = uuid();

    return await users.insertOne({
      id,
      login,
      password,
    });
  }

  public async getUserList() {
    const userList: UserDbRecord[] = await users.find(
      { login: { $ne: null } },
    );

    const mappedUserList = userList.map((user) => ({
      id: user.id,
      login: user.login,
    }));
    return mappedUserList;
  }

  public static async setPassword(
    login: string,
    password: string,
  ): Promise<boolean> {
    const { matchedCount, modifiedCount, upsertedId } = await users.updateOne(
      { login: { $eq: login } },
      { $set: { password } },
    );

    if (matchedCount === modifiedCount) {
      return true;
    }

    return false;
  }
}
