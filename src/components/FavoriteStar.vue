<template>
  <button class="fav-btn" :class="{ active: isFav }" @click.stop="toggleFav" :title="isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'">
    <span v-if="isFav">★</span>
    <span v-else>☆</span>
  </button>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  apiId: { type: String, required: true },
  userId: { type: String, required: true }
})
const emit = defineEmits(['change'])
const isFav = ref(false)
const favorites = ref([])
const API_URL = 'https://68506351e7c42cfd17988666.mockapi.io/grapis/users'
const router = useRouter()

async function fetchUserFavs() {
  if (!props.userId) return
  const res = await fetch(`${API_URL}/${props.userId}`)
  if (res.ok) {
    const user = await res.json()
    favorites.value = Array.isArray(user.favorites) ? user.favorites : []
    isFav.value = favorites.value.some(fav => fav.apiId === props.apiId)
  }
}

async function toggleFav() {
  if (!props.userId) {
    router.push('/login')
    return
  }
  await fetchUserFavs()
  let newFavs = [...favorites.value]
  if (isFav.value) {
    // Quitar favorito: filtrar el objeto por apiId
    newFavs = newFavs.filter(fav => fav.apiId !== props.apiId)
  } else {
    // Agregar favorito: push objeto con apiId y fecha actual
    newFavs.push({ apiId: props.apiId, date: new Date().toISOString() })
  }
  const res = await fetch(`${API_URL}/${props.userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ favorites: newFavs })
  })
  if (res.ok) {
    favorites.value = newFavs
    isFav.value = newFavs.some(fav => fav.apiId === props.apiId)
    emit('change', isFav.value)
  }
}

onMounted(fetchUserFavs)
watch(() => [props.apiId, props.userId], fetchUserFavs)
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
