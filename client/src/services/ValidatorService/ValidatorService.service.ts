export default class ValidatorService {
  static required(value: string) {
    return !!value.length;
  }

  static isEmail(value: string) {
    const pattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return pattern.test(value);
  }
}
