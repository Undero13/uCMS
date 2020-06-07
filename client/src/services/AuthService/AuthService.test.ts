import AuthService from "./AuthService.service";

describe("validate credentials", () => {
  test("validate is empty", () => {
    const credentials = {
      login: "",
      password: "",
    };
    const authService = new AuthService(credentials);
    const res = authService.validateForm();

    expect(res).toEqual({
      emptyLogin: true,
      emptyPassword: true,
      notValidLogin: true,
    });
  });

  test("login is not valid", () => {
    const credentials = {
      login: "test",
      password: "test123",
    };
    const authService = new AuthService(credentials);
    const res = authService.validateForm();

    expect(res).toEqual({
      emptyLogin: false,
      emptyPassword: false,
      notValidLogin: true,
    });
  });

  test("credentials valid", () => {
    const credentials = {
      login: "test@test.com",
      password: "test123",
    };
    const authService = new AuthService(credentials);
    const res = authService.validateForm();

    expect(res).toEqual({
      emptyLogin: false,
      emptyPassword: false,
      notValidLogin: false,
    });
  });
});

describe("change code to message", () => {
  const credentials = {
    login: "test@test.com",
    password: "test123",
  };
  const authService = new AuthService(credentials);
  const code1 = authService.changeCodeToMessage("user.login.empty.credentials");
  const code2 = authService.changeCodeToMessage("user.login.not.exist");
  const code3 = authService.changeCodeToMessage("user.login.wrong.password");

  expect(code1).toBe("Login and password are required!");
  expect(code2).toBe("User not exist!");
  expect(code3).toBe("Password is not correct!");
});
