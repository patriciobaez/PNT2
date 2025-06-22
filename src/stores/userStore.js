import { defineStore } from 'pinia'
import { ref } from 'vue'
import { MOCKAPI_BASE_URL } from '../data/mockapi'

export const useUserStore = defineStore('user', () => {
  const allUsers = ref([])

  async function fetchUsers() {
    try {
      const res = await fetch(`${MOCKAPI_BASE_URL}`)
      allUsers.value = (await res.json()) || []
    } catch (error) {
      console.error('Error al cargar usuarios:', error)
      allUsers.value = []
    }
  }

  function addFavorite(userId, apiId) {
    const user = allUsers.value.find(u => u.id === userId)
    if (!user) return
    if (!Array.isArray(user.favorites)) user.favorites = []

    if (!user.favorites.some(fav => fav.apiId === apiId)) {
      user.favorites.push({
        apiId,
        date: new Date().toISOString()
      })
    }
  }

  function removeFavorite(userId, apiId) {
    const user = allUsers.value.find(u => u.id === userId)
    if (!user) return
    if (!Array.isArray(user.favorites)) return

    user.favorites = user.favorites.filter(fav => fav.apiId !== apiId)
  }

  function getUsuariosFiltrados(dias) {
    const hoy = new Date()

    return allUsers.value.map(user => ({
      ...user,
      favorites: (user.favorites || []).filter(fav => {
        const diff = (hoy - new Date(fav.date)) / (1000 * 60 * 60 * 24)
        return dias ? diff <= dias : true
      })
    }))
  }

  return { allUsers, fetchUsers, addFavorite, getUsuariosFiltrados, removeFavorite }
})
