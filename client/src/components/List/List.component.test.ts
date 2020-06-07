import { shallowMount } from "@vue/test-utils";
import List from "./List.component.vue";

test("it can be mount", () => {
  const wrapper = shallowMount(List);

  expect(wrapper).toBeInstanceOf(Object);
});
