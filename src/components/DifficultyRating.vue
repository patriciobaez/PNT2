<template>
  <div class="flex items-center gap-1">
    <span v-for="n in 3" :key="n" class="text-yellow-400 text-xl">
      <span v-if="n <= difficulty">★</span><span v-else>☆</span>
    </span>
    <span class="ml-2 text-sm text-gray-500">(Dificultad: {{ difficulty }})</span>
  </div>
</template>
<script setup>
defineProps({ difficulty: Number })
</script>