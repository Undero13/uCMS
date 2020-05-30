import JWTokenService from "../../../services/JWTokenService.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const jwTokenService = new JWTokenService();

Deno.test("[service] jwt.service.empty.credentials", async () => {
  const user = "admin@admin.com";
  const token = jwTokenService.makeJWToken(user);

  assertEquals(!!token, true);

  const status = await jwTokenService.validateJWToken(token);
  assertEquals(status, true);
});
