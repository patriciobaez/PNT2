<template>
  <div class="perfil-view" v-if="userSession">
    <h1>Perfil</h1>
    <div class="perfil-info">
      <div><strong>Sesión actual:</strong> {{ userSession }}</div>
    </div>
    <button @click="goToFavoritos">Ver mis favoritos</button>
    <button @click="cerrarSesion">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const userSession = ref(null)
const router = useRouter()

onMounted(() => {
  const email = sessionStorage.getItem('userSession')
  if (!email) {
    router.replace('/login')
  } else {
    userSession.value = email
  }
})

function goToFavoritos() {
  router.push('/favoritos')
}
function cerrarSesion() {
  sessionStorage.removeItem('userEmail')
  sessionStorage.removeItem('userId')
  router.push('/login')
}
</script>

<style scoped>
.perfil-view {
  max-width: 400px;
  margin: 40px auto;
  padding: 32px;
  background: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 2px 12px #0001;
  text-align: center;
}

.perfil-info {
  margin-bottom: 24px;
}

button {
  margin: 8px;
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  background: #bdbdbd;
  color: #222;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background: #a0a0a0;
}
</style>
