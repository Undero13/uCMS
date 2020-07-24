import { shallowMount } from "@vue/test-utils";
import TableRowFilter from "./TableRowFilter.component.vue";

describe('TableRowFilter test', () => {
  const wrapper = shallowMount(TableRowFilter, { props: { name: 'testKey' } });

  test("it can be mount", () => expect(wrapper).toBeInstanceOf(Object));
  test("it can emit event", async () => {
    const input = wrapper.find('input');

    await input.setValue('testValue');
    await input.trigger('blur');

    expect(wrapper.emitted()).toHaveProperty('onSearch');
    expect(wrapper.emitted().onSearch[0]).toStrictEqual([{ testKey: "testValue" }]);
  });
});
