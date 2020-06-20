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
  setup() {
    function emitSearch(e: any) {
      this.$emit("setSearch", e);
    }

    return {
      emitSearch,
    };
  },
});
