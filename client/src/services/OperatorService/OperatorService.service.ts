import axios from "axios";
import environment from "@/environment";
import qs from "querystring";
import { OperatorResponse } from "@/models/Operators.model";

export default class OperatorService {
  public static async create({
    email,
  }: {
    email: string;
  }): Promise<OperatorResponse> {
    const url = `${environment.apiUrl}user/register`;

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const resParam = qs.stringify({
      login: email,
    });

    const { status, data } = await axios.post(url, resParam, config);

    if (!status) throw Error("Cannot get data from api");
    return data;
  }

  public static changeCodeToMessage(code: string) {
    let msg = "";

    if (code === "user.register.wrong.email") {
      msg = "Wrong e-mail!";
    }

    return msg;
  }

  public static async changePassword(token:string | null, password: string, remindPassword: string) {
    const url = `${environment.apiUrl}user/reset-password`;
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const resParam = qs.stringify({
      token, password, remindPassword
    });

    const { status, data } = await axios.post(url, resParam, config);

    if (!status) throw Error("Cannot get data from api");
    return data;
  }
}
