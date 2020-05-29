import cookie from 'browser-cookies';
import environment from '@/environment.ts';
import { LoginFormData, LoginFromErrors, LoginFormResponse } from '@/models/LoginForm.model.ts';
import axios from 'axios';
import qs from 'querystring';

export default class AuthService {
  private login: string;

  private password: string;

  constructor(data: LoginFormData) {
    this.login = data.login;
    this.password = data.password;
  }

  public static isLogged(): boolean {
    return !!cookie.get(environment.jwtCookieName);
  }

  public validateForm(): LoginFromErrors {
    const errors = {
      emptyLogin: false,
      emptyPassword: false,
      notValidLogin: false,
    };

    /* eslint-disable no-useless-escape */
    const loginPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    if (!this.login) {
      errors.emptyLogin = true;
    }

    if (!this.login.match(loginPattern)) {
      errors.notValidLogin = true;
    }

    if (!this.password) {
      errors.emptyPassword = true;
    }

    return errors;
  }

  public async loginRequest(): Promise<LoginFormResponse> {
    const url = `${environment.apiUrl}user/login`;
    const credentials = {
      login: this.login,
      password: this.password,
    };

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const res = await axios.post(url, qs.stringify(credentials), config);
    return res;
  }

  public changeCodeToMessage(code: string) {
    let msg = '';

    if (code === 'user.login.empty.credentials') {
      msg = "Login and password are required!";
    } else if (code === 'user.login.not.exist') {
      msg = "User not exist!";
    } else if (code === 'user.login.wrong.password') {
      msg = "Password is not correct!";
    }

    return msg;
  }
}
