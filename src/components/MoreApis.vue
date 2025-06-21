<template>
  <div class="more-apis-card">
    <h2 class="more-apis-card__title">Más APIs de esta categoría</h2>
    <hr class="more-apis-card__separator" />

    <div v-if="loading" class="more-apis-card__loading">
      Cargando APIs…
    </div>

    <ul v-else class="more-apis-card__list">
      <li v-if="!items.length" class="more-apis-card__empty">
        Por ahora no hay otras APIs en esta categoría.
      </li>
      <li v-for="item in items" :key="item.ID">
        <router-link
          :to="`/apis/${item.ID}`"
          class="more-apis-card__button"
        >
          {{ item.API }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  category:  { type: String, required: true },
  currentId: { type: [String, Number], required: true }
})

const loading = ref(true)
const items   = ref([])

async function loadItems() {
  loading.value = true
  try {
    const res = await fetch('/apis.json')
    const all = await res.json()
    items.value = all.filter(
      api =>
        api.Category === props.category &&
        String(api.ID) !== String(props.currentId)
    )
  } catch (e) {
    console.error('Error cargando MoreApis:', e)
    items.value = []
  } finally {
    loading.value = false
  }
}

watch(
  () => [props.category, props.currentId],
  loadItems,
  { immediate: true }
)
</script>

<style scoped>
.more-apis-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(60, 60, 60, 0.08);
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0; 
}

.more-apis-card__title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #222;
  margin: 0;
}

.more-apis-card__separator {
  border: none;
  border-top: 1px solid #ddd;
  margin: 0;
}

.more-apis-card__loading {
  color: #888;
  font-style: italic;
}

.more-apis-card__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.more-apis-card__empty {
  font-style: italic;
  color: #6b7280;
}

.more-apis-card__button {
  display: block;
  background: #f8fafc;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 16px;
  text-decoration: none;
  color: #1a202c;
  font-weight: 500;
  transition: background 0.2s, box-shadow 0.2s;
}

.more-apis-card__button:hover {
  background: #e6e6e6;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
</style>
