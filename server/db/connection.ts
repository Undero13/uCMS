import { MongoClient } from "../deno_modules.ts";
import { environment } from "../environment.ts";

const { mongoUser, mongoPassword, mongoPort } = environment;
const client = new MongoClient();

client.connectWithUri(`mongodb://${mongoUser}:${mongoPassword}@mongo:${mongoPort}`);

export const db = client.database("ucms");
export const operators = db.collection("operator");
export const products = db.collection("product");
