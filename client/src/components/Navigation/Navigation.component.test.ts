import { shallowMount } from '@vue/test-utils';
import Navigation from './Navigation.component.vue';

test('it can be mount', () => {
  const wrapper = shallowMount(Navigation);

  expect(wrapper).toBeInstanceOf(Object);
});
