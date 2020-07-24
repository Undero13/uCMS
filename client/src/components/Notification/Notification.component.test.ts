import { shallowMount } from "@vue/test-utils";
import Notification from "./Notification.component.vue";

test("it can be mount", () => {
  const wrapper = shallowMount(Notification);

  expect(wrapper).toBeInstanceOf(Object);
});

test("it can use props", () => {
  const props = {
    msg: "Test me!",
    type: "info",
  };

  const wrapper = shallowMount(Notification, { props });

  expect(wrapper.vm.$props).toEqual(props);
  expect(wrapper.html()).toEqual('<div class="notification notification--position is-info">Test me!</div>');
});
