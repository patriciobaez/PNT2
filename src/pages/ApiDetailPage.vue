<template>
  <div>
    <div v-if="loading">Cargando detalle…</div>
    <ApiDetail v-else-if="api" :api="api" />
    <div v-else>API no encontrada</div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue'
  import ApiDetail from '../components/ApiDetail.vue'
  const props = defineProps({ id: String })
  const api = ref(null)
  const loading = ref(true)

  onMounted(() => fetchApiDetail(props.id))
  watch(() => props.id, fetchApiDetail)

  async function fetchApiDetail(id) {
    const res = await fetch('/apis.json')
    const apis = await res.json()
    api.value = apis.find(a => a.ID === id)
    if (api.value) document.title = `Detalle – ${api.value.API}`
    loading.value = false
  }

</script>
