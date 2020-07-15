import { defineComponent } from "@vue/runtime-dom";
import { BlurEvent } from "@/models/DynamicForm.model";

export default defineComponent({
  name: "TableRowFilter",
  props: {
    name: {
      type: String,
    },
  },
  setup(props, context) {
    function onChange(e: BlurEvent) {
      const { name, value } = e.target;
      const search = {
        [name]: value,
      };

      context.emit("onSearch", search);
    }

    return {
      onChange,
    };
  },
});
