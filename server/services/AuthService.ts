import { UserRegister, UserCredentials } from "../models/ApiUser.ts";
import { bcrypt } from "../deno_modules.ts";
import UserModel from "../db/UserModel.ts";

export class AuthService {
  private msg: string;

  constructor() {
    this.msg = "";
  }

  public async validateCredentials(
    userData: UserCredentials,
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

  public validateRegisterData(userData: UserRegister): boolean {
    const { login } = userData;

    if (!this.validateEmail(login)) {
      this.msg = "user.register.wrong.email";
      return false;
    }

    return true;
  }

  public async createUser(userData: UserRegister): Promise<string> {
    const { login } = userData;
    const user = await UserModel.getUser(login);

    if (user) {
      throw Error("User already exists");
    }

    return await UserModel.createUser(login, this.genPasswordHash(login));
  }

  public getMessage(): string {
    return this.msg;
  }

  private genPasswordHash(password: string) {
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
