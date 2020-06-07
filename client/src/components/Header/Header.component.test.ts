import { shallowMount } from "@vue/test-utils";
import Header from "./Header.component.vue";

test("it can be mount", () => {
  const wrapper = shallowMount(Header);

  expect(wrapper).toBeInstanceOf(Object);
});
