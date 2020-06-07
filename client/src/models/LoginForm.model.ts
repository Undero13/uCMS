export interface LoginFormData {
  login: string;
  password: string;
}

export interface LoginFromErrors {
  emptyLogin: boolean;
  emptyPassword: boolean;
  notValidLogin: boolean;
}

export interface LoginFormResponse {
  status: number;
  data: {
    error: string;
    status: boolean;
    data: Array<any>;
  };
}
