import { shallowMount } from "@vue/test-utils";
import Pagination from "./Pagination.component.vue";

test("it can be mount", () => {
  const wrapper = shallowMount(Pagination);

  expect(wrapper).toBeInstanceOf(Object);
});
