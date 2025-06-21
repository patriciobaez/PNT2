<template>
  <div>
    <div v-if="loading" class="loading-detail">
      Cargando detalle…
    </div>

    <div v-else-if="api" class="api-detail-layout">
      <div class="api-detail-main">
        <ApiDetail :api="api" />
      </div>
      <div class="api-detail-sidebar">
        <MoreApis :category="api.Category" :current-id="api.ID" />
      </div>
    </div>

    <div v-else class="loading-detail">
      API no encontrada
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ApiDetail from '../components/ApiDetail.vue'
import MoreApis from '../components/MoreApis.vue'

const props = defineProps({ id: String })
const route = useRoute()

const api = ref(null)
const loading = ref(true)

async function fetchApiDetail(id) {
  loading.value = true
  const res = await fetch('/apis.json')
  const apis = await res.json()
  api.value = apis.find(a => String(a.ID) === String(id)) || null
  loading.value = false
}

onMounted(() => fetchApiDetail(props.id || route.params.id))

watch(
  () => route.params.id,
  newId => fetchApiDetail(newId)
)
</script>

<style scoped>
.loading-detail {
  padding: 40px;
  font-size: 1.1rem;
  color: #888;
  text-align: center;
}

.api-detail-layout {
  display: flex;
  align-items: flex-start;
  gap: 32px;
  padding-top: 40px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: calc(50vw - 360px);
  box-sizing: border-box;
}

.api-detail-main {
  flex: 0 0 auto;

}

.api-detail-sidebar {
  flex: 0 0 auto;
  max-width: 300px;
}
</style>
