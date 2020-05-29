import { defineComponent } from "@vue/runtime-dom";

export default defineComponent({
  name: "Notification",
  props: {
    msg: {
      type: String,
    },
    type: {
      type: String,
      default: "error",
    },
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
      setType,
    };
  },
});
