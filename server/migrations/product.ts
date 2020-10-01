import { Faker } from "https://raw.githubusercontent.com/jackfiszr/deno-faker/master/lib/mod.ts";
import { en_US } from "https://raw.githubusercontent.com/jackfiszr/deno-faker/master/lib/locales/en_US/mod.ts";
import { en } from "https://raw.githubusercontent.com/jackfiszr/deno-faker/master/lib/locales/en/mod.ts";
import { uuid } from "https://deno.land/x/uuid@v0.1.2/mod.ts";

export const productsData: any[] = [];
export const faker = new Faker({
  locales: { en_US, en },
  locale: "en_US"
});

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
      weight: Math.round(Math.random() * 100)
    },
    seo: {},
    images: ["https://loremflickr.com/g/320/240/product", "https://loremflickr.com/g/320/240/product"]
  };

  productsData.push(product);
}