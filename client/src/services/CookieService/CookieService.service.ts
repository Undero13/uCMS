import cookie from "browser-cookies";
import environment from "@/environment.ts";

export default class CookieService {
  public static isLogged(): boolean {
    return !!cookie.get(environment.jwtCookieName);
  }

  public static getJWToken(): string | null {
    return cookie.get(environment.jwtCookieName);
  }

  public static setToken(token: string) {
    cookie.set(environment.jwtCookieName, token);
  }

  public static deleteToken() {
    cookie.erase(environment.jwtCookieName);
  }
}
