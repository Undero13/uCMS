/* eslint-disable no-console */
import { shallowMount } from "@vue/test-utils";
import ListLink from "./ListLink.component.vue";

const originalWarn = console.warn.bind(console.warn);
beforeAll(() => console.warn = (msg: string) => !msg.toString().includes('router-link') && originalWarn(msg));
afterAll(() => console.warn = originalWarn);

const data = {
  href: "/",
  classLink: "navbar-link is-arrowless",
  content: "Dashboard",
};

test("ListLink component - can render and store html", () => {
  const wrapper = shallowMount(ListLink, { props: { data } });

  expect(wrapper).toBeInstanceOf(Object);
  expect(wrapper.html()).toBe('<router-link to="/" class="navbar-link is-arrowless">Dashboard</router-link>');
});
