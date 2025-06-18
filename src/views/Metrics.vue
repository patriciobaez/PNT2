<template>
  <div class="metrics-view">
    <h1>Métricas de uso</h1>

    <section class="top-apis">
      <h2>Top 3 APIs más favoritas</h2>
      <div class="top-cards">
        <div v-for="api in topApis" :key="api.ID" class="api-card">
          <h3>{{ api.API }}</h3>
          <p>{{ api.Description }}</p>
          <span class="badge">{{ api.favCount }} favoritos</span>
        </div>
      </div>
    </section>

    <div class="filters">
      <label for="range">Filtrar por:</label>
      <select id="range" v-model="rangoSeleccionado">
        <option value="all">Histórico</option>
        <option value="7">Últimos 7 días</option>
        <option value="30">Últimos 30 días</option>
      </select>
    </div>

    <section class="chart-section">
      <h2>Gráfico de favoritos por API</h2>
      <BarChart :chart-data="chartData" />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BarChart from '../components/BarrasChart.vue'

const API_USERS = 'https://68506351e7c42cfd17988666.mockapi.io/grapis/users'
const API_LIST = '/apis.json'

const allApis = ref([])
const allUsers = ref([])
const rangoSeleccionado = ref('all')

onMounted(async () => {
  const [resApis, resUsers] = await Promise.all([
    fetch(API_LIST),
    fetch(API_USERS)
  ])
  allApis.value = await resApis.json()
  allUsers.value = await resUsers.json()
})

const usuariosFiltrados = computed(() => {
  if (rangoSeleccionado.value === 'all') return allUsers.value
  const dias = parseInt(rangoSeleccionado.value)
  const hoy = new Date()

  return allUsers.value.map(user => ({
    ...user,
    favorites: (user.favorites || []).filter(fav => {
      const diff = (hoy - new Date(fav.date)) / (1000 * 60 * 60 * 24)
//Se calcula la diferencia en días entre la fecha actual y la fecha del favorito dividiendo
//la diferencia en milisegundos por el número de milisegundos en un día.
//si la diferencia es de 7 días o menos, suma en “Últimos 7 días”;
//si es mayor a 7 pero menor o igual a 30, suma en “Últimos 30 días”;
//y si es mayor a 30, suma en “Más antiguos”      
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
      label: 'Cantidad de favoritos',
      data: apiFavorites.value.map(a => a.favCount),
      backgroundColor: '#4CAF50'
    }
  ]
}))
</script>

<style scoped>
.metrics-view {
  padding: 1rem;
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
  margin-top: 2rem;
}

.filters {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>