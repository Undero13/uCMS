import { defineComponent, onBeforeMount, ref } from "@vue/runtime-dom";
import Navigation from "@/components/Navigation/Navigation.component.vue";
import OperatorListTable from "@/components/OperatorListTable/OperatorListTable.component.vue";
import storeOperator from '@/store/operator/store.ts';

export default defineComponent({
  name: "OperatorList",
  components: {
    Navigation,
    OperatorListTable,
  },
  setup() {
    onBeforeMount(() => {
      storeOperator.dispatch('fetchOperators');
    });

    const operatorList = ref(false);
    setTimeout(() => operatorList.value = storeOperator.getters.getOperatorList, 1000);
    return {
      operatorList,
    };
  },
});
