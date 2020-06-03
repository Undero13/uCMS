import { Operator } from '@/models/Operators.model.ts';
import storeOperator from './store';

test('it can storeData', () => {
  const fakeData: Operator[] = [
    {
      id: 'test',
      login: 'test@test.com',
    },
  ];

  storeOperator.commit('FETCH_OPERATORS', fakeData);
  expect(storeOperator.getters.getOperatorList)
    .toEqual({ 0: { id: 'test', login: 'test@test.com' } });
});
