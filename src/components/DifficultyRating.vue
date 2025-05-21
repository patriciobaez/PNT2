<template>
  <div>
    <span v-for="n in 3" :key="n">
       <span v-if="n <= difficulty">★</span><span v-else>☆</span>
    </span>
    <span>(Dificultad: {{ difficulty }})</span>
  </div>
</template>

<script setup>
  defineProps({ difficulty: Number })
</script>
