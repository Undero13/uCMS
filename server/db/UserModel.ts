import { users } from "./connection.ts";
import { UserCredentials } from "../models/ApiUser.ts";
import { UserDbRecord } from "../models/ApiUser.ts";
import { uuid } from "../deno_modules.ts";

export default class UserModel {
  public static async getUser(userLogin: string): Promise<UserCredentials | null> {
    return await users.findOne({ login: { $eq: userLogin } });
  }

  public async getUserByData(url: string) {
    const [key, value] = url.substring(url.lastIndexOf("?") + 1).split("=");
    const userList: UserDbRecord[] = await users.find({ [key]: { $eq: value } });
    const mappedUserList = userList.map(user => ({
      id: user.id,
      login: user.login
    }));

    return mappedUserList;
  }

  public async getUserList(limit: number, skip: number) {
    const userList: UserDbRecord[] = await users.find({ login: { $ne: null } }, { limit, skip });
    const mappedUserList = userList.map(user => ({
      id: user.id,
      login: user.login
    }));

    return mappedUserList;
  }

  public async getUserCount() {
    const count = await users.count({ login: { $ne: null } });
    return count;
  }

  public static async getUserPermission(login: string): Promise<string[]> {
    const userData = await users.findOne({ login: { $eq: login } });
    return userData.permission;
  }

  public static async createUser(login: string, password: string): Promise<string> {
    const id = uuid();

    return await users.insertOne({
      id,
      login,
      password,
      permission: []
    });
  }

  public static async setPermission(login: string, permission: string[]) {
    const { matchedCount, modifiedCount } = await users.updateOne({ login: { $eq: login } }, { $set: { permission } });
  }

  public static async setPassword(login: string, password: string): Promise<boolean> {
    const { matchedCount, modifiedCount } = await users.updateOne({ login: { $eq: login } }, { $set: { password } });

    if (matchedCount === modifiedCount) {
      return true;
    }

    return false;
  }
}
