<template>
  <div>
    <div v-if="loading" class="p-8 text-center">Cargando detalle…</div>
    <ApiDetail v-else-if="api" :api="api" />
    <div v-else class="p-8 text-center text-red-500">API no encontrada</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import ApiDetail from '../components/ApiDetail.vue'
const props = defineProps({ id: String })
const api = ref(null)
const loading = ref(true)

async function fetchApiDetail(id) {
  loading.value = true
  const res = await fetch('/apis.json')
  const apis = await res.json()
  api.value = apis.find(a => a.API.replace(/\s+/g, '-').toLowerCase() === id)
  if (api.value) document.title = `Detalle – ${api.value.API}`
  loading.value = false
}

onMounted(() => fetchApiDetail(props.id))
watch(() => props.id, fetchApiDetail)
</script>