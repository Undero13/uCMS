import { defineComponent } from "@vue/runtime-dom";
import TableRowFilter from "./TableRowFilter/TableRowFilter.component.vue";

export default defineComponent({
  name: "TableComponent",
  components: {
    TableRowFilter,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    function emitSearch(e: any) {
      context.emit("setSearch", e);
    }

    return {
      emitSearch,
    };
  },
});
