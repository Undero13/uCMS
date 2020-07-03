import { Area } from "../deno_modules.ts";
import { UserController } from "../controllers/UserController.ts";

@Area({
  controllers: [UserController]
})
export class UserArea {}
