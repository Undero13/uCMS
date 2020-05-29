import { Area } from "https://deno.land/x/alosaur@v0.14.0/src/mod.ts";
import { UserController } from "../controllers/UserController.ts";

@Area({
  controllers: [
    UserController,
  ],
})
export class UserArea {}
