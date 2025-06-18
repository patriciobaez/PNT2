<template>
  <div class="filters-bar">
    <select v-model="selectedCategory" class="filter-select">
      <option value="">Todas las categorías</option>
      <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
    </select>
    <select v-model="selectedDifficulty" class="filter-select">
      <option value="">Todas las dificultades</option>
      <option v-for="diff in difficulties" :key="diff" :value="diff">
        {{ renderStars(diff) }} Dificultad: {{ diff }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
const props = defineProps({
  apis: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['filter'])

const selectedCategory = ref('')
const selectedDifficulty = ref('')

const categories = computed(() => {
  return [...new Set(props.apis.map(api => api.Category))].sort()
})
const difficulties = computed(() => {
  return [...new Set(props.apis.map(api => api.Difficulty))].sort((a, b) => a - b)
})

function renderStars(difficulty) {
  let stars = ''
  for (let i = 1; i <= 3; i++) {
    stars += i <= difficulty ? '★' : '☆'
  }
  return stars
}

watch([selectedCategory, selectedDifficulty], () => {
  emit('filter', {
    category: selectedCategory.value,
    difficulty: selectedDifficulty.value
  })
})
</script>

<style scoped>
.filters-bar {
  display: flex;
  gap: 18px;
  margin-bottom: 24px;
}
.filter-select {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  background: #f8fafc;
  color: #222;
  outline: none;
  transition: border 0.18s;
}
.filter-select:focus {
  border-color: #f26c21;
}
</style>
