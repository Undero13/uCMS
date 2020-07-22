import { shallowMount } from "@vue/test-utils";
import DynamicForm from "./DynamicForm.component.vue";

const fields = [
  {
    type: "email",
    name: "email",
    label: "test label",
    class: "input",
  },
  {
    type: "textarea",
    name: "textarea-test",
    label: "test label2",
  },
  {
    type: "select",
    name: "select-test",
    label: "test label3",
    options: [
      {
        name: "option1",
      },
      {
        name: "option2",
      },
    ],
  },
];

describe("dynamicForm component", () => {
  const wrapper = shallowMount(DynamicForm, { props: { fields } });

  test("it can be mount", () => expect(wrapper).toBeInstanceOf(Object));
  test("it can generate input", () => expect(wrapper.find("#email").exists()).toBeTruthy());
  test("it can generate textarea", () => expect(wrapper.find("#textarea-test").exists()).toBeTruthy());
  test("it can generate select", () => {
    expect(wrapper.find("#select-test").exists()).toBeTruthy();
    expect(wrapper.findAll("#select-test option").length).toBe(2);
  });
});
