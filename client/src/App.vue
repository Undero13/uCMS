<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-dom";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss">
@import "./global.scss";
</style>
