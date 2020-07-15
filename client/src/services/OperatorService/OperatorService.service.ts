import environment from "@/environment";
import qs from "querystring";
import { OperatorResponse } from "@/models/Operators.model";
import { AxiosService } from "../AxiosService/AxiosService.service";

export default class OperatorService {
  public static async create({
    email,
  }: {
    email: string;
  }): Promise<OperatorResponse> {
    const url = `${environment.apiUrl}operator/register`;

    const resParam = qs.stringify({
      login: email,
    });

    const { status, data } = await AxiosService.post(url, resParam);

    if (!status) throw Error("Cannot get data from api");
    return data;
  }

  public static changeCodeToMessage(code: string) {
    let msg = "";

    if (code === "operator.register.wrong.email") {
      msg = "Wrong e-mail!";
    }

    return msg;
  }

  public static async changePassword(
    token: string | null,
    password: string,
    remindPassword: string
  ) {
    const url = `${environment.apiUrl}operator/reset-password`;

    const resParam = qs.stringify({
      token,
      password,
      remindPassword,
    });

    const { status, data } = await AxiosService.patch(url, resParam);

    if (!status) throw Error("Cannot get data from api");
    return data;
  }
}
