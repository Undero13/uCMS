import { Area } from "https://deno.land/x/alosaur@v0.17.0/mod.ts";
import { UserController } from "../controllers/UserController.ts";

@Area({
  controllers: [
    UserController,
  ],
})
export class UserArea {}
