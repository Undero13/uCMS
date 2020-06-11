import { defineComponent, Ref, ref } from "@vue/runtime-dom";
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
  setup(props: any) {
    const errorsMsg: Ref<string[]> = ref([]);

    const changeErrorCodeToMsg = (errorsCode: string[]) =>
      errorsCode.forEach((code) => {
        const messagerInstance:any = messager;
        errorsMsg.value.push(messagerInstance.default[code]);
      });

    const clearErrorMsg = () => (errorsMsg.value = []);

    const validate = (event: BlurEvent, inputName: string) => {
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
    };

    const checkType = (fieldType: string, inputType: string) => {
      const fields: any = {
        input: [
          "text",
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
    };

    return {
      checkType,
      validate,
      errorsMsg,
      clearErrorMsg,
    };
  },
});
