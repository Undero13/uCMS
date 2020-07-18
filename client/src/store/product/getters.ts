import state from './state';

const getters = {
  getProductList: () => state.products,
  getPageCount: () => state.pageCount,
};

export default getters;
