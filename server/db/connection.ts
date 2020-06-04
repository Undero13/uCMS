import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
import { environment } from "../environment.ts";

const { mongoUser, mongoPassword, mongoPort } = environment;
const client = new MongoClient();

client.connectWithUri(
  `mongodb://${mongoUser}:${mongoPassword}@mongo:${mongoPort}`,
);

export const db = client.database("ucms");
export const users = db.collection("users");
export const products = db.collection("product");
