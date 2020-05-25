import cookie from 'browser-cookies'
import { environment } from '../environment'
import { LoginFormData, LoginFromErrors } from '../models/LoginForm';
import axios from 'axios';
import qs from 'querystring'

export class AuthService {

  private login: string;
  private password: string;

  constructor(data: LoginFormData) {
    this.login = data.login
    this.password = data.password;
  }

  public static isLogged(): boolean {
    return !!cookie.get(environment.jwtCookieName)
  }

  public validateForm(): LoginFromErrors {
    const errors = {
      emptyLogin: false,
      emptyPassword: false,
      notValidLogin: false
    }

    const loginPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    if (!this.login) {
      errors.emptyLogin = true;
    }

    if (!this.login.match(loginPattern)) {
      errors.notValidLogin = true;
    }

    if(!this.password) {
      errors.emptyPassword = true;
    }

    return errors;
  }

  public loginRequest() {
    const url = `${environment.apiUrl}user/login`
    const credentials = {
      login: this.login,
      password: this.password
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    console.log(axios.post(url, qs.stringify(credentials), config))
  }
}