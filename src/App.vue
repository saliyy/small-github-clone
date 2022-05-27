<script setup lang="ts">
  import TheHeader from './components/layout/TheHeader.vue'
</script>

<template>
  <div>
    <header class="header">
      <TheHeader></TheHeader>
    </header>
    <main class="container mx-auto main">
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
