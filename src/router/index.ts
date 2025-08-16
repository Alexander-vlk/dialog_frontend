import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/pages/main-page/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: HomeView,
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import("@/pages/profile/UserProfileView.vue"),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/auth-service/LoginView.vue'),
        },
    ],
})

export default router
