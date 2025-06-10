<template>
  <button class="fav-btn" :class="{ active: isFav }" @click.stop="toggleFav" :title="isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'">
    <span v-if="isFav">★</span>
    <span v-else>☆</span>
  </button>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
const props = defineProps({
  apiId: { type: String, required: true },
  userEmail: { type: String, required: true }
})
const emit = defineEmits(['change'])
const favKey = `favoritos_${props.userEmail}`
const isFav = ref(false)

function loadFav() {
  const favs = JSON.parse(localStorage.getItem(favKey) || '[]')
  isFav.value = favs.includes(props.apiId)
}
function toggleFav() {
  let favs = JSON.parse(localStorage.getItem(favKey) || '[]')
  if (isFav.value) {
    favs = favs.filter(f => f !== props.apiId)
  } else {
    favs.push(props.apiId)
  }
  localStorage.setItem(favKey, JSON.stringify(favs))
  isFav.value = !isFav.value
  emit('change', isFav.value)
}
watchEffect(loadFav)
</script>

<style scoped>
.fav-btn {
  background: none;
  border: none;
  font-size: 1.7rem;
  cursor: pointer;
  color: #bbb;
  transition: color 0.2s, transform 0.1s;
  padding: 0 6px;
}
.fav-btn.active {
  color: #ffd600;
  transform: scale(1.2);
  text-shadow: 0 2px 8px #ffd60055;
}
.fav-btn:hover {
  color: #ffb300;
  transform: scale(1.15);
}
</style>
