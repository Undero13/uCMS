import { shallowMount } from '@vue/test-utils';
import OperatorListTable from './OperatorListTable.component.vue';

test('it can be mount', () => {
  const wrapper = shallowMount(OperatorListTable, { props: [] });

  expect(wrapper).toBeInstanceOf(Object);
});

test('it can get data', () => {
  const fakeProps = {
    operatorList: [{
      id: "id",
      login: "login",
    }],
  };

  const wrapperWithoutProps = shallowMount(OperatorListTable, {
    props: [],
  });

  const wrapperWithProps = shallowMount(OperatorListTable, {
    props: fakeProps,
  });

  const emptyTbody = wrapperWithoutProps.find('tbody').text();
  const dataTbody = wrapperWithProps.find('tbody').text();

  expect(emptyTbody).toBe('');
  expect(dataTbody).toBe('idlogin');
});
