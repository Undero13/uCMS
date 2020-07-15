import OperatorService from "./OperatorService.service.ts";

test("it can return corect code", () => {
  expect(
    OperatorService.changeCodeToMessage("operator.register.wrong.email")
  ).toBe("Wrong e-mail!");
});
