import { assertEquals } from "../../../deno_modules.ts";
import OperatorHelper from "../Helpers/OperatorHelper.ts";

const baseUrl = "http://localhost:3000/api/operator/reset-password";

Deno.test("[http] operator.reset.password.valid", async () => {
  const operator = await OperatorHelper.createRandomOperator();

  const requestArgument = {
    token: operator.token,
    password: "testPassword1234",
    remindPassword: "testPassword1234"
  };
  const response = await fetch(baseUrl, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestArgument)
  });

  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data, { status: true, error: "", data: [], pageCount: 0 });
});
