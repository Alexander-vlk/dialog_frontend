<script setup lang="ts">
import { ref, onMounted } from "vue";

import api from '@/plugins/axios/axios.ts'
import type {Advantage} from "@/types/mainPageTypes.ts";

const advantages = ref<Array<Advantage>>([])

onMounted(async () => {
    try {
        const response = await api.get('sitesettings/advantages')
        advantages.value = response.data
    }
    catch (error) {
        console.error('Ошибка при получении данных', error)
    }
})
</script>

<template>
    <h3 class="text-3xl font-bold text-center">Преимущества</h3>
    <div class="grid grid-cols-4 gap-4 my-5">
        <div
            v-for="(advantage, index) in advantages"
            :key="index"
            :class="[
                'bg-white p-4 rounded-xl shadow transition-all col-span-4',
                'col-span-2',
                index % 2 ? 'md:col-start-2 md:col-span-3' : 'md:col-start-1 md:col-span-3'
            ]"
        >
            <h4 class="text-xl font-semibold text-blue-500 mb-2">{{ advantage.title }}</h4>
            <p class="text-gray-600">{{ advantage.description }}</p>
        </div>
    </div>
</template>

<style scoped>

</style>
