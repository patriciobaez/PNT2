<template>
  <Navbar />
  <div class="main-content">
    <RouterView />
  </div>
</template>

<script setup>
  import Navbar from './components/Navbar.vue'
</script>

<style scoped>
  .main-content {
    margin-left: 72px; /* igual al ancho de la navbar */
    min-height: 100vh;
    background: #f5f6fa;
  }
</style>