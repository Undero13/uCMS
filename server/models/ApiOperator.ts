export type OperatorCredentials = {
  login: string;
  password: string;
};

export type OperatorRegister = {
  login: string;
};

export type OperatorDbRecord = {
  id: string;
  login: string;
  permission: string[];
  password: string;
};

export type OperatorResetPassword = {
  token: string;
  password: string;
  remindPassword: string;
};

export type OperatorPermission = {
  login: string;
  permission: string;
};
