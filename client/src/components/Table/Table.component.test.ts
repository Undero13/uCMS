import { shallowMount } from "@vue/test-utils";
import Table from "./Table.component.vue";

test("it can be mount", () => {
  const wrapper = shallowMount(Table);

  expect(wrapper).toBeInstanceOf(Object);
});
