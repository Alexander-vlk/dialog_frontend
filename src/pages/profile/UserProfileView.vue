<script setup lang="ts">
import { userAuthStore } from '@/stores/user.ts'
import router from '@/router'

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
            class="col-span-2 bg-white rounded-xl shadow p-4 my-2 md:my-0 min-h-[30lvh]"
        >
            <h2>Данные профиля</h2>
        </div>
        <div
            class="md:col-span-2 bg-white rounded-xl shadow p-4 my-2 md:my-0 min-h-[30lvh]"
        >
            <h2>Сводка</h2>
        </div>
        <div
            class="md:col-span-1 bg-white rounded-xl shadow p-4 my-2 md:my-0 min-h-[30lvh]"
        >
            <h2>Блок модальных окон</h2>
        </div>
        <div
            class="md:col-span-4 bg-white rounded-xl shadow p-4 my-2 md:my-0 min-h-[40lvh]"
        >
            <h2>Дневной отчет</h2>
        </div>
        <div
            class="md:col-span-1 bg-white rounded-xl shadow p-4 my-2 md:my-0 min-h-[40lvh]"
        >
            <h2>Ссылки</h2>
        </div>
        <div
            class="md:col-span-5 bg-white rounded-xl shadow p-4 my-2 md:my-0 min-h-[40lvh]"
        >
            <h2>Недельный отчет</h2>
        </div>
        <div
            class="md:col-span-2 bg-white rounded-xl shadow p-4 my-2 md:my-0 min-h-[10lvh]"
        >
            <h2>Еще ссыылки куда-нибудь там</h2>
        </div>
        <div
            class="md:col-span-3 bg-white rounded-xl shadow p-4 my-2 md:my-0 min-h-[10lvh]"
        >
            <h2>Блок призыва к действию или чето такое</h2>
        </div>
    </div>
</template>

<style scoped>

</style>
