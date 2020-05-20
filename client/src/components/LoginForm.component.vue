<template>
  <form>
    <div class="row">
      <label for="login">Your e-mail</label>
      <input type="email" name="login" id="login" />
    </div>
    <div class="row">
      <label for="password">Your password</label>
      <input type="password" name="password" id="password" />
    </div>
    <input type="submit" value="Login" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginForm"
});
</script>

<style>
</style>
