import { defineComponent, reactive, Ref, ref } from "@vue/runtime-dom";
import { FormField, BlurEvent } from "@/models/DynamicForm.model";
import * as messager from "@/components/DynamicForm/DynamicForm.component.json";

export default defineComponent({
  name: "DynamicForm",
  props: {
    fields: {
      type: Array,
      required: true,
    },
  },
  setup(props:any, context) {
    const errorsMsg: string[] = reactive([]);
    const formElement: Ref<HTMLFormElement | undefined> = ref(undefined);

    function onSubmit() {
      const form = formElement.value;
      const formData = new FormData(form);

      context.emit("formSubmit", Object.fromEntries(formData));
    }

    function changeErrorCodeToMsg(errorsCode: string[]) {
      errorsCode.forEach((code) => {
        const messagerInstance: any = messager;
        errorsMsg.push(messagerInstance.default[code]);
      });
    }

    function clearErrorMsg() {
      errorsMsg.length = 0;
    }

    function validate(event: BlurEvent, inputName: string) {
      const { value } = event.target;
      const validateErrorsCode: string[] = [];

      const fields: FormField[] = [...props.fields];
      const field = fields.find(({ name }) => name === inputName);

      field?.validators?.forEach((validator) => {
        const validatorName = validator.name;
        const isValid = validator(value);

        if (!isValid) {
          validateErrorsCode.push(validatorName);
        }
      });

      changeErrorCodeToMsg(validateErrorsCode);
    }

    function checkType(fieldType: string, inputType: string): boolean {
      const fields: any = {
        input: [
          "text",
          "file",
          "email",
          "number",
          "hidden",
          "password",
          "tel",
          "checkbox",
          "radio",
        ],
        select: ["select"],
        textarea: ["textarea"],
      };

      if (fields[inputType].includes(fieldType)) {
        return true;
      }

      return false;
    }

    return {
      checkType,
      validate,
      onSubmit,
      clearErrorMsg,
      errorsMsg,
      formElement,
    };
  },
});
