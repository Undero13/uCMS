import { users } from "../../../db/connection.ts";

export default class UserHelper {
  public static async removeUser(user: string) {
    await users.deleteOne({ login: user });
  }
}
