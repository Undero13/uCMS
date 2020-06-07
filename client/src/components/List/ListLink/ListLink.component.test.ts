import { shallowMount } from "@vue/test-utils";
import ListLink from "./ListLink.component.vue";

test("it can be mount", () => {
  const wrapper = shallowMount(ListLink);

  expect(wrapper).toBeInstanceOf(Object);
});
