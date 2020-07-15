import { createStore } from 'vuex';
import operatorStore from './operator';

const store = createStore({
  modules: {
    operatorStore
  }
});

export default store;
