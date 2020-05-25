<template>
  <object class="header" id="svg-object" data="images/logo.svg" type="image/svg+xml"></object>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Header",
  setup() {}
});
</script>

<style lang="scss">
.header {
  width: 100%;
  margin-left: -20px;
}
</style>
