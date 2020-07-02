import { HookTarget, Context, Content } from "../deno_modules.ts";
import { getCookies } from "https://deno.land/std/http/cookie.ts";
import { environment } from "../environment.ts";
import JWTokenService from "../services/JWTokenService.ts";

type PayloadType = string;
type State = any;

export class PermissionHooks implements HookTarget<State, PayloadType> {
  async onPreAction(context: Context<State>, payload: PayloadType) {
    /**
     * off permission when test runing
     */
    const userAgent = context.request.headers.get("user-agent");

    if (!environment.prod && userAgent?.includes("Deno")) {
      return;
    }

    const token = context.request.headers.get("Authorization");
    const permission = await this.getPermission(token);
    const haveAccess = !!permission?.includes(payload);

    if (!haveAccess) {
      context.response.result = Content({ error: "access.denied" }, 403);
      context.response.setImmediately();
    }
  }

  private async getPermission(token: string | null) {
    if (!token) {
      return;
    }

    const jwtService = new JWTokenService();
    const { payload } = await jwtService.decodeJWT(token);
    return payload?.permission;
  }
}
