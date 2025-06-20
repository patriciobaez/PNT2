<template>
  <div class="metrics-summary">
    <h2>APIs más rankeadas esta semana</h2>
    <div class="top-cards">
      <div v-for="api in topApis" :key="api.ID" class="api-card">
        <h3>{{ api.API }}</h3>
        <p>{{ api.Description }}</p>
        <span class="badge">{{ api.favCount }} favoritos</span>
      </div>
    </div>
    <div class="chart-section">
      <BarChart :chart-data="chartData" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BarChart from './BarrasChart.vue'
import { MOCKAPI_BASE_URL } from '../data/mockapi'

const API_LIST = '/apis.json'

const allApis = ref([])
const allUsers = ref([])

onMounted(async () => {
  const [resApis, resUsers] = await Promise.all([
    fetch(API_LIST),
    fetch(MOCKAPI_BASE_URL)
  ])
  allApis.value = await resApis.json()
  allUsers.value = await resUsers.json()
})

const usuariosFiltrados = computed(() => {
  // Solo últimos 7 días
  const dias = 7
  const hoy = new Date()
  return allUsers.value.map(user => ({
    ...user,
    favorites: (user.favorites || []).filter(fav => {
      const diff = (hoy - new Date(fav.date)) / (1000 * 60 * 60 * 24)
      return diff <= dias
    })
  }))
})

const apiFavorites = computed(() => {
  const favCount = {}
  usuariosFiltrados.value.forEach(user => {
    (user.favorites || []).forEach(fav => {
      if (!favCount[fav.apiId]) favCount[fav.apiId] = 0
      favCount[fav.apiId]++
    })
  })
  return Object.entries(favCount)
    .map(([apiId, count]) => {
      const api = allApis.value.find(a => a.ID == apiId)
      return {
        ID: api?.ID,
        API: api?.API || 'Desconocido',
        Description: api?.Description || '',
        favCount: count
      }
    })
    .sort((a, b) => b.favCount - a.favCount)
})

const topApis = computed(() => apiFavorites.value.slice(0, 3))

const chartData = computed(() => ({
  labels: apiFavorites.value.map(a => a.API),
  datasets: [
    {
      label: 'Favoritos (7 días)',
      data: apiFavorites.value.map(a => a.favCount),
      backgroundColor: '#4CAF50'
    }
  ]
}))
</script>

<style scoped>
.metrics-summary {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px 0 rgba(60, 60, 60, 0.04);
  padding: 24px 28px;
  margin-left: 24px;
  min-width: 340px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.top-cards {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.api-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  width: 200px;
  background-color: #f9f9f9;
}
.api-card h3 {
  margin: 0 0 0.5rem 0;
}
.api-card .badge {
  background-color: #4CAF50;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}
.chart-section {
  margin-top: 1.5rem;
}
</style>
