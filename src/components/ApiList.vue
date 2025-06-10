<template>
  <ul class="api-list">
    <li v-for="api in apis" :key="api.ID" class="api-card">
      <div class="api-info">
        <div class="api-name">{{ api.API }}</div>
        <div class="api-desc">{{ api.Description }}</div>
      </div>
      <div class="api-actions">
        <FavoriteStar :api-id="api.ID" :user-email="userEmail" @change="onFavChange" />
        <button class="detail-btn" @click="$emit('detail', api.ID)">
          Ver detalle
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import FavoriteStar from './FavoriteStar.vue'
const props = defineProps({ apis: Array })
const emit = defineEmits(['detail'])

const userEmail = sessionStorage.getItem('userEmail')
const favKey = userEmail ? `favoritos_${userEmail}` : null
const favoritos = ref([])

function loadFavs() {
  if (favKey) {
    favoritos.value = JSON.parse(localStorage.getItem(favKey) || '[]')
  }
}
function isFav(id) {
  return favoritos.value.includes(id)
}
function onFavChange() {
  loadFavs()
}
watchEffect(loadFavs)
</script>

<style scoped>

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
</style>