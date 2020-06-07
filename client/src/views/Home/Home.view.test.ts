import { shallowMount } from "@vue/test-utils";
import Home from "./Home.view.vue";

test("it can be mount", () => {
  const wrapper = shallowMount(Home);

  expect(wrapper).toBeInstanceOf(Object);
});
