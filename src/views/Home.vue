<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Catálogo de APIs</h1>
    <div v-if="loading" class="text-center">Cargando APIs…</div>
    <div v-else>
      <ul class="space-y-4">
        <li v-for="api in apis" :key="api.API" class="p-4 bg-white rounded shadow flex justify-between items-center">
          <div>
            <div class="font-semibold">{{ api.API }}</div>
            <div class="text-gray-600 text-sm">{{ api.Description }}</div>
          </div>
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            @click="goToDetail(api.API)"
          >
            Ver detalle
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const apis = ref([])
const loading = ref(true)
const router = useRouter()

onMounted(async () => {
  const res = await fetch('/apis.json')
  apis.value = await res.json()
  loading.value = false
})

function goToDetail(apiName) {
  // Convierte el nombre a id (minúsculas, guiones)
  const id = apiName.replace(/\s+/g, '-').toLowerCase()
  router.push(`/apis/${id}`)
}
</script>