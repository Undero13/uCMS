import { operators } from "./connection.ts";
import { OperatorCredentials } from "../models/ApiOperator.ts";
import { OperatorDbRecord } from "../models/ApiOperator.ts";
import { uuid } from "../deno_modules.ts";

export default class OperatorModel {
  public static async getOperator(operatorLogin: string): Promise<OperatorCredentials | null> {
    return await operators.findOne({ login: { $eq: operatorLogin } });
  }

  public async getOperatorByData(url: string) {
    const [key, value] = url.substring(url.lastIndexOf("?") + 1).split("=");
    const operatorList: OperatorDbRecord[] = await operators.find({ [key]: { $eq: value } });
    const mappedOperatorList = operatorList.map(operator => ({
      id: operator.id,
      login: operator.login
    }));

    return mappedOperatorList;
  }

  public async getOperatorList(limit: number, skip: number) {
    const operatorList: OperatorDbRecord[] = await operators.find({ login: { $ne: null } }, { limit, skip });
    const mappedOperatorList = operatorList.map(operator => ({
      id: operator.id,
      login: operator.login
    }));

    return mappedOperatorList;
  }

  public async getOperatorCount() {
    const count = await operators.count({ login: { $ne: null } });
    return count;
  }

  public static async getOperatorPermission(login: string): Promise<string[]> {
    const operatorData = await operators.findOne({ login: { $eq: login } });
    return operatorData.permission;
  }

  public static async createOperator(login: string, password: string): Promise<string> {
    const id = uuid();

    return await operators.insertOne({
      id,
      login,
      password,
      permission: []
    });
  }

  public static async setPermission(login: string, permission: string[]) {
    const { matchedCount, modifiedCount } = await operators.updateOne({ login: { $eq: login } }, { $set: { permission } });
  }

  public static async setPassword(login: string, password: string): Promise<boolean> {
    const { matchedCount, modifiedCount } = await operators.updateOne({ login: { $eq: login } }, { $set: { password } });

    if (matchedCount === modifiedCount) {
      return true;
    }

    return false;
  }
}
