import { Area } from "https://deno.land/x/alosaur/src/mod.ts";
import { UserController } from "../controllers/UserController.ts";

@Area({
  controllers: [
    UserController,
  ],
})
export class UserArea {}
