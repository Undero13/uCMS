import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const ContentTypeJson = "application/json; charset=utf-8";
const baseUrl = "http://localhost:3000/api/user/login";

Deno.test("[http] user login empty.credentials", async () => {
  const response = await fetch(baseUrl, { method: "POST" });
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(
    data,
    {
      "status": false,
      "error": "user.login.empty.credentials",
      extraParams: [],
    },
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
  assertEquals(
    data,
    { "status": false, "error": "user.login.not.exist", extraParams: [] },
  );
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
  assertEquals(
    data,
    { "status": false, "error": "user.login.wrong.password", extraParams: [] },
  );
});

Deno.test("[http] user correct login correct", async () => {
  const requestArgument = {
    login: "admin@admin.com",
    password: "adminPassword123",
  };
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestArgument),
  });
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data, { "status": true, "error": "", extraParams: [] });
});
