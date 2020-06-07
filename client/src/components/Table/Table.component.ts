import { defineComponent } from "@vue/runtime-dom";

export default defineComponent({
  name: "Table",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
});
