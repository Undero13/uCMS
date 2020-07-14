import { usersData, productsData } from "./db/fakeData/index.ts";
import { users, products } from "./db/connection.ts";

await users.insertMany([...usersData]);
await products.insertMany([...productsData]);
