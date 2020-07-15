import state from "./state";

const getters = {
  getOperatorList: () => state.operators,
  getPageCount: () => state.pageCount,
};

export default getters;
