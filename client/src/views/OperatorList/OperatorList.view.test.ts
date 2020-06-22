import { shallowMount } from "@vue/test-utils";
import OperatorList from "./OperatorList.view.vue";

test("it can be mount", () => {
  const operatorList = {
    caption: "Operator List",
    headers: ["ID", "e-mail"],
    rows: { id: "test", login: "test@test.pl" },
  };

  const wrapper = shallowMount(OperatorList, {
    data() {
      return { operatorList };
    },
  });
  expect(wrapper).toBeInstanceOf(Object);
});
