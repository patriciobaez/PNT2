<template>
  <button
    class="fav-btn"
    :class="{ active: isFav }"
    @click.stop="toggleFav"
    :title="isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'"
  >
    <img
      :src="isFav ? filledIcon : outlineIcon"
      :class="['fav-icon', isFav ? 'filled-icon' : 'outline-icon']"
      alt="Favorito"
    />
  </button>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { MOCKAPI_BASE_URL } from '../data/mockapi'

import outlineIcon from '../assets/bookmark-outline.svg'
import filledIcon from '../assets/bookmark-filled.svg'

const props = defineProps({
  apiId: { type: String, required: true },
  userId: { type: String, required: true }
})
const emit = defineEmits(['change'])
const isFav = ref(false)
const favorites = ref([])
const API_URL = MOCKAPI_BASE_URL
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
    newFavs = newFavs.filter(fav => fav.apiId !== props.apiId)
  } else {
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
  cursor: pointer;
  transition: transform 0.1s;
}
.fav-btn:hover {
  transform: scale(1.1);
}

/* Iconos diferenciados */
.fav-icon {
  display: block;
}

.outline-icon {
  width: 30px;
  height: 30px;
}

.filled-icon {
  width: 20px;
  height: 20px;
  padding: 4px;

}

.fav-btn.active .fav-icon {
  filter: drop-shadow(0 0 4px rgba(0,0,0,0.2));
}
</style>
