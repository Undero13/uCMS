import { shallowMount } from "@vue/test-utils";
import OperatorAccount from "./OperatorAccount.view.vue";

describe("OperatorAccount view test", () => {
  const wrapper = shallowMount(OperatorAccount);

  test("it can be mount", () => expect(wrapper).toBeInstanceOf(Object));

  test("it can show modal", async () => {
    expect(wrapper.html().includes("<modal-stub></modal-stub>")).toBeFalsy();
    await wrapper.find(".button-open").trigger("click");
    expect(wrapper.html().includes("<modal-stub></modal-stub>")).toBeTruthy();
  });
});
