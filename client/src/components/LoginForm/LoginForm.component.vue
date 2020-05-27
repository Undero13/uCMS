<template>
  <form class="form" @submit.prevent="onSubmit" novalidate>
    <div class="field">
      <label class="label" for="login">Your e-mail</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          :class="{'is-danger':validationError.emptyLogin || validationError.notValidLogin}"
          type="email"
          name="login"
          id="login"
          v-model="form.login"
        />
        <span class="icon is-small is-left">
          <span aria-hidden="true" class="fa fa-envelope"></span>
        </span>
      </div>
      <p v-if="validationError.emptyLogin" class="help login-help is-danger">Login is empty!</p>
      <p v-if="validationError.notValidLogin" class="help login-help is-danger">Login is not valid!</p>
    </div>

    <div class="field">
      <label class="label" for="password">Your password</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          :class="{'is-danger':validationError.emptyPassword}"
          type="password"
          name="password"
          id="password"
          v-model="form.password"
        />
        <span class="icon is-small is-left">
          <span class="fa fa-unlock-alt" aria-hidden="true"></span>
        </span>
      </div>
      <p
        v-if="validationError.emptyPassword"
        class="help password-help is-danger"
      >Password is empty!</p>
    </div>
    <div class="control">
      <button class="button is-ucms">Login</button>
    </div>
  </form>
</template>

<script lang="ts">
import AuthService from "@/services/AuthService/AuthService.ts";
import { defineComponent, reactive } from "@vue/runtime-dom";
import { LoginFormData } from "@/models/LoginForm.ts";
import { LoginFromErrors } from "@/models/LoginForm.ts";

export default defineComponent({
  name: "LoginForm",
  setup() {
    const form: LoginFormData = reactive({
      login: "",
      password: ""
    });

    const validationError: LoginFromErrors = reactive({
      emptyLogin: false,
      emptyPassword: false,
      notValidLogin: false
    });

    async function onSubmit() {
      const authService = new AuthService(form);
      const errors = authService.validateForm();
      const result = Object.values(errors).some(item => item === true);

      if (result) {
        validationError.emptyLogin = errors.emptyLogin;
        validationError.emptyPassword = errors.emptyPassword;
        validationError.notValidLogin = errors.notValidLogin;
        return validationError;
      }

      const { data, status } = await authService.loginRequest();

      if (status === 200) {
        if (!data.status) {
          const msg = authService.changeCodeToMessage(data.error);
          return this.$emit("showErrorMsg", msg);
        }
        this.$router.push({ name: "home" });
      } else {
        const msg = "Unexpected error, try later";
        return this.$emit("showErrorMsg", msg);
      }
    }

    return { form, validationError, onSubmit };
  }
});
</script>

<style lang="scss">
@import "@/vars.scss";
.form {
  margin-top: 30px;

  .button {
    &:hover {
      background: darken($primary-color, 10);
      border-color: transparent;
      color: #fff;
    }
  }
}
</style>
