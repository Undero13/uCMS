import { operatorsData, productsData } from "./db/fakeData/index.ts";
import { operators, products } from "./db/connection.ts";

await operators.insertMany([...operatorsData]);
await products.insertMany([...productsData]);
