import { shallowMount } from "@vue/test-utils";
import { h } from "@vue/runtime-dom";
import Modal from "./Modal.component.vue";

describe("modal component", () => {
  const slots = {
    header: h("h1", {}, "Test title"),
    body: h("p", {}, "Test desc"),
  };
  const wrapper = shallowMount(Modal, { slots });

  test("it can be mounted", () => expect(wrapper).toBeInstanceOf(Object));
  test("it can show overlay", () =>
    expect(wrapper.find(".overlay").exists()).toBeTruthy());
  test("it can set slot", () => {
    expect(wrapper.find(".modal-card-head").text()).toBe("Test title");
    expect(wrapper.find(".modal-card-body").text()).toBe("Test desc");
  });
});
