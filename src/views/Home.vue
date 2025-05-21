<template>
  <div>
    <h1>Catálogo de APIs</h1>
    <div v-if="loading">Cargando APIs…</div>
    <div v-else>
      <ul>
        <li v-for="api in apis" :key="api.ID">
          <div>
            <div>{{ api.API }}</div>
            <div>{{ api.Description }}</div>
          </div>
          <button @click="goToDetail(api.ID)">          
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

  function goToDetail(apiID) {
    router.push(`/apis/${apiID}`)
  }
</script>
