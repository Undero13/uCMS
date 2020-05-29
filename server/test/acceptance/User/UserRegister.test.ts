import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import UserHelper from "../Helpers/UserHelper.ts";

const ContentTypeJson = "application/json; charset=utf-8";
const baseUrl = "http://localhost:3000/api/user/register";

Deno.test("[http] user.register.wrong.password", async () => {
  const response = await fetch(baseUrl, { method: "POST" });
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(
    data,
    { "status": false, "error": "user.register.wrong.email", data: [] },
  );
});

Deno.test("[http] user.register.ok", async () => {
  await UserHelper.removeUser("admin@admin.com");

  const requestArgument = {
    login: "admin@admin.com",
    password: "adminPassword123",
    repeatPassword: "adminPassword123",
  };
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestArgument),
  });
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data.status, true);
  assertEquals(data.error, "");
  assertEquals(!!data.data.length, true);
});
