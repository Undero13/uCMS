/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { createStore } from "vuex";
import { State as StateWrapper, Operator } from "@/models/Operators.model.ts";
import environment from "@/environment.ts";
import router from "@/router/index.ts";
import CookieService from "@/services/CookieService/CookieService.service";
import { AxiosService } from "@/services/AxiosService/AxiosService.service";

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

  SET_OPERATORS(prevState: StateWrapper, data: Operator[]) {
    prevState.operators = {
      ...data,
    };
  },
};

const getters = {
  getOperatorList: () => state.operators,
  getPageCount: () => state.pageCount,
};

const actions = {
  async fetchOperators() {
    const { limit = 10, skip = 0 } = router.currentRoute.value.query;
    const url = `${environment.apiUrl}user/list/${limit}/${skip}`;
    const { status, data } = await AxiosService.get(url);

    if (!status) throw Error("Cannot get data from api");

    storeOperator.commit("FETCH_OPERATORS", data.data);
    storeOperator.commit("FETCH_PAGECOUNT", data.pageCount);
  },

  async searchOperatorsSearch(_e: any, param: Object): Promise<any> {
    const [key] = Object.keys(param);
    let [value] = Object.values(param);
    value = value.trim();

    if (!value) {
      return storeOperator.dispatch("fetchOperators");
    }

    const args: any = {};

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

    const url = `${environment.apiUrl}user/search`;
    const { status, data } = await AxiosService.get(url, config);

    if (!status) throw Error("Something wrong. Please try later");

    storeOperator.commit("SET_OPERATORS", data.data);
  },
};

const storeOperator = createStore({
  state,
  mutations,
  getters,
  actions,
});

export default storeOperator;
