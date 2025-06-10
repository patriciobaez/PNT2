import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Perfil from '../views/Perfil.vue'
import Favoritos from '../views/Favoritos.vue'
import ApiDetailPage from '../pages/ApiDetailPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/perfil",
            name: "perfil",
            component: Perfil,
        },
        {
            path: "/favoritos",
            name: "favoritos",
            component: Favoritos,
        },
        {
            path: '/apis/:id',
            name: 'api-detail',
            component: ApiDetailPage,
            props: true
        }
    ],
});

export default router
