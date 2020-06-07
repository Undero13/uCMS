import AuthService from "@/services/AuthService/AuthService.service.ts";
import { defineComponent, reactive } from "@vue/runtime-dom";
import { LoginFormData, LoginFromErrors } from "@/models/LoginForm.model.ts";
import CookieService from "@/services/CookieService/CookieService.service";

export default defineComponent({
  name: "LoginForm",
  setup() {
    const form: LoginFormData = reactive({
      login: "",
      password: "",
    });

    const validationError: LoginFromErrors = reactive({
      emptyLogin: false,
      emptyPassword: false,
      notValidLogin: false,
    });

    async function onSubmit() {
      const authService = new AuthService(form);
      const errors = authService.validateForm();
      const result = Object.values(errors).some((item) => item === true);

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

        const { token } = data.data[0];
        CookieService.setToken(token);
        return this.$router.push({ name: "home" });
      }

      const msg = "Unexpected error, try later";
      return this.$emit("showErrorMsg", msg);
    }

    return { form, validationError, onSubmit };
  },
});
