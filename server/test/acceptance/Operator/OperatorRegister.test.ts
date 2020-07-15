import { assertEquals } from "../../../deno_modules.ts";
import OperatorHelper from "../Helpers/OperatorHelper.ts";

const ContentTypeJson = "application/json; charset=utf-8";
const baseUrl = "http://localhost:3000/api/operator/register";

Deno.test("[http] operator.register.wrong.email", async () => {
  const response = await fetch(baseUrl, { method: "POST" });
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data, {
    status: false,
    error: "operator.register.wrong.email",
    data: [],
    pageCount: 0
  });
});

Deno.test("[http] operator.register.ok", async () => {
  await OperatorHelper.removeOperator("admin2@admin.com");
  const requestArgument = {
    login: "admin2@admin.com"
  };
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestArgument)
  });

  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data.status, true);
  assertEquals(data.error, "");
  assertEquals(!!data.data.length, true);
});
