import CookieService from "./CookieService.service";

describe("cookie service", () => {
  test("operator not logged - cookie not exist", () => {
    expect(CookieService.isLogged()).toBeFalsy();
  });

  test("set operator token - cookie exist", () => {
    const randomToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    CookieService.setToken(randomToken);
    expect(CookieService.isLogged()).toBeTruthy();
  });
});
