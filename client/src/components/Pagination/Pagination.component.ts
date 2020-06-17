/* eslint-disable no-param-reassign */
import { defineComponent, ref, Ref } from "@vue/runtime-dom";

export default defineComponent({
  name: "Pagination",
  props: {
    page: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    function getParam(name: string): number | null {
      const url = new URL(location.href);
      const params = new URLSearchParams(url.search);
      const param = params.get(name) ?? "";

      return param ? parseInt(param, 10) : null;
    }

    const limit: number = getParam("limit") ?? 10;
    let skip: number = getParam("skip") ?? 0;
    const curentPage: Ref<number> = ref(skip / limit + 1);

    function changePage(pageNumber: number) {
      if (pageNumber > props.page) {
        pageNumber = 1;
      } else if (pageNumber < 1) {
        pageNumber = props.page;
      }

      if (pageNumber > curentPage.value) {
        skip = (pageNumber - 1) * 10;
      } else {
        skip = (pageNumber - 1) * 10;
      }

      curentPage.value = pageNumber;
      const { path } = this.$router.currentRoute.value;

      window.location.href = `${path}?limit=${limit}&skip=${skip}`;
    }

    return {
      curentPage,
      changePage,
    };
  },
});
