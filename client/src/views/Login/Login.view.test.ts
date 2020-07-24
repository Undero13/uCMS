import { shallowMount } from "@vue/test-utils";
import Login from "./Login.view.vue";

test("it can be mount", () => {
  const wrapper = shallowMount(Login);
  expect(wrapper).toBeInstanceOf(Object);
});

test("it have two children", async () => {
  const wrapper = shallowMount(Login, <{}>{
    data() {
      return {
        msg: "test"
      };
    }
   });

  expect(wrapper.html().includes("<logo-stub>")).toBeTruthy();
  expect(wrapper.html().includes("<login-form-stub>")).toBeTruthy();
});
