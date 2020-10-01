import { MongoClient } from "../../deno_modules.ts";

const { MONGO_USER, MONGO_PASSWORD, MONGO_PORT } = Deno.env.toObject();
const client = new MongoClient();

client.connectWithUri(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongo:${MONGO_PORT}`);

export const db = client.database("ucms");
export const operators = db.collection("operator");
export const products = db.collection("product");