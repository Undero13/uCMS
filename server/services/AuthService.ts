import { users } from "../db/fakeDB.ts";
import { ApiUserRegister } from "../model/ApiUserRegister.ts";
import { ApiUserCredentials } from "../model/ApiUserCredentials.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { environment } from "../environment.ts";

export class AuthService {
  private msg: string;

  constructor() {
    this.msg = "";
  }

  public validateCredentials(userData: ApiUserCredentials): boolean {
    const { login: userLogin = '', password = "" } = userData;

    if (!userLogin || !password) {
      this.msg = "user.login.empty.credentials";
      return !this.msg;
    }

    const user = users.find(({ login }) => login === userLogin);

    if (user) {
      this.msg = user.password === password ? "" : "user.login.wrong.password";
      return !this.msg;
    }

    this.msg = "user.login.not.exist";
    return !this.msg;
  }

  public validateRegisterData(userData: ApiUserRegister): boolean {
    const {
      login: userLogin = '',
      password = "",
      repeatPassword = "",
    } = userData;

    if (!this.validateEmail(userLogin)) {
      this.msg = "user.register.wrong.email";
      return false;
    } else if (!this.validatePassword(password, repeatPassword)) {
      this.msg = "user.register.wrong.password";
      return false;
    }

    return true;
  }

  public getMessage(): string {
    return this.msg;
  }

  // Tu biblioteka wali błedami z jakiegoś powodu - możliwe że env za długi
  public genPasswordHash(password: string) {
    const salt = bcrypt.gensalt(environment.hashSalt);
    return bcrypt.hashpw(password, salt);
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
