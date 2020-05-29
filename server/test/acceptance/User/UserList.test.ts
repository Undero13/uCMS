import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const ContentTypeJson = "application/json; charset=utf-8";
const baseUrl = "http://localhost:3000/api/user/list";

Deno.test("[http] user list success", async () => {
  const response = await fetch(baseUrl);
  const { status, error, data } = await response.json();

  assertEquals(response.status, 200);
  assertEquals(status, true);
  assertEquals(error, "");
  assertEquals(data[0].login, "admin@admin.com");
});
