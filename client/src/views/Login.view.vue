<template>
  <main class="login">
    <div class="login__form">
      <Header />
      <LoginForm />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.component.vue";
import LoginForm from "../components/LoginForm.component.vue";

export default defineComponent({
  name: "Login",
  components: {
    Header,
    LoginForm
  }
});
</script>

<style lang="scss">
@import "../vars.scss";
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
