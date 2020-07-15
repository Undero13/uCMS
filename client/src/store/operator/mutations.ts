/* eslint-disable no-param-reassign */
import { State as StateWrapper, Operator } from "@/models/Operators.model.ts";

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

  SET_OPERATORS(prevState: StateWrapper, data: Operator[]) {
    prevState.operators = {
      ...data,
    };
  },
};

export default mutations;
