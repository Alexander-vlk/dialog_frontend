export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/auth-service/LoginView.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/auth-service/RegisterView.vue'),
    }
]
