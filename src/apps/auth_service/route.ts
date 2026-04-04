export const authServiceRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/apps/auth_service/pages/LoginView.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/apps/auth_service/pages/RegisterView.vue'),
    },
        {
        path: '/password/change',
        name: 'change_password',
        component: () => import('@/apps/auth_service/pages/ChangePasswordView.vue'),
    },
] as const
