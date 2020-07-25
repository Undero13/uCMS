import { defineComponent, reactive, ref, onBeforeMount } from "@vue/runtime-dom";
import Navigation from "@/components/Navigation/Navigation.component.vue";
import Notification from "@/components/Notification/Notification.component.vue";
import TableComponent from "@/components/TableComponent/TableComponent.component.vue";
import Pagination from "@/components/Pagination/Pagination.component.vue";
import { useStore } from "vuex";
import { ProductTable } from "@/models/Products.model";

export default defineComponent({
  name: "ProductList",
  components: {
    Navigation,
    Notification,
    TableComponent,
    Pagination,
  },
  setup() {
    const { dispatch, getters } = useStore();
    const pageCount = ref(0);

    const msg = ref("");
    const loading = ref(true);

    const productList: ProductTable = reactive({
      caption: "Product List",
      headers: ["ID", "Name", "Price"],
      rows: [],
      editable: true,
    });

    function loadData() {
      productList.rows = getters.getMapProductList;
      pageCount.value = getters.getProductPageCount;
      loading.value = false;
    }

    function onSearch(e: Object) {
      loading.value = true;
      dispatch("searchProductSearch", e)
        .then(() => loadData())
        .catch(err => (msg.value = err.message));
    }

    onBeforeMount(() => {
      dispatch("fetchProducts")
        .then(() => loadData())
        .catch(err => (msg.value = err.message));
    });

    return {
      pageCount,
      productList,
      msg,
      loading,
      onSearch,
    };
  },
});
