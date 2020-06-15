import { defineComponent, onBeforeMount, ref } from "@vue/runtime-dom";
import Navigation from "@/components/Navigation/Navigation.component.vue";
import Notification from "@/components/Notification/Notification.component.vue";
import TableComponent from "@/components/TableComponent/TableComponent.component.vue";
import Modal from "@/components/Modal/Modal.component.vue";
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
    Modal,
    DynamicForm,
  },
  setup() {
    const operatorList: OperatorTable = ref({});
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

        loading.value = false;
      }, 1000);
    }

    async function createOperator(data: OperatorCreateData) {
      const { status, error } = await OperatorService.create(data);

      if (!status) {
        msg.value = OperatorService.changeCodeToMessage(error);
      } else {
        showModal.value = false;
        loading.value = true;
        storeOperator.dispatch("fetchOperators");
        loadData();
      }
    }

    onBeforeMount(() => {
      storeOperator.dispatch("fetchOperators");
      loadData();
    });

    return {
      operatorList,
      createOperator,
      formFields,
      showModal,
      loading,
      msg,
    };
  },
});
