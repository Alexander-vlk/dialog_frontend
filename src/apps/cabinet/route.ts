export const cabinetRoutes = [
    {
        path: '/cabinet',
        name: 'cabinet',
        component: () => import('@/apps/cabinet/pages/CabinetMainPageView.vue'),
    },
    {
        path: '/cabinet/edit',
        name: 'edit_profile',
        component: () => import('@/apps/cabinet/pages/EditProfileView.vue'),
    }
] as const
