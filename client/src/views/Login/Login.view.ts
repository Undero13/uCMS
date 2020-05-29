import { defineComponent, ref } from "@vue/runtime-dom";
import Header from "@/components/Header/Header.component.vue";
import LoginForm from "@/components/LoginForm/LoginForm.component.vue";
import Notification from "@/components/Notification/Notification.component.vue";

export default defineComponent({
  name: "Login",
  components: {
    Header,
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
