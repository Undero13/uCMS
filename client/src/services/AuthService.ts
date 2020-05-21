import cookie from 'browser-cookies'
import { environment } from '../environment'

export class AuthService {
  public static isLogged(): boolean {
    return !!cookie.get(environment.jwtCookieName)
  }
}