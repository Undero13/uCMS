import { defineComponent, onBeforeMount, ref } from "@vue/runtime-dom";
import Navigation from "@/components/Navigation/Navigation.component.vue";
import Table from "@/components/Table/Table.component.vue";
import Modal from "@/components/Modal/Modal.component.vue";
import storeOperator from "@/store/operator/store.ts";
import { OperatorTable } from "@/models/Operators.model";

export default defineComponent({
  name: "OperatorList",
  components: {
    Navigation,
    Table,
    Modal,
  },
  setup() {
    const operatorList: OperatorTable = ref(false);
    const showModal = ref(false);

    onBeforeMount(() => {
      storeOperator.dispatch("fetchOperators");
      setTimeout(
        () => (operatorList.value = {
          caption: "Operator List",
          headers: ["ID", "e-mail"],
          rows: storeOperator.getters.getOperatorList,
        }),
        1000
      );
    });

    return {
      operatorList,
      showModal,
    };
  },
});
