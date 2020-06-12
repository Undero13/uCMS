export type UserCredentials = {
  login: string;
  password: string;
};

export type UserRegister = {
  login: string;
};

export type UserDbRecord = {
  id: string;
  login: string;
  password: string;
};

export type UserResetPassword = {
  token: string;
  password: string;
  remindPassword: string;
};
