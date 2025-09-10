<script setup lang="ts">
import { userAuthStore } from '@/stores/user.ts'
import router from '@/router'
import ProfileData from '@/components/profile/ProfileData.vue'
import DashBoard from '@/components/profile/DashBoard.vue'
import ModalForms from '@/components/profile/ModalForms.vue'
import DailyLog from '@/components/profile/DailyLog.vue'
import ReportLinks from '@/components/profile/ReportLinks.vue'
import WeeklyLog from '@/components/profile/WeeklyLog.vue'
import AnotherAppsLinks from '@/components/profile/AnotherAppsLinks.vue'
import HeroActionBlock from '@/components/profile/HeroActionBlock.vue'

const authStore = userAuthStore()

if (!authStore.isAuthenticated) {
    router.push({ name: 'notFound' })
}

document.title = "Личный кабиет";
</script>

<template>
    <div
        class="md:grid grid-cols-5 md:gap-3 m-5"
    >
        <div
            class="col-span-1 bg-white rounded-xl shadow p-4 my-2 md:my-0 min-h-[30lvh]"
        >
            <ProfileData />
        </div>
        <div
            class="md:col-span-3 bg-white rounded-xl shadow p-4 my-2 md:my-0 min-h-[30lvh]"
        >
            <DashBoard />
        </div>
        <div
            class="md:col-span-1 bg-white rounded-xl shadow p-4 my-2 md:my-0 min-h-[30lvh]"
        >
            <ModalForms />
        </div>
        <div
            class="md:col-span-4 bg-white rounded-xl shadow p-4 my-2 md:my-0 min-h-[40lvh]"
        >
            <DailyLog />
        </div>
        <div
            class="md:col-span-1 bg-white rounded-xl shadow p-4 my-2 md:my-0 min-h-[40lvh]"
        >
            <ReportLinks />
        </div>
        <div
            class="md:col-span-5 bg-white rounded-xl shadow p-4 my-2 md:my-0 min-h-[40lvh]"
        >
            <WeeklyLog />
        </div>
        <div
            class="md:col-span-2 bg-white rounded-xl shadow p-4 my-2 md:my-0 min-h-[10lvh]"
        >
            <AnotherAppsLinks />
        </div>
        <div
            class="md:col-span-3 bg-white rounded-xl shadow p-4 my-2 md:my-0 min-h-[10lvh]"
        >
            <HeroActionBlock />
        </div>
    </div>
</template>

<style scoped>

</style>
