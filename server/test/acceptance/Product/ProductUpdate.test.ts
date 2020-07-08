import { assertEquals } from "../../../deno_modules.ts";

const baseUrl = "http://localhost:3000/api/product/update";

Deno.test("[http] product update success", async () => {
  const requestArgument = {
    data: {
      id: "114b429e-2315-4df0-80e0-0c1d383235bf",
      name: "test234",
      price: "123.00",
      description: "",
      attributes: {
        material: "Steel",
        color: "teal",
        weigh: 54
      },
      images: ["https://loremflickr.com/g/320/240/product", "https://loremflickr.com/g/320/240/product"]
    }
  };

  const response = await fetch(baseUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestArgument)
  });

  const { status, error } = await response.json();

  assertEquals(response.status, 200);
  assertEquals(status, true);
  assertEquals(error, "");
});
