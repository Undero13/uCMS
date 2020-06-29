import { Area } from "../deno_modules.ts";
import { ProductController } from "../controllers/ProductController.ts";

@Area({
  controllers: [
    ProductController,
  ],
})
export class ProductArea {}
