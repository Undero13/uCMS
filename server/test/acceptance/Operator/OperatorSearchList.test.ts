import { assertEquals } from "../../../deno_modules.ts";

const baseUrl = "http://localhost:3000/api/operator/search";

Deno.test("[http] operator search list success", async () => {
  const requestArgument = {
    login: "admin@admin.com"
  };
  const response = await fetch(`${baseUrl}?login=admin@admin.com`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  const { status, error, data, pageCount } = await response.json();

  assertEquals(response.status, 200);
  assertEquals(status, true);
  assertEquals(error, "");
  assertEquals(data[0].login, "admin@admin.com");
});
