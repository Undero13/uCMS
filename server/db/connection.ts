import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
import { environment } from "../environment.ts";

await init();

const { mongoUser, mongoPassword, mongoPort } = environment;
const client = new MongoClient();

client.connectWithUri(
  `mongodb://${mongoUser}:${mongoPassword}@mongo:${mongoPort}`,
);

export const db = client.database("ucms");
export const users = db.collection("users");

//Create base user
const count = await users.count({ login: { $eq: "admin@admin.com" } });

if (count < 1) {
  const insertId = await users.insertOne({
    login: "admin@admin.com",
    password: "$2a$10$ygFLYW2tj5/GIcCwAE8BZesEYrUa7VYgqRog6N4gXpSF4ceVRuNKa",
  });
}
