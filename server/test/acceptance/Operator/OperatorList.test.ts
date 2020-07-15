import { assertEquals } from "../../../deno_modules.ts";

const ContentTypeJson = "application/json; charset=utf-8";
const baseUrl = "http://localhost:3000/api/operator/list/10/0";

Deno.test("[http] operator list success", async () => {
  const response = await fetch(baseUrl);
  const { status, error, data, pageCount } = await response.json();

  assertEquals(response.status, 200);
  assertEquals(status, true);
  assertEquals(error, "");
  assertEquals(!!data.length, true);
  assertEquals(pageCount > 0, true);
});
