import { defineComponent, onBeforeMount, ref, reactive } from "@vue/runtime-dom";
import Navigation from "@/components/Navigation/Navigation.component.vue";
import Notification from "@/components/Notification/Notification.component.vue";
import TableComponent from "@/components/TableComponent/TableComponent.component.vue";
import Modal from "@/components/Modal/Modal.component.vue";
import Pagination from "@/components/Pagination/Pagination.component.vue";
import DynamicForm from "@/components/DynamicForm/DynamicForm.component.vue";
import { OperatorTable, OperatorCreateData } from "@/models/Operators.model";
import ValidatorService from "@/services/ValidatorService/ValidatorService.service";
import { FormField } from "@/models/DynamicForm.model";
import OperatorService from "@/services/OperatorService/OperatorService.service";
import { useStore } from "vuex";

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
    const { dispatch, getters } = useStore();

    const msg = ref("");
    const pageCount = ref(0);

    const loading = ref(true);
    const showModal = ref(false);

    const operatorList: OperatorTable = reactive({
      caption: "Operator List",
      headers: ["ID", "e-mail"],
      rows: [],
    });

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
      operatorList.rows = getters.getOperatorList;
      pageCount.value = getters.getPageCount;
      loading.value = false;
    }

    function onSearch(e: Object) {
      loading.value = true;
      dispatch("searchOperatorsSearch", e)
        .then(() => loadData())
        .catch(err => (msg.value = err.message));
    }

    async function createOperator(data: OperatorCreateData) {
      const { status, error } = await OperatorService.create(data);

      if (!status) {
        msg.value = OperatorService.changeCodeToMessage(error);
      } else {
        showModal.value = false;
        loading.value = true;
        dispatch("fetchOperators")
          .then(() => loadData())
          .catch(err => (msg.value = err.message));
      }
    }

    onBeforeMount(() => {
      dispatch("fetchOperators")
        .then(() => loadData())
        .catch(err => (msg.value = err.message));
    });

    return {
      operatorList,
      pageCount,
      formFields,
      showModal,
      loading,
      msg,
      createOperator,
      onSearch,
    };
  },
});
