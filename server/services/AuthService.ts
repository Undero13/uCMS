import { users } from "../db/fakeDB.ts";

export class AuthService {
  private msg: string;

  constructor() {
    this.msg = "";
  }

  public validateCredentials(
    { login: userLogin = '', password = "" },
  ): boolean {
    if (!userLogin || !password) {
      this.msg = "empty.credentials";
      return !this.msg;
    }

    const user = users.find(({ login }) => login === userLogin);

    if (user) {
      this.msg = user.password === password ? "" : "wrong.password";
      return !this.msg;
    }

    this.msg = "user.not.exist";
    return !this.msg;
  }

  public getMessage(): string {
    return this.msg;
  }
}
