import { assertEquals } from "../../../deno_modules.ts";

const ContentTypeJson = "application/json; charset=utf-8";
const baseUrl = "http://localhost:3000/api/user/login";

Deno.test("[http] user login empty.credentials", async () => {
  const response = await fetch(baseUrl, { method: "POST" });
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data, {
    status: false,
    error: "user.login.empty.credentials",
    data: [],
    pageCount: 0
  });
});

Deno.test("[http] user login user.not.exist", async () => {
  const requestArgument = {
    login: "test@test.pl",
    password: "123"
  };
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestArgument)
  });
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data, {
    status: false,
    error: "user.login.not.exist",
    data: [],
    pageCount: 0
  });
});

Deno.test("[http] user login wrong.password", async () => {
  const requestArgument = {
    login: "admin@admin.com",
    password: "fakePassword"
  };
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestArgument)
  });
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data, {
    status: false,
    error: "user.login.wrong.password",
    data: [],
    pageCount: 0
  });
});

Deno.test("[http] user correct login", async () => {
  const requestArgument = {
    login: "admin@admin.com",
    password: "admin@admin.com"
  };
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestArgument)
  });
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data.status, true);
  assertEquals(data.error, "");
  assertEquals(!!data.data[0].token, true);
});
