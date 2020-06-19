import { AuthService } from "../../../services/AuthService.ts";
import { assertEquals } from "../../../deno_modules.ts";

const authService = new AuthService();

Deno.test("[service] auth.service.empty.credentials", async () => {
  const login = "123";
  const password = "";

  const status = await authService.validateCredentials({ login, password });
  const message = authService.getMessage();

  assertEquals(status, false);
  assertEquals(message, "user.login.empty.credentials");
});

Deno.test("[service] auth.service.not.exist", async () => {
  const login = "123";
  const password = "password";

  const status = await authService.validateCredentials({ login, password });
  const message = authService.getMessage();

  assertEquals(status, false);
  assertEquals(message, "user.login.not.exist");
});

Deno.test("[service] auth.service.credentials.valid", async () => {
  const login = "admin@admin.com";
  const password = "admin@admin.com";

  const status = await authService.validateCredentials({ login, password });

  assertEquals(status, true);
});
