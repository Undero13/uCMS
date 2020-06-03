import { shallowMount } from '@vue/test-utils';
import OperatorList from './OperatorList.view.vue';

test('it can be mount', () => {
  const wrapper = shallowMount(OperatorList);

  expect(wrapper).toBeInstanceOf(Object);
});
