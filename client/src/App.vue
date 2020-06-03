<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-dom";

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

.is-loading {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: text-bottom;
  border: 0.25em solid $primary-color;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: spinner-border 0.75s linear infinite;
  animation: spinner 0.75s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>