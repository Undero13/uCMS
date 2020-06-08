import { shallowMount } from "@vue/test-utils";
import TableComponent from "./TableComponent.component.vue";

const data = {
  caption: "Test caption",
  headers: ["test1", "test2"],
  rows: [
    {
      key1: "col1",
      key2: "col2",
    },
  ],
};

describe("table component", () => {
  const wrapper = shallowMount(TableComponent, { props: { data } });
  const caption = wrapper.find("caption");
  const thead = wrapper.find("thead");
  const tbody = wrapper.find("tbody");

  test("it can be mounted", () => expect(wrapper).toBeInstanceOf(Object));
  test("it can generate html", () => {
    expect(caption.text()).toBe("Test caption");
    expect(thead.html()).toBe(
      "<thead><tr><th>test1</th><th>test2</th></tr></thead>"
    );
    expect(tbody.html()).toBe(
      "<tbody><tr><td>col1</td><td>col2</td></tr></tbody>"
    );
  });
});
