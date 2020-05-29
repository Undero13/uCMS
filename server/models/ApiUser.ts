export type ApiUserCredentials = {
  login: string;
  password: string;
};

export type ApiUserRegister = {
  login: string;
  password?: string;
  repeatPassword?: string;
};

export type UserDbRecord = {
  id: string;
  login: string;
  password: string;
};
