<script setup lang="ts">
import type { AverageBJU } from '@/types/DataTrackingTypes.ts'
import api from '@/services/axios.ts'
import { onBeforeMount, ref } from 'vue'


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

</template>

<style scoped>

</style>
