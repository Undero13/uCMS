import { shallowMount } from "@vue/test-utils";
import Logo from "./Logo.component.vue";

test("it can be mount", () => {
  const wrapper = shallowMount(Logo);
  expect(wrapper).toBeInstanceOf(Object);
});
