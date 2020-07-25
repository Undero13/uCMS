import { shallowMount } from "@vue/test-utils";
import windowFix from "@/../testing-helper/window.helper";
import Pagination from "./Pagination.component.vue";

beforeAll(() => windowFix());

describe("pagination component", () => {
  const $routerMock = {
    currentRoute: {
      value: "test-route",
    },
  };

  const wrapper = shallowMount(Pagination, {
    props: { page: 2 },
    global: { mocks: { $router: $routerMock } },
  });

  test("it can be mount", () => expect(wrapper).toBeInstanceOf(Object));
  test("it can set default value", () => {
    const { page } = wrapper.vm;
    expect(page).toBe(2);
  });

  test("it can set value", async () => {
    wrapper.vm.changePage(1);
    expect(wrapper.find(".is-current").text()).toBe("1");
  });
});
