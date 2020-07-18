import { defineComponent, reactive, ref } from "@vue/runtime-dom";
import Navigation from "@/components/Navigation/Navigation.component.vue";
import Notification from "@/components/Notification/Notification.component.vue";
import TableComponent from "@/components/TableComponent/TableComponent.component.vue";
import Pagination from "@/components/Pagination/Pagination.component.vue";
import { useStore } from 'vuex';
import { ProductTable } from '@/models/Products.model';

export default defineComponent({
  name: "ProductList",
  components: {
    Navigation,
    Notification,
    TableComponent,
    Pagination
  },
  setup() {
    const { dispatch, getters } = useStore();
    const pageCount = ref(0);

    const msg = ref("");
    const loading = ref(true);

    const productList: ProductTable = reactive({
      caption: "Product List",
      headers: ["ID"],
      rows: [],
    });

    function loadData() {
      productList.rows = getters.getProductList;
      pageCount.value = getters.getPageCount;
      loading.value = false;
    }

    function onSearch(e: Object) {
      loading.value = true;
      dispatch("searchProductSearch", e)
        .then(() => loadData())
        .catch((err) => (msg.value = err.message));
    }

    return {
      pageCount,
      msg,
      loading,
      onSearch
    };
  }
});
