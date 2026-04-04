import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/common/pages/Home.vue'
import { authServiceRoutes } from '@/apps/auth_service/route.ts'
import {cabinetRoutes} from "@/apps/cabinet/route.ts";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    ...authServiceRoutes,
    ...cabinetRoutes,
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/common/pages/NotFound.vue'),
    },
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

export default router
