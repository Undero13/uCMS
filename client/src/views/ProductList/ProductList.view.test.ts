import { shallowMount } from '@vue/test-utils';
import ProductList from './ProductList.view.vue';

test('it can be mount', () => {
  const wrapper = shallowMount(ProductList);

  expect(wrapper).toBeInstanceOf(Object);
});

