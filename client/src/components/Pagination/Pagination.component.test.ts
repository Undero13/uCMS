/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
import { shallowMount } from "@vue/test-utils";
import Pagination from "./Pagination.component.vue";

const originalWarn = console.error.bind(console.error);
beforeAll(() => (console.error = (msg: string) => !msg.toString().includes("navigation") && originalWarn(msg)));
afterAll(() => (console.error = originalWarn));

describe("pagination component", () => {
  const $routerMock = {
    currentRoute: {
      value: "test-route",
    },
  };

  const mockWindow = {
    location: {
      href: null,
    },
  };
  const wrapper = shallowMount(Pagination, {
    props: { page: 2 },
    global: { mocks: { $router: $routerMock, window: mockWindow } },
  });

  test("it can be mount", () => expect(wrapper).toBeInstanceOf(Object));
  test("it can set default value", () => {
    const page = wrapper.vm.page;
    expect(page).toBe(2);
  });

  test("it can set value", async () => {
    wrapper.vm.changePage(1);
    expect(wrapper.find(".is-current").text()).toBe("1");
  });
});
