import { shallowMount } from "@vue/test-utils";
import Navigation from "./Navigation.component.vue";

const testData = {
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
    {
      type: "dropdown",
      classItem: "navbar-link",
      content: "Operator",
      links: [
        {
          href: "/operator-list",
          classLink: "navbar-link is-arrowless",
          content: "List",
        },
        {
          href: "/operator-account",
          classLink: "navbar-link is-arrowless",
          content: "Account",
        },
      ],
    },
    {
      type: "dropdown",
      classItem: "navbar-link",
      content: "Product",
      links: [
        {
          href: "/product-list",
          classLink: "navbar-link is-arrowless",
          content: "List",
        },
      ],
    },
    {
      type: "dropdown",
      classItem: "navbar-link",
      content: "Blog",
      links: [
        {
          href: "/post-list",
          classLink: "navbar-link is-arrowless",
          content: "Posts",
        },
        {
          href: "/author-list",
          classLink: "navbar-link is-arrowless",
          content: "Authors",
        },
        {
          href: "/category-list",
          classLink: "navbar-link is-arrowless",
          content: "Category",
        },
      ],
    },
  ],
};

describe("Navigation component", () => {
  const wrapper = shallowMount(Navigation, {
    data() {
      return { testData };
    },
  });

  test("it can be mount", () => expect(wrapper).toBeInstanceOf(Object));
  test("it can render logo", () =>
    expect(wrapper.find("logo-stub").exists()).toBeTruthy());
});
