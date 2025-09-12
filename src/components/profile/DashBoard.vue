<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

import ToDo from '@/components/dev/ToDo.vue'
import type { AverageBJU } from '@/types/DataTrackingTypes.ts'
import api from '@/services/axios.ts'


const averageBJU = ref<AverageBJU>({
    proteins: 0,
    fats: 0,
    carbs: 0,
})

async function getBJUData(): Promise<AverageBJU> {
    const response = await api.get<AverageBJU>('/data-tracking/bju/average/')
    return response.data
}

onBeforeMount(async () => {
    averageBJU.value = await getBJUData()
})
</script>

<template>
    <h2
        class="text-xl font-bold"
    >
        Сводка <ToDo todoText="Доделать" />
    </h2>
    <div
        class="sm:flex flex-wrap items-center justify-between gap-2"
    >
        <div>
            БЖУ
        </div>
        <div>
            Общие данные
        </div>
        <div>
            Ударный режим
        </div>
    </div>
</template>

<style scoped>

</style>
