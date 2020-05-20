<template>
  <div>
    <Header />
    <LoginForm />
  </div>
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

<style>
</style>
