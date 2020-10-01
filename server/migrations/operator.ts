import { uuid } from "https://deno.land/x/uuid@v0.1.2/mod.ts";

export const operatorsData = [
  {
    id: uuid(),
    login: "admin@admin.com",
    password: "$2a$10$ygFLYW2tj5/GIcCwAE8BZesEYrUa7VYgqRog6N4gXpSF4ceVRuNKa",
    permission: ["operator.register", "operator.permission", "product.create", "product.update"]
  }
];