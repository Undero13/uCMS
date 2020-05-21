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

<style>
:root {
  --base-color: #4bd16f;
}

body {
  margin: 0;
  padding: 0;
}
</style>