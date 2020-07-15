import { defineComponent, ref, onUnmounted } from "@vue/runtime-dom";

export default defineComponent({
  name: "Modal",
  setup(props, context) {
    const overlay = ref(true);
    onUnmounted(() => (overlay.value = false));

    function modalClose() {
      return context.emit("modalClose");
    }

    return {
      overlay,
      modalClose,
    };
  },
});
