/* eslint-disable consistent-return */

import environment from '@/environment';
import router from '@/router';
import { AxiosService } from '@/services/AxiosService/AxiosService.service';
import CookieService from '@/services/CookieService/CookieService.service';
import { Commit, Dispatch } from 'vuex';

const actions = {
  async fetchProducts({ commit }: { commit: Commit }) {
    const { limit = 10, skip = 0 } = router.currentRoute.value.query;
    const url = `${environment.apiUrl}product/list/${limit}/${skip}`;
    const { status, data } = await AxiosService.get(url);

    if (!status) throw Error("Cannot get data from api");

    commit("FETCH_PRODUCTS", data.data);
    commit("FETCH_PAGECOUNT", data.pageCount);
  },

  async searchProductsSearch(
    { commit, dispatch }: { commit: Commit; dispatch: Dispatch },
    param: Object
  ) {
    const args: any = {};
    const [key] = Object.keys(param);
    let [value] = Object.values(param);

    value = value.trim();

    if (!value) {
      return dispatch("fetchProducts");
    }

    switch (key) {
      case "ID":
        args.id = value;
        break;
      case "e-mail":
        args.login = value;
        break;
      default:
        throw Error("Search is invalid");
    }

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `${CookieService.getJWToken()}`,
      },
      params: {
        ...args,
      },
    };

    const url = `${environment.apiUrl}product/search`;
    const { status, data } = await AxiosService.get(url, config);

    if (!status) throw Error("Something wrong. Please try later");

    commit("SET_PRODUCTS", data.data);
  },
};

export default actions;
