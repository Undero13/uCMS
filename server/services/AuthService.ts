import { OperatorRegister, OperatorCredentials, OperatorPermission } from "../models/ApiOperator.ts";
import { bcrypt } from "../deno_modules.ts";
import OperatorModel from "../db/OperatorModel.ts";
import { environment } from "../environment.ts";

export default class AuthService {
  private msg: string;

  constructor() {
    this.msg = "";
  }

  public async validateCredentials(operatorData: OperatorCredentials): Promise<boolean> {
    const { login, password } = operatorData;

    if (!login || !password) {
      this.msg = "operator.login.empty.credentials";
      return !this.msg;
    }

    const operator = await OperatorModel.getOperator(login);

    if (operator) {
      this.msg = this.passwordVerify(password, operator.password) ? "" : "operator.login.wrong.password";
      return !this.msg;
    }

    this.msg = "operator.login.not.exist";
    return !this.msg;
  }

  public validateRegisterData(operatorData: OperatorRegister): boolean {
    const { login } = operatorData;

    if (!this.validateEmail(login)) {
      this.msg = "operator.register.wrong.email";
      return false;
    }

    return true;
  }

  public async setPermission(data: OperatorPermission) {
    const { login, permission } = data;
    const operator = await OperatorModel.getOperator(login);

    if (operator) {
      const permissionArray = permission.split(",");
      const existingPermission = permissionArray.filter(name => environment.permissionList.includes(name));

      OperatorModel.setPermission(login, existingPermission);
      return true;
    }

    this.msg = "operator.not.exist";
    return false;
  }

  public async createOperator(operatorData: OperatorRegister): Promise<string> {
    const { login } = operatorData;
    const operator = await OperatorModel.getOperator(login);

    if (operator) {
      throw Error("Operator already exists");
    }

    return await OperatorModel.createOperator(login, this.genPasswordHash(login));
  }

  public async setPassword(login: string, password: string): Promise<boolean> {
    const hash = this.genPasswordHash(password);
    return await OperatorModel.setPassword(login, hash);
  }

  public getMessage(): string {
    return this.msg;
  }

  public validatePassword(password: string, repeatPassword: string): boolean {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return !!(pattern.test(password) && password === repeatPassword);
  }

  private validateEmail(email: string): boolean {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return pattern.test(email);
  }

  private genPasswordHash(password: string) {
    return bcrypt.hashSync(password);
  }

  private passwordVerify(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
