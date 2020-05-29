import { UserModel } from "../db/UserModel.ts";
import { ApiUserRegister } from "../model/ApiUserRegister.ts";
import { ApiUserCredentials } from "../model/ApiUserCredentials.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.1/mod.ts";

export class AuthService {
  private msg: string;

  constructor() {
    this.msg = "";
  }

  public async validateCredentials(
    userData: ApiUserCredentials,
  ): Promise<boolean> {
    const { login, password } = userData;

    if (!login || !password) {
      this.msg = "user.login.empty.credentials";
      return !this.msg;
    }

    const user = await UserModel.getUser(login);

    if (user) {
      this.msg = this.passwordVerify(password, user.password)
        ? ""
        : "user.login.wrong.password";
      return !this.msg;
    }

    this.msg = "user.login.not.exist";
    return !this.msg;
  }

  public validateRegisterData(userData: ApiUserRegister): boolean {
    const { login, password, repeatPassword } = userData;

    if (!this.validateEmail(login)) {
      this.msg = "user.register.wrong.email";
      return false;
    } else if (!this.validatePassword(password, repeatPassword)) {
      this.msg = "user.register.wrong.password";
      return false;
    }

    return true;
  }

  public async createUser(userData: ApiUserRegister): Promise<string> {
    const { login, password } = userData;
    return await UserModel.createUser(login, this.genPasswordHash(password));
  }

  public getMessage(): string {
    return this.msg;
  }

  public genPasswordHash(password: string) {
    return bcrypt.hashSync(password);
  }

  private passwordVerify(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  private validateEmail(email: string): boolean {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return pattern.test(email);
  }

  private validatePassword(password: string, repeatPassword: string): boolean {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return !!(pattern.test(password) && password === repeatPassword);
  }
}
