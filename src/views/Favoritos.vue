<template>
  <div class="favoritos-view">
    <h1>Mis APIs guardadas</h1>
    <SearchApis v-model="search" @search="onSearch" />
    <ApiFilters :apis="userFavApis" @filter="onFilter" />    <ul class="api-list">
      <li v-for="api in filteredFavs" :key="api.ID" class="api-card">
        <div class="api-info">
          <div class="api-name">{{ api.API }}</div>
          <div class="api-desc">{{ api.Description }}</div>
        </div>
        <div class="api-actions">
          <FavoriteStar :api-id="api.ID" :user-id="userId" @change="loadUserFavs" />
          <button class="detail-btn" @click="goToDetail(api.ID)">Ver detalle</button>
        </div>
      </li>
    </ul>
    <div v-if="filteredFavs.length === 0" class="no-favs">No tienes APIs guardadas.</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import FavoriteStar from '../components/FavoriteStar.vue'
import ApiFilters from '../components/ApiFilters.vue'
import SearchApis from '../components/SearchApis.vue'
import { MOCKAPI_BASE_URL } from '../data/mockapi'

const API_URL = MOCKAPI_BASE_URL
const router = useRouter()
const userId = sessionStorage.getItem('userId')
const allApis = ref([])
const userFavorites = ref([])
const search = ref('')
const filter = ref({ category: '', difficulty: '' })

onMounted(async () => {
  if (!userId) {
    router.replace('/login')
    return
  }
  const res = await fetch('/apis.json')
  allApis.value = await res.json()
  await loadUserFavs()
})

async function loadUserFavs() {
  if (!userId) return
  const res = await fetch(`${API_URL}/${userId}`)
  if (res.ok) {
    const user = await res.json()
    userFavorites.value = Array.isArray(user.favorites) ? user.favorites : []
  }
}

const userFavApis = computed(() => allApis.value.filter(api => userFavorites.value.some(fav => fav.apiId === api.ID)))

const filteredFavs = computed(() => {
  let favApis = userFavApis.value
  if (filter.value.category) {
    favApis = favApis.filter(api => api.Category === filter.value.category)
  }
  if (filter.value.difficulty) {
    favApis = favApis.filter(api => String(api.Difficulty) === String(filter.value.difficulty))
  }
  if (search.value) {
    favApis = favApis.filter(api => api.API.toLowerCase().includes(search.value.toLowerCase()))
  }
  return favApis
})

function onSearch(val) {
  search.value = val
}
function onFilter(val) {
  filter.value = val
}
function goToDetail(id) {
  router.push(`/apis/${id}`)
}
</script>

<style scoped>
.favoritos-view {
  max-width: 700px;
  margin: 40px auto;
  padding: 32px;
  background: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 2px 12px #0001;
  text-align: center;
}
.api-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.api-card {
  background: #f8fafc;
  border-radius: 18px;
  box-shadow: 0 2px 8px 0 rgba(60, 60, 60, 0.04);
  padding: 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: box-shadow 0.18s;
}
.api-card:hover {
  box-shadow: 0 4px 16px 0 rgba(60, 60, 60, 0.10);
}
.api-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
}
.api-name {
  font-size: 1.18rem;
  font-weight: 600;
  color: #1a202c;
}
.api-desc {
  font-size: 1rem;
  color: #6b7280;
  max-width: 480px;
}
.api-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.detail-btn {
  background: linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 10px 22px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 1px 4px 0 rgba(255, 126, 95, 0.10);
  transition: background 0.18s, box-shadow 0.18s;
}
.detail-btn:hover {
  background: linear-gradient(90deg, #feb47b 0%, #ff7e5f 100%);
  box-shadow: 0 2px 8px 0 rgba(255, 126, 95, 0.18);
}
.no-favs {
  margin-top: 32px;
  color: #888;
  font-size: 1.1rem;
}
</style>
