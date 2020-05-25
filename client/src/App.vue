<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App"
});
</script>

<style lang="scss">
@import "../node_modules/bulma/bulma.sass";
@import "./vars.scss";

.is-ucms {
  background-color: $primary-color;
  border-color: transparent;
  color: #fff;
}
</style>