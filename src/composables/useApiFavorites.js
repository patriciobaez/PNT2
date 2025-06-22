import { ref, computed, onMounted, watchEffect } from 'vue'
import { useUserStore } from '../stores/userStore'

export function useApiFavorites(rangoDiasRef) {
  const allApis = ref([])
  const userStore = useUserStore()

  async function fetchApis() {
    const res = await fetch('/apis.json')
    allApis.value = (await res.json()) || []
  }

  onMounted(async () => {
    await fetchApis()
    await userStore.fetchUsers()
  })

  const usuariosFiltrados = computed(() => {
    const dias = rangoDiasRef.value
    const hoy = new Date()

    return userStore.getUsuariosFiltrados(dias)
  })

  const apiFavorites = ref([])

  watchEffect(() => {
    const favCount = {}
    const validApiIds = new Set(allApis.value.map(api => String(api.ID)))

    usuariosFiltrados.value.forEach(user => {
      user.favorites.forEach(fav => {
        const id = String(fav.apiId)
        if (validApiIds.has(id)) {
          favCount[id] = (favCount[id] || 0) + 1
        }
      })
    })

    apiFavorites.value = Object.entries(favCount)
      .map(([apiId, count]) => {
        const api = allApis.value.find(a => String(a.ID) === apiId)
        return { ID: api.ID, API: api.API, Description: api.Description, favCount: count }
      })
      .sort((a, b) => b.favCount - a.favCount)
  })

  const chartData = computed(() => ({
    labels: apiFavorites.value.map(a => a.API),
    datasets: [
      {
        label: 'Guardados',
        data: apiFavorites.value.map(a => a.favCount),
        backgroundColor: '#4CAF50'
      }
    ]
  }))

  return { apiFavorites, chartData }
}