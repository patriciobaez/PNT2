<template>
  <input
    type="text"
    placeholder="Buscar APIs…"
    v-model="input"
    @input="$emit('search', input)"
    class="search-input"
  />
</template>

<script setup>
    import { ref } from 'vue'
    const input = ref('')
</script>

<style scoped>
.search-input {
  width: 100%;
  padding: 12px 18px;
  font-size: 1.1rem;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 28px;
  box-sizing: border-box;
}
</style>