import { assertEquals } from "../../../deno_modules.ts";
import UserHelper from "../Helpers/UserHelper.ts";

const baseUrl = "http://localhost:3000/api/user/reset-password";

Deno.test("[http] user.reset.password.valid", async () => {
  const user = await UserHelper.createRandomUser();

  const requestArgument = {
    token: user.token,
    password: "testPassword1234",
    remindPassword: "testPassword1234",
  };
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestArgument),
  });

  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(
    data,
    { status: true, error: "", data: [], pageCount: 0 },
  );
});
