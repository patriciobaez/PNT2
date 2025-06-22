<template>
  <div class="metrics-view">
    <h1>Métricas de uso</h1>

    <section class="top-apis">
      <h2>Top 3 APIs más guardadas</h2>
      <div class="top-cards">
        <div v-for="api in topApis" :key="api.ID" class="api-card">
          <h3>{{ api.API }}</h3>
          <p>{{ api.Description }}</p>
          <span class="badge">{{ api.favCount }} guardadas</span>
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
      <h2>Gráfico de guardados por API</h2>
      <BarChart :chart-data="chartData" />
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BarChart from '../components/BarrasChart.vue'
import { useApiFavorites } from '../composables/useApiFavorites'

const rangoSeleccionado = ref('all')

const rangoEnDias = computed(() => {
  return rangoSeleccionado.value === 'all' ? 0 : parseInt(rangoSeleccionado.value)
})

const { apiFavorites, chartData } = useApiFavorites(rangoEnDias)

const topApis = computed(() => apiFavorites.value.slice(0, 3))
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
