import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
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
            path: '/apis/:id',
            name: 'api-detail',
            component: ApiDetailPage,
            props: true
}
    ],
});

export default router