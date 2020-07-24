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
    type: "RichTextArea",
    name: "richtextarea-test",
    label: "test label3",
  },
  {
    type: "select",
    name: "select-test",
    label: "test label4",
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
  const { length } = fields;

  test("it can be mount", () => expect(wrapper).toBeInstanceOf(Object));
  test("it can generate labels", () => expect(wrapper.findAll("label").length).toBe(length));

  test("it can generate input", () => expect(wrapper.find("#email").exists()).toBeTruthy());
  test("it have class input", () => expect(wrapper.find("#email").classes()).toContain("input"));

  test("it can generate textarea", () => expect(wrapper.find("#textarea-test").exists()).toBeTruthy());
  test("it can generate RichTextArea", () => expect(wrapper.find("#richtextarea-test").exists()).toBeTruthy());

  test("it can generate select", () => {
    expect(wrapper.find("#select-test").exists()).toBeTruthy();
    expect(wrapper.findAll("#select-test option").length).toBe(2);
  });
});
