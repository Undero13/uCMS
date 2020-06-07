import { defineComponent, ref } from "@vue/runtime-dom";
import Logo from "@/components/Logo/Logo.component.vue";
import LoginForm from "@/components/LoginForm/LoginForm.component.vue";
import Notification from "@/components/Notification/Notification.component.vue";

export default defineComponent({
  name: "Login",
  components: {
    Logo,
    LoginForm,
    Notification,
  },
  setup() {
    const msg = ref("");

    function setMessage(e: string) {
      msg.value = e;
    }

    return {
      setMessage,
      msg,
    };
  },
});
