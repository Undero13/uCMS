import { shallowMount } from "@vue/test-utils";
import LoginForm from "./LoginForm.component.vue";

test("it can be mount", () => {
  const wrapper = shallowMount(LoginForm);
  expect(wrapper).toBeInstanceOf(Object);
});

describe("it can show validate message", () => {
  test("login and password is empty", async () => {
    const wrapper = shallowMount(LoginForm);
    const loginInput = wrapper.find<HTMLInputElement>("#login");
    const loginPassword = wrapper.find<HTMLInputElement>("#password");
    const form = wrapper.find<HTMLFormElement>(".form");

    await loginInput.setValue("");
    await loginPassword.setValue("");
    await form.trigger("submit");

    expect(wrapper.find(".login-help").text()).toBe("Login is empty!");
    expect(wrapper.find(".password-help").text()).toBe("Password is empty!");
  });

  test("login is wrong", async () => {
    const wrapper = shallowMount(LoginForm);
    const loginInput = wrapper.find<HTMLInputElement>("#login");
    const form = wrapper.find<HTMLFormElement>(".form");

    await loginInput.setValue("testString");
    await form.trigger("submit");

    expect(wrapper.find(".login-help").text()).toBe("Login is not valid!");
  });

  test("login and password is valid", async () => {
    const wrapper = shallowMount(LoginForm);
    const loginInput = wrapper.find<HTMLInputElement>("#login");
    const loginPassword = wrapper.find<HTMLInputElement>("#password");
    const form = wrapper.find<HTMLFormElement>(".form");

    await loginInput.setValue("test@test.pl");
    await loginPassword.setValue("password123");
    await form.trigger("submit");

    // element don't show if element valid
    expect(wrapper.find(".login-help").exists()).toBeFalsy();
    expect(wrapper.find(".password-help").exists()).toBeFalsy();
  });
});
