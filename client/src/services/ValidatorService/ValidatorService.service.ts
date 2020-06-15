export default class ValidatorService {
  static required(value: string) {
    return !!value.length;
  }

  static isEmail(value: string) {
    const pattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return pattern.test(value);
  }

  static isPassword(value: string) {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    return pattern.test(value);
  }
}
