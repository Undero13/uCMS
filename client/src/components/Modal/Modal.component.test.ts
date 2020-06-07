import { shallowMount } from '@vue/test-utils';
import Modal from './Modal.component.vue';

test('it can be mount', () => {
  const wrapper = shallowMount(Modal);

  expect(wrapper).toBeInstanceOf(Object);
});
