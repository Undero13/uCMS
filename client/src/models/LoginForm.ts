export interface LoginFormData {
  login:string
  password:string
}

export interface LoginFromErrors {
  emptyLogin: boolean,
  emptyPassword: boolean,
  notValidLogin: boolean
}