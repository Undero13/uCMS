import state from "./state";

const getters = {
  getProductList: () => state.products,
  getProductPageCount: () => state.pageCount,
  getMapProductList: () => {
    const { products } = state;

    return Object.values(products).map(({ id, name, price }) => ({
      id,
      name,
      price,
    }));
  },
};

export default getters;
