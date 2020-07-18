/* eslint-disable no-param-reassign */

import { State as StateWrapper, Product } from "@/models/Products.model.ts";

const mutations = {
  FETCH_PRODUCTS(prevState: StateWrapper, data: Product[]) {
    prevState.products = {
      ...prevState.products,
      ...data,
    };
  },

  FETCH_PAGECOUNT(prevState: StateWrapper, pageCount: number) {
    prevState.pageCount = pageCount;
  },

  SET_PRODUCTS(prevState: StateWrapper, data: Product[]) {
    prevState.products = {
      ...data,
    };
  },
};

export default mutations;
