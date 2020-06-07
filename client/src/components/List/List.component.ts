import { defineComponent } from "@vue/runtime-dom";
import ListItem from "./ListItem/ListItem.component.vue";

export default defineComponent({
  name: "List",
  components: {
    ListItem,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
});
