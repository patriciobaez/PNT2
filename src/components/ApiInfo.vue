<template>
  <ul class="api-info-list">
    <li><strong>Auth:</strong> <span>{{ api.Auth || 'Ninguno' }}</span></li>
    <li><strong>HTTPS:</strong> <span :class="api.HTTPS ? 'yes' : 'no'">{{ api.HTTPS ? 'Sí' : 'No' }}</span></li>
    <li><strong>CORS:</strong> <span>{{ api.Cors }}</span></li>
    <li><strong>fetchURL:</strong> <code class="api-url">{{ api.fetchURL }}</code></li>
    <li v-if="api.notes"><strong>Notas:</strong> <span>{{ api.notes }}</span></li>
  </ul>
</template>

<script setup>
  defineProps({ api: Object })
</script>

<style scoped>
.api-info-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 1rem;
}
.api-info-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
}
.api-info-list strong {
  min-width: 90px;
  color: #f26c21;
  font-weight: 600;
}
.api-info-list .api-url {
  background: #ececec;
  border-radius: 6px;
  padding: 2px 6px;
  font-size: 0.97em;
  color: #1a202c;
}
.api-info-list .yes {
  color: #1bbf5c;
  font-weight: 600;
}
.api-info-list .no {
  color: #e74c3c;
  font-weight: 600;
}
</style>
