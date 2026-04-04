export const cabinetRoutes = [
    {
        path: '/cabinet',
        name: 'cabinet',
        component: () => import('@/apps/cabinet/pages/CabinetMainPageView.vue'),
    },
] as const
