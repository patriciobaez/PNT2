<template>
  <div class="metrics-summary">
    <h2>APIs más guardadas esta semana</h2>
    <div v-if="!apiFavorites.length" class="loading">Cargando métricas...</div>
    <div v-else>
      <div class="top-cards">
        <div v-for="api in topApis" :key="api.ID" class="api-card">
          <h3>{{ api.API }}</h3>
          <p>{{ api.Description }}</p>
          <span class="badge">{{ api.favCount }} guardadas</span>
        </div>
      </div>
      <div class="chart-section">
        <BarChart :chart-data="chartData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BarChart from './BarrasChart.vue'
import { useApiFavorites } from '../composables/useApiFavorites'

const { apiFavorites, chartData } = useApiFavorites(7) // últimos 7 días

const topApis = computed(() => apiFavorites.value.slice(0, 3))
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
