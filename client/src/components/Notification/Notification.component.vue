<template>
  <div class="notification notification--position" :class="setType()">{{ msg }}</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-dom";

export default defineComponent({
  name: "Notification",
  props: {
    msg: {
      type: String
    },
    type: {
      type: String,
      default: "error"
    }
  },
  setup() {
    function setType() {
      let className = "";

      if (this.type === "error") {
        className = "is-danger";
      } else if (this.type === "info") {
        className = "is-info";
      } else if (this.type === "success") {
        className = "is-success";
      }

      return className;
    }

    return {
      setType
    };
  }
});
</script>

<style lang="scss">
.notification.notification--position {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: show linear 6s forwards;
}

@keyframes show {
  0% {
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
