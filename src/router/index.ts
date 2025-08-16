import { createRouter, createWebHistory } from 'vue-router'

import HomeView from "@/pages/main-page/HomeView.vue";
import authRoutes from '@/router/auth-service/authRoutes.ts'
import cabinetRoutes from '@/router/cabinet/cabinetRoutes.ts'

const routes = [
    {
        path: '/',
        name: 'main',
        component: HomeView,
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/AboutView.vue'),
    },
    {
        path: '/privacy-policy',
        name: 'privacyPolicy',
        component: () => import('@/pages/PrivacyPolicyView.vue'),
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: () => import('@/pages/ContactsView.vue'),
    },
    ...authRoutes,
    ...cabinetRoutes,
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

export default router
