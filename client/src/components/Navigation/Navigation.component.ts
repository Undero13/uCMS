import { defineComponent, ref } from "@vue/runtime-dom";
import Header from '@/components/Header/Header.component.vue';

export default defineComponent({
  name: "Navigation",
  components: {
    Header,
  },
  setup() {
    const showMenu = ref(false);

    return {
      showMenu,
    };
  },
});
