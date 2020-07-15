import { Operator } from "@/models/Operators.model.ts";
import store from "./index";

test("it can storeData", () => {
  const fakeData: Operator[] = [
    {
      id: "test",
      login: "test@test.com",
    },
  ];

  store.commit("FETCH_OPERATORS", fakeData);
  expect(store.getters.getOperatorList).toEqual({
    0: { id: "test", login: "test@test.com" },
  });
});
