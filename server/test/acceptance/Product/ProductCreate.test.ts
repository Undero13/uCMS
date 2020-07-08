import { assertEquals } from "../../../deno_modules.ts";
import ProductHelper from "../Helpers/ProductHelper.ts";

const baseUrl = "http://localhost:3000/api/product/create";

Deno.test("[http] product create success", async () => {
  const requestArgument = {
    data: {
      name: "test",
      price: "553.00",
      description:
        "Ea est soluta dignissimos sapiente qui quis. Ducimus eos consequuntur fugit incidunt. Sint laborum corporis consequatur consequatur debitis expedita facilis tempore. Sapiente odio autem quas. Qui quia facilis. Culpa quis porro voluptates ut sequi aut qui enim delectus. Illo est sapiente ipsum sit qui. Aut tempore nostrum. Nam exercitationem soluta sit. Sit quam dolor. Harum ex rerum quo omnis provident dolores. Eos neque doloribus rerum corporis repellendus animi quod consectetur autem. Quaerat exercitationem rerum quia. Voluptatem autem officia ratione ut doloribus laborum quia vero.",
      attributes: {
        material: "Steel",
        color: "teal",
        weigh: 54
      },
      images: ["https://loremflickr.com/g/320/240/product", "https://loremflickr.com/g/320/240/product"]
    }
  };

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestArgument)
  });

  const { status, error, data } = await response.json();
  const isExist = await ProductHelper.getProductByID(data[0].id);

  assertEquals(response.status, 200);
  assertEquals(status, true);
  assertEquals(error, "");
  assertEquals(!!isExist, true);
});
