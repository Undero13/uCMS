import { defineComponent } from "@vue/runtime-dom";

export default defineComponent({
  name: "TableComponent",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
});
