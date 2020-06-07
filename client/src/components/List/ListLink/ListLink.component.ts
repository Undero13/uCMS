import { defineComponent } from "@vue/runtime-dom";

export default defineComponent({
  name: "ListLink",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
});
