<script lang="ts" setup>
import TheHeader from "@/components/layout/TheHeader.vue";
</script>

<template>
  <div>
    <header class="header">
      <TheHeader />
    </header>
    <main class="container mx-auto main mt-10">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
.header {
  position: sticky;
  width: 100%;
}
</style>
