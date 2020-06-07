import { defineComponent, watchEffect, onUnmounted } from "@vue/runtime-dom";

export default defineComponent({
  name: "Modal",
  setup() {
    watchEffect(() => {
      document.body.classList.add("overlay");
    });

    onUnmounted(() => document.body.classList.remove("overlay"));
  },
});
