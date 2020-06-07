import { defineComponent, ref, onUnmounted } from "@vue/runtime-dom";

export default defineComponent({
  name: "Modal",
  setup() {
    const overlay = ref(true);
    onUnmounted(() => overlay.value = false);

    function modalClose() {
      return this.$emit("modalClose");
    }

    return {
      overlay,
      modalClose
    };
  },
});
