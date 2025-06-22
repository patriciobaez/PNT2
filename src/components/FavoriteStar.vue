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
import { ref, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { MOCKAPI_BASE_URL } from '../data/mockapi'
import { useUserStore } from '../stores/userStore'

import outlineIcon from '../assets/bookmark-outline.svg'
import filledIcon from '../assets/bookmark-filled.svg'

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
