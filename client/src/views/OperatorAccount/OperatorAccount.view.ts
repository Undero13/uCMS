import { defineComponent, ref } from "@vue/runtime-dom";
import Navigation from "@/components/Navigation/Navigation.component.vue";
import Notification from "@/components/Notification/Notification.component.vue";
import DynamicForm from "@/components/DynamicForm/DynamicForm.component.vue";
import Modal from "@/components/Modal/Modal.component.vue";
import ValidatorService from "@/services/ValidatorService/ValidatorService.service";
import { FormField } from "@/models/DynamicForm.model";
import CookieService from "@/services/CookieService/CookieService.service";
import OperatorService from "@/services/OperatorService/OperatorService.service";

export default defineComponent({
  name: "OperatorAccount",
  components: {
    Navigation,
    Modal,
    Notification,
    DynamicForm,
  },
  setup() {
    const showPasswordChangeModal = ref(false);
    const msg = ref("");
    const formFields: FormField[] = [
      {
        type: "password",
        name: "password",
        label: "New password",
        class: "input",
        validators: [ValidatorService.required, ValidatorService.isPassword],
      },
      {
        type: "password",
        name: "remindPassword",
        label: "Remind password",
        class: "input",
        validators: [ValidatorService.required, ValidatorService.isPassword],
      },
    ];

    async function changePassword({ password, remindPassword }: { password: string; remindPassword: string }) {
      const token = CookieService.getJWToken();
      const { status } = await OperatorService.changePassword(token, password, remindPassword);

      if (!status) {
        msg.value = "Somethink is wrong. Please try later";
      }

      showPasswordChangeModal.value = false;
    }

    return {
      showPasswordChangeModal,
      formFields,
      msg,
      changePassword,
    };
  },
});
