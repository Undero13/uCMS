import { assertEquals } from "https://deno.land/x/alosaur/src/package_test.ts";

const ContentTypeJson = "application/json; charset=utf-8";
const baseUrl = "http://localhost:3000/api/user/login";

Deno.test("[http] user login empty.credentials", async () => {
  const response = await fetch(baseUrl, { method: "POST" });
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(
    data,
    { "status": false, "error": "user.login.empty.credentials" },
  );
});

Deno.test("[http] user login user.not.exist", async () => {
  const requestArgument = {
    login: "test@test.pl",
    password: "123",
  };
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestArgument),
  });
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data, { "status": false, "error": "user.login.not.exist" });
});

Deno.test("[http] user login wrong.password", async () => {
  const requestArgument = {
    login: "admin@admin.com",
    password: "fakePassword",
  };
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestArgument),
  });
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data, { "status": false, "error": "user.login.wrong.password" });
});

Deno.test("[http] user correct login correct", async () => {
  const requestArgument = {
    login: "admin@admin.com",
    password: "123",
  };
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestArgument),
  });
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data, { "status": true, "error": "" });
});
