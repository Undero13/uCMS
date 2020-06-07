import { defineComponent, ref } from "@vue/runtime-dom";
import ItemLink from "@/components/List/ListLink/ListLink.component.vue";

export default defineComponent({
  name: "ListItem",
  components: {
    ItemLink,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const showDropdown = ref(false);
    return {
      showDropdown,
    };
  },
});
