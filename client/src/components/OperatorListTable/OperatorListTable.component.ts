import { defineComponent } from "@vue/runtime-dom";

export default defineComponent({
  name: "OperatorListTable",
  props: {
    operatorList: {
      type: Array,
      required: true,
    },
  },
});
