import { shallowMount } from "@vue/test-utils";
import Login from "./Login.view.vue";

test("it can be mount", () => {
  const wrapper = shallowMount(Login);

  expect(wrapper).toBeInstanceOf(Object);
});

test("it have two children", () => {
  const wrapper = shallowMount(Login);

  expect(wrapper.html().includes("<header-stub>")).toBeTruthy();
  expect(wrapper.html().includes("<login-form-stub>")).toBeTruthy();
});
