<script setup lang="ts">
import { ref } from 'vue'

import ToDo from '@/components/dev/ToDo.vue'
import type { AverageBJU } from '@/types/DataTrackingTypes.ts'
import api from '@/services/axios.ts'


const averageBJU = ref<AverageBJU>({
    proteins: 0,
    fats: 0,
    carbs: 0,
})

async function getBJUData(): AverageBJU {
    const response = api.get('data-tracking/bju/average/')
    averageBJU.value = response.data
}
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
