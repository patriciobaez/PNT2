<template>
  <div class="login-container">
    <div class="login-left">
      <div class="welcome-content">
        <div class="logo">✳</div>
        <h1>Bienvenido a <span class="highlight">grAPIs</span></h1>
        <p>
          Buscar una API ya no es un reto.<br />
          Encuentra en un solo lugar las herramientas que harán realidad tus ideas.
        </p>
        <p class="bottom-text">
          Porque cada gran desarrollo<br />
          comienza con una buena conexión.
        </p>
      </div>
    </div>

    <div class="login-right">
      <h2 class="title">grAPIs</h2>
      <form @submit.prevent="login" class="form">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <p v-if="error" class="error">Email o contraseña incorrectos.</p>
        <button type="submit">Iniciar Sesion</button>
      </form>
    </div>
  </div>
</template>

<script>
import UserData from "/src/data/usersData.js";
// Importa los datos del usuario desde el archivo usersData.js
const userService = new UserData();

export default {
  data: () => ({
    email: "",
    password: "",
    error: false,
  }),
  async created() {
    // Carga los datos de los usuarios al iniciar el componente
    await userService.cargarDatos();
  },
  methods: {
    login() {
      //Compara con los usuarios que se cargan al instanciaar el "UserData"
      // y si el usuario existe, redirige a la página principal (a modificar más adelante con las diferentes rutas dependiendo del rol)
      const user = userService.validacionUsuario(this.email, this.password);

      if (user) {
        this.error = false;
        this.$router.push("/");
      } else {
        this.error = true;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.login-left {
  flex: 1;
  background-color: #f26c21;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.welcome-content {
  max-width: 300px;
  text-align: left;
}

.logo {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.highlight {
  color: white;
  font-weight: bold;
}

.bottom-text {
  margin-top: 2rem;
  font-size: 0.9rem;
}

.login-right {
  flex: 1;
  background-color: #f9fcff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 300px;
}

input {
  margin-bottom: 1rem;
  padding: 0.7rem;
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: #f1f1f1;
}

input:focus {
  outline: none;
  border-color: #888;
}

button {
  padding: 0.7rem;
  border: 2px solid black;
  background: white;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

button:hover {
  background: #ddd;
}

.error {
  color: red;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}
</style>
