export const dataTrackingRoutes = [
    {
        path: '/reports/',
        name: 'reports',
        component: () => import('@/apps/data_tracking/pages/ReportView.vue'),
    },
    {
        path: '/indicators/',
        name: 'indicators',
        component: () => import('@/apps/data_tracking/pages/AllIndicatorsView.vue'),
    },
] as const
