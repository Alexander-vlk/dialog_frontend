<script setup lang="ts">
import { ref, onMounted } from "vue";

import api from '@/services/axios.ts'
import type {Rate} from "@/types/mainPageTypes.ts";

const rates = ref<Array<Rate>>([])

onMounted(async () => {
    try {
        const response = await api.get('sitesettings/rates')
        rates.value = response.data
    }
    catch (error) {
        console.error('Ошибка при получении данных', error)
    }
})
</script>

<template>
    <h3 class="text-3xl font-bold text-center">Что говорят пользователи</h3>
    <div class="sm:grid sm:grid-cols-2 gap-4 my-5">
        <div
            v-for="(rate, index) in rates"
            :key="index"
            class="bg-white p-2 rounded-xl shadow my-4"
        >
            <p class="text-xl mx-2">{{ rate.text }}</p>
            <p class="text-blue-700 font-bold mx-2">{{ rate.user_info }}</p>
        </div>
    </div>
</template>

<style scoped>

</style>
