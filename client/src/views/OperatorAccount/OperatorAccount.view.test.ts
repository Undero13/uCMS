import { shallowMount } from "@vue/test-utils";
import OperatorAccount from "./OperatorAccount.view.vue";

test("it can be mount", () => {
  const wrapper = shallowMount(OperatorAccount);

  expect(wrapper).toBeInstanceOf(Object);
});
