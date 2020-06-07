import { defineComponent, onBeforeMount, ref } from "@vue/runtime-dom";
import Navigation from "@/components/Navigation/Navigation.component.vue";
import OperatorListTable from "@/components/OperatorListTable/OperatorListTable.component.vue";
import Modal from "@/components/Modal/Modal.component.vue";
import storeOperator from "@/store/operator/store.ts";

export default defineComponent({
  name: "OperatorList",
  components: {
    Navigation,
    OperatorListTable,
    Modal,
  },
  setup() {
    const operatorList = ref(false);
    const showModal = ref(false);

    onBeforeMount(() => {
      storeOperator.dispatch("fetchOperators");
      setTimeout(
        () => (operatorList.value = storeOperator.getters.getOperatorList),
        1000
      );
    });

    function showOperatorModal() {
      showModal.value = true;
    }

    return {
      operatorList,
      showOperatorModal,
      showModal,
    };
  },
});
