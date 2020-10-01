import { operatorsData } from "./operator.ts";
import { productsData } from "./product.ts";

import { operators, products } from "../src/models/connection.ts"

await operators.insertMany([...operatorsData]);
await products.insertMany([...productsData]);
