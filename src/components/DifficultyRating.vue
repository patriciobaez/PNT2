<template>
  <div class="difficulty-rating">
    <span v-for="n in 3" :key="n" class="star">
      <span v-if="n <= difficulty">★</span><span v-else>☆</span>
    </span>
    <span class="diff-label">Dificultad: {{ difficulty }}</span>
  </div>
</template>

<script setup>
  defineProps({ difficulty: Number })
</script>

<style scoped>
.difficulty-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.15rem;
  color: #f26c21;
  background: #f8fafc;
  border-radius: 8px;
  padding: 4px 12px;
}
.star {
  font-size: 1.3em;
  margin-right: 2px;
}
.diff-label {
  color: #6b7280;
  font-size: 1em;
  margin-left: 8px;
}
</style>
