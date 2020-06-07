import { shallowMount } from "@vue/test-utils";
import ListItem from "./ListItem.component.vue";

test("it can be mount", () => {
  const wrapper = shallowMount(ListItem);

  expect(wrapper).toBeInstanceOf(Object);
});
