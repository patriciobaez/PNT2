<template>
  <button
    class="fav-btn"
    :class="{ active: isFav }"
    @click.stop="toggleFav"
    :title="isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'"
  >
    <span>{{ isFav ? '★' : '☆' }}</span>
  </button>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { MOCKAPI_BASE_URL } from '../data/mockapi'
import { useUserStore } from '../stores/userStore'

const props = defineProps({
  apiId: { type: String, required: true },
  userId: { type: String, required: true }
})
const emit = defineEmits(['change'])
const router = useRouter()
const userStore = useUserStore()

const isFav = ref(false)
const favorites = ref([])

async function fetchUserFavs() {
  const res = await fetch(`${MOCKAPI_BASE_URL}/${props.userId}`)
  if (res.ok) {
    const user = await res.json()
    favorites.value = user.favorites || []
    isFav.value = favorites.value.some(fav => fav.apiId === props.apiId)
  }
}

async function toggleFav() {
  if (!props.userId) {
    router.push('/login')
    return
  }
  await fetchUserFavs()

  favorites.value = isFav.value
    ? favorites.value.filter(fav => fav.apiId !== props.apiId)
    : [...favorites.value, { apiId: props.apiId, date: new Date().toISOString() }]

  const res = await fetch(`${MOCKAPI_BASE_URL}/${props.userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ favorites: favorites.value })
  })
  if (res.ok) {
    isFav.value = favorites.value.some(fav => fav.apiId === props.apiId)
    if (isFav.value) {
      userStore.addFavorite(props.userId, props.apiId)
    } else {
      userStore.removeFavorite(props.userId, props.apiId)
    }
    emit('change', isFav.value)
  }
}

onMounted(fetchUserFavs)
watchEffect(fetchUserFavs)
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
