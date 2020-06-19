import {
 defineComponent, onBeforeMount, ref, Ref
} from "@vue/runtime-dom";
import Navigation from "@/components/Navigation/Navigation.component.vue";
import Notification from "@/components/Notification/Notification.component.vue";
import TableComponent from "@/components/TableComponent/TableComponent.component.vue";
import Modal from "@/components/Modal/Modal.component.vue";
import Pagination from "@/components/Pagination/Pagination.component.vue";
import storeOperator from "@/store/operator/store.ts";
import DynamicForm from "@/components/DynamicForm/DynamicForm.component.vue";
import { OperatorTable, OperatorCreateData } from "@/models/Operators.model";
import ValidatorService from "@/services/ValidatorService/ValidatorService.service.ts";
import { FormField } from "@/models/DynamicForm.model";
import OperatorService from "@/services/OperatorService/OperatorService.service";

export default defineComponent({
  name: "OperatorList",
  components: {
    Navigation,
    Notification,
    TableComponent,
    Pagination,
    Modal,
    DynamicForm,
  },
  setup() {
    const operatorList: Ref<OperatorTable> = ref({});
    const pageCount = ref(0);
    const loading = ref(true);
    const showModal = ref(false);
    const msg = ref("");
    const formFields: FormField[] = [
      {
        type: "email",
        name: "email",
        label: "Operator e-mail",
        class: "input",
        validators: [ValidatorService.required, ValidatorService.isEmail],
      },
    ];

    function loadData() {
      setTimeout(() => {
        operatorList.value = {
          caption: "Operator List",
          headers: ["ID", "e-mail"],
          rows: storeOperator.getters.getOperatorList,
        };

        pageCount.value = storeOperator.getters.getPageCount;
        loading.value = false;
      }, 1000);
    }

    function onSearch(e: Object) {
      loading.value = true;
      storeOperator.dispatch("searchOperatorsSearch", e)
        .then(() => loadData())
        .catch((err) => msg.value = err.message);
    }

    async function createOperator(data: OperatorCreateData) {
      const { status, error } = await OperatorService.create(data);

      if (!status) {
        msg.value = OperatorService.changeCodeToMessage(error);
      } else {
        showModal.value = false;
        loading.value = true;
        storeOperator.dispatch("fetchOperators")
          .then(() => loadData())
          .catch((err) => msg.value = err.message);
      }
    }

    onBeforeMount(() => {
      storeOperator.dispatch("fetchOperators")
        .then(() => loadData())
        .catch((err) => msg.value = err.message);
    });

    return {
      operatorList,
      createOperator,
      onSearch,
      pageCount,
      formFields,
      showModal,
      loading,
      msg,
    };
  },
});
