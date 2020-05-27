<template>
  <main class="login">
    <div class="login__form">
      <Header />
      <LoginForm @showErrorMsg="setMessage($event)" />
      <Notification v-if="msg" :msg="msg" :type="'error'" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-dom";
import Header from "@/components/Header/Header.component.vue";
import LoginForm from "@/components/LoginForm/LoginForm.component.vue";
import Notification from "@/components/Notification/Notification.component.vue";

export default defineComponent({
  name: "Login",
  components: {
    Header,
    LoginForm,
    Notification
  },
  setup() {
    const msg = ref("");

    function setMessage(e: string) {
      msg.value = e;
    }

    return {
      setMessage,
      msg
    };
  }
});
</script>

<style lang="scss">
@import "@/vars.scss";
.login {
  display: flex;
  flex-direction: column;
  height: 80vh;
  align-items: center;
  justify-content: center;

  &__form {
    border: 3px solid $primary-color;
    padding: 70px;
    border-radius: 10px;
  }
}
</style>
