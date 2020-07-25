import { shallowMount } from "@vue/test-utils";
import setupFix from "@/../testing-helper/setup.helper";
import ProductList from "./ProductList.view.vue";

test("it can be mount", () => {
  const component = setupFix(ProductList);
  const wrapper = shallowMount(component);

  expect(wrapper).toBeInstanceOf(Object);
});
