import { Area } from "../deno_modules.ts";
import { OperatorController } from "../controllers/OperatorController.ts";

@Area({
  controllers: [OperatorController]
})
export class OperatorArea {}
