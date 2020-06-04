import { faker } from "https://raw.githubusercontent.com/jackfiszr/deno-faker/master/mod.ts";
import { uuid } from "https://deno.land/x/uuid@v0.1.2/mod.ts";

export const productsData: any[] = [];
const iteration = 100;

for (let i = 0; i < iteration; i++) {
  const product = {
    id: uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.lorem.paragraphs(),
    attributes: {
      material: faker.commerce.productMaterial(),
      color: faker.commerce.color(),
      weight: Math.round(Math.random() * 100),
    },
    images: [
      "https://loremflickr.com/g/320/240/product",
      "https://loremflickr.com/g/320/240/product",
    ],
  };

  productsData.push(product);
}
