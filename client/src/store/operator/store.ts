/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { createStore } from "vuex";
import { State as StateWrapper, Operator } from "@/models/Operators.model.ts";
import environment from "@/environment.ts";
import axios from "axios";
import router from "@/router/index.ts";

const state: StateWrapper = {
  operators: [],
  pageCount: 0,
};

const mutations = {
  FETCH_OPERATORS(prevState: StateWrapper, data: Operator[]) {
    prevState.operators = {
      ...prevState.operators,
      ...data,
    };
  },

  FETCH_PAGECOUNT(prevState: StateWrapper, pageCount: number) {
    prevState.pageCount = pageCount;
  },
};

const getters = {
  getOperatorList: () => state.operators,
  getPageCount: () => state.pageCount,
};

const actions = {
  async fetchOperators() {
    const { limit = 10, skip = 0 } = router.currentRoute.value.query;
    const url = `${environment.apiUrl}user/list?limit=${limit}&skip=${skip}`;
    const { status, data } = await axios(url);

    if (!status) throw Error("Cannot get data from api");

    storeOperator.commit("FETCH_OPERATORS", data.data);
    storeOperator.commit("FETCH_PAGECOUNT", data.pageCount);
  },
};

const storeOperator = createStore({
  state,
  mutations,
  getters,
  actions,
});

export default storeOperator;
