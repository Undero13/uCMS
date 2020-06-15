import OperatorService from "./OperatorService.service";

test("it can return corect code", () => {
  expect(OperatorService.changeCodeToMessage("user.register.wrong.email")).toBe(
    "Wrong e-mail!"
  );
});
