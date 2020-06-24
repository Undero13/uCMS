import { assertEquals } from "../../../deno_modules.ts";

const ContentTypeJson = "application/json; charset=utf-8";
const baseUrl = "http://localhost:3000/api/user/search";

Deno.test("[http] user search list success", async () => {
  const requestArgument = {
    login: "admin@admin.com",
  };
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestArgument),
  });
  const { status, error, data, pageCount } = await response.json();

  assertEquals(response.status, 200);
  assertEquals(status, true);
  assertEquals(error, "");
  assertEquals(data[0].login, "admin@admin.com");
});
