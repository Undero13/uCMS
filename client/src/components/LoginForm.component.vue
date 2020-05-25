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
      <p v-if="validationError.emptyLogin" class="help is-danger">Login is empty!</p>
      <p v-if="validationError.notValidLogin" class="help is-danger">Login is not valid!</p>
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
      <p v-if="validationError.emptyPassword" class="help is-danger">Login is empty!</p>
    </div>
    <div class="control">
      <button class="button is-ucms">Login</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { LoginFormData } from "../models/LoginFormData";
import { AuthService } from "../services/AuthService";
import { LoginFromErrors } from "../models/LoginForm";

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

    function onSubmit() {
      const authService = new AuthService(form);
      const errors = authService.validateForm();
      const result = Object.values(errors).some(item => item === true);

      if (result) {
        validationError.emptyLogin = errors.emptyLogin;
        validationError.emptyPassword = errors.emptyPassword;
        validationError.notValidLogin = errors.notValidLogin;
        return validationError;
      }

      authService.loginRequest();
    }

    return { form, validationError, onSubmit };
  }
});
</script>

<style lang="scss">
@import "../vars";
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
