import { mount } from "@vue/test-utils";
import setupFix from "@/../testing-helper/setup.helper";
import RichTextArea from "./RichTextArea.component.vue";

test("it can be mount", () => {
  const component = setupFix(RichTextArea);
  const wrapper = mount(component);

  expect(wrapper).toBeInstanceOf(Object);
});
