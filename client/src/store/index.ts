import { createStore } from "vuex";
import operatorStore from "./operator";
import productStore from "./product";

const store = createStore({
  modules: {
    operatorStore,
    productStore
  },
});

export default store;
