import { shallowMount } from "@vue/test-utils";
import List from "./List.component.vue";

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

test("it can be mount", () => {
  const wrapper = shallowMount(List, { props: { data } });
  expect(wrapper).toBeInstanceOf(Object);
});

test("it can store html", () => {
  const wrapper = shallowMount(List, { props: { data } });

  expect(wrapper.html()).toBe('<ul class="navbar-start"><list-item-stub></list-item-stub></ul>');
});
