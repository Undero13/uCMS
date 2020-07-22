import { shallowMount } from "@vue/test-utils";
import ListItem from "./ListItem.component.vue";

const itemWithLink = {
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
};

const itemWithLabel = {
  type: "item",
  classItem: "navbar-item",
  content: "innerText",
};

const itemWithDropdown = {
  type: "dropdown",
  classItem: "navbar-item",
  content: "",
  links: [
    {
      href: "/",
      classLink: "navbar-link is-arrowless",
      content: "Dashboard",
    },
  ],
};

describe("ListItem component", () => {
  const wrapper1 = shallowMount(ListItem, { props: { item: itemWithLink } });
  const wrapper2 = shallowMount(ListItem, { props: { item: itemWithLabel } });
  const wrapper3 = shallowMount(ListItem, {
    props: { item: itemWithDropdown },
  });

  test("it can be mount", () => {
    expect(wrapper1).toBeInstanceOf(Object);
    expect(wrapper2).toBeInstanceOf(Object);
    expect(wrapper3).toBeInstanceOf(Object);
  });
  test("it can render html", () => {
    expect(wrapper1.html().includes('<li class="navbar-item"><list-link-stub></list-link-stub>')).toBeTruthy();
    expect(wrapper2.html().includes('<li class="navbar-item">innerText')).toBeTruthy();
    expect(
      wrapper3
        .html()
        .includes(
          '<li class="navbar-item has-dropdown is-hoverable"><button class="button-menu" aria-haspopup="true" aria-expanded="false"></button><ul class="navbar-dropdown"><li><list-link-stub></list-link-stub></li></ul></li>',
        ),
    ).toBeTruthy();
  });
});
