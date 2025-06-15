import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/main-page/HomeView.vue";

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
            component: () => import("@/views/profile/UserProfileView.vue"),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/auth-service/LoginView.vue'),
        },
    ],
})

export default router
