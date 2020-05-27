<template>
  <object class="header" id="svg-object" data="images/logo.svg" type="image/svg+xml"></object>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-dom";

export default defineComponent({
  name: "Header"
});
</script>

<style lang="scss">
.header {
  width: 100%;
  margin-left: -20px;
}
</style>
