import { shallowMount } from "@vue/test-utils";
import TableRowFilter from "./TableRowFilter.component.vue";

test("it can be mount", () => {
  const wrapper = shallowMount(TableRowFilter);

  expect(wrapper).toBeInstanceOf(Object);
});
