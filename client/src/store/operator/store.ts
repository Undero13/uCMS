/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { createStore } from "vuex";
import { State as StateWrapper, Operator } from "@/models/Operators.model.ts";
import environment from "@/environment.ts";
import axios from "axios";

const state: StateWrapper = {
  operators: [],
};

const mutations = {
  FETCH_OPERATORS(prevState: StateWrapper, data: Operator[]) {
    prevState.operators = {
      ...prevState.operators,
      ...data,
    };
  },
};

const getters = {
  getOperatorList: () => state.operators,
};

const actions = {
  async fetchOperators() {
    const url = `${environment.apiUrl}user/list`;
    const { status, data } = await axios(url);

    if (!status) throw Error("Cannot get data from api");

    storeOperator.commit("FETCH_OPERATORS", data.data);
  },
};

const storeOperator = createStore({
  state,
  mutations,
  getters,
  actions,
});

export default storeOperator;
