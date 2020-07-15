import { shallowMount } from '@vue/test-utils';
import RichTextArea from './RichTextArea.component.vue';

test('it can be mount', () => {
  const wrapper = shallowMount(RichTextArea);

  expect(wrapper).toBeInstanceOf(Object);
});

