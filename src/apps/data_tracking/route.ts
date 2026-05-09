export const dataTrackingRoutes = [
    {
        path: '/reports/',
        name: 'reports',
        component: () => import('@/apps/data_tracking/pages/ReportView.vue'),
    },
] as const
