export type UserCredentials = {
  login: string;
  password: string;
};

export type UserRegister = {
  login: string;
  password?: string;
  repeatPassword?: string;
};

export type UserDbRecord = {
  id: string;
  login: string;
  password: string;
};
