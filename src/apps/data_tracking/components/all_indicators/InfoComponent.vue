<script setup lang="ts">
import router from '@/router.ts'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

function goBack() {
    router.back()
}
</script>

<template>
    <div
        class="
            bg-white
            mx-4
            mt-4
            px-4
            py-4
            rounded-xl
            shadow-sm
            max-w-[1600px]
            flex
            flex-col
            gap-6
        "
    >
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-2xl font-bold text-slate-900">
                Все показатели
            </h2>

            <button
                type="button"
                @click="goBack"
                class="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-lg
                    border
                    border-slate-200
                    text-slate-700
                    hover:bg-slate-50
                    transition
                    cursor-pointer
                "
            >
                <ArrowLeftIcon class="w-5 h-5" />
                <span>Назад</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
</style>
