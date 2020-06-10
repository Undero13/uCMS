import { defineComponent, onBeforeMount, ref } from "@vue/runtime-dom";
import Navigation from "@/components/Navigation/Navigation.component.vue";
import TableComponent from "@/components/TableComponent/TableComponent.component.vue";
import Modal from "@/components/Modal/Modal.component.vue";
import storeOperator from "@/store/operator/store.ts";
import DynamicForm from "@/components/DynamicForm/DynamicForm.component.vue";
import { OperatorTable } from "@/models/Operators.model";
import ValidatorService from "@/services/ValidatorService/ValidatorService.service.ts";
import { FormField } from "@/models/DynamicForm.model";

export default defineComponent({
  name: "OperatorList",
  components: {
    Navigation,
    TableComponent,
    Modal,
    DynamicForm,
  },
  setup() {
    const operatorList: OperatorTable = ref(false);
    const showModal = ref(false);
    const formFields: FormField[] = [
      {
        type: "email",
        name: "email",
        label: "Operator e-mail",
        class: "input",
        validators: [ValidatorService.required, ValidatorService.isEmail],
      },
    ];

    onBeforeMount(() => {
      storeOperator.dispatch("fetchOperators");
      setTimeout(
        () =>
          (operatorList.value = {
            caption: "Operator List",
            headers: ["ID", "e-mail"],
            rows: storeOperator.getters.getOperatorList,
          }),
        1000
      );
    });

    return {
      operatorList,
      formFields,
      showModal,
    };
  },
});
