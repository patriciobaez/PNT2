<template>
  <div class="home-container">
    <h1 class="title">Catálogo de APIs</h1>
    <SearchApis @search="onSearch" />
    <ApiFilters :apis="apis" @filter="onFilter" />
    <div v-if="loading" class="loading">Cargando APIs…</div>
    <div v-else>
      <ApiList v-if="filteredApis.length" :apis="filteredApis" @detail="goToDetail" />
      <div v-else class="no-results">
        No se encontró ninguna API para tu búsqueda.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import SearchApis from '../components/SearchApis.vue'
import ApiList from '../components/ApiList.vue'
import ApiFilters from '../components/ApiFilters.vue'
import { useApiSearch } from '../composables/useApiSearch'

const apis = ref([])
const searchText = ref('')
const loading = ref(true)
const router = useRouter()

// Filtros
const selectedCategory = ref('')
const selectedDifficulty = ref('')

onMounted(async () => {
  const res = await fetch('/apis.json')
  apis.value = (await res.json()).filter(api => api.API)
  loading.value = false
})

const { filteredApis: searchFilteredApis } = useApiSearch(apis, searchText)

const filteredApis = computed(() => {
  return searchFilteredApis.value.filter(api => {
    const matchCategory = !selectedCategory.value || api.Category === selectedCategory.value
    const matchDifficulty = !selectedDifficulty.value || api.Difficulty == selectedDifficulty.value
    return matchCategory && matchDifficulty
  })
})

function onSearch(text) {
  searchText.value = text
}
function onFilter({ category, difficulty }) {
  selectedCategory.value = category
  selectedDifficulty.value = difficulty
}

function goToDetail(apiID) {
  router.push(`/apis/${apiID}`)
}
</script>

<style scoped>
.home-container {
  background: #fff;
  padding: 40px 32px 32px 32px;
  min-height: 100vh;
  box-sizing: border-box;
}
.title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 32px;
  letter-spacing: -1px;
}
.loading {
  font-size: 1.1rem;
  color: #888;
  padding: 32px 0;
  text-align: center;
}
.no-results {
  font-size: 1.08rem;
  color: #b0b0b0;
  text-align: center;
  margin-top: 38px;
  font-style: italic;
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
</style>
