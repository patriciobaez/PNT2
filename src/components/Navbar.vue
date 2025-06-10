<template>
  <nav class="navbar">
    <div class="navbar-logo" @click="goHome" style="cursor:pointer">
      <img src="../assets/logo.png" alt="Logo" class="logo-img" />
    </div>
    <ul class="navbar-list">
      <li>
        <button class="navbar-btn" title="Buscar">
          <span class="icon">🔍</span>
        </button>
      </li>
      <li>
        <RouterLink to="/" class="navbar-btn" title="Inicio">
          <span class="icon">🏠</span>
        </RouterLink>
      </li>
      <li>
        <button class="navbar-btn" title="Favoritos">
          <span class="icon">⭐</span>
        </button>
      </li>
      <li>
        <RouterLink to="/login" class="navbar-btn" title="Login">
          <span class="icon">👤</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()
function goHome() {
  router.push('/')
}
</script>

<style scoped>
.navbar {
  position: fixed;
  left: 0;
  top: 0;
  width: 64px;
  height: 100vh;
  background: linear-gradient(180deg, #ececec 0%, #d3d3d3 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  box-shadow: 2px 0 12px 0 rgba(60,60,60,0.07);
  z-index: 100;
}

.navbar-logo {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.logo-img {
  width: 36px;
  height: 36px;
  object-fit: contain;
  display: block;
}

.navbar-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  align-items: center;
}

.navbar-btn {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.18s;
  font-size: 1.3rem;
  color: #444;
  text-decoration: none;
}

.navbar-btn:hover,
.router-link-exact-active {
  background: #bdbdbd;
  color: #222;
}

.icon {
  font-size: 1.3rem;
}
</style>