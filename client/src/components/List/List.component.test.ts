import { shallowMount } from "@vue/test-utils";
import List from "./List.component.vue";

test("it can be mount", () => {
  const wrapper = shallowMount(List, { props: {} });

  expect(wrapper).toBeInstanceOf(Object);
});

test("it can store html", () => {
  const data = {
    classList: "navbar-start",
    items: [
      {
        type: "link",
        classItem: "navbar-item",
        content: "",
        links: [
          {
            href: "/",
            classLink: "navbar-link is-arrowless",
            content: "Dashboard",
          },
        ],
      },
    ],
  };
  const wrapper = shallowMount(List, { props: data });

  expect(wrapper).toBeFalsy();
});
