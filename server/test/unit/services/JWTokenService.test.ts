import JWTokenService from "../../../services/JWTokenService.ts";
import { assertEquals } from "../../../deno_modules.ts";

const jwTokenService = new JWTokenService();

Deno.test("[service] jwt.service.empty.credentials", async () => {
  const operator = "admin@admin.com";
  const token = await jwTokenService.makeJWToken(operator);

  assertEquals(!!token, true);

  const status = await jwTokenService.validateJWToken(token);
  assertEquals(status, true);
});
