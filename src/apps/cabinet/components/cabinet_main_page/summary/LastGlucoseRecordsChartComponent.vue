<script setup lang="ts">
import {computed} from 'vue'
import {Line} from 'vue-chartjs'
import type {ChartData, ChartOptions} from 'chart.js'

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
} from 'chart.js'

import {useGlucoseRecords} from '@/apps/data_tracking/composables/useGlucoseRecords.ts'

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
)

const {glucoseData} = useGlucoseRecords()

const lastRecords = computed(() =>
    [...glucoseData.value]
        .sort((a, b) => new Date(a.measured_at).getTime() - new Date(b.measured_at).getTime())
        .slice(-20)
)

function formatTime(dateStr: string) {
    const date = new Date(dateStr)
    return `${date.getDate()}.${date.getMonth() + 1} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
}

const chartData = computed<ChartData<'line'>>(() => ({
    labels: lastRecords.value.map(r => formatTime(r.measured_at)),
    datasets: [
        {
            label: 'Уровень сахара',
            data: lastRecords.value.map(r => r.value),
            borderColor: '#3b82f6',
            backgroundColor: '#3b82f6',
            tension: 0.4,
            pointRadius: 4,
        },
    ],
}))

const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        y: {
            beginAtZero: false
        }
    }
}

</script>

<template>
    <div
        class="w-full h-full max-w-xl items-center mx-auto p-4 flex flex-col gap-4 rounded-xl"
    >
        <h3 class="font-semibold text-lg">Уровень сахара (последние 20 замеров)</h3>

        <div class="w-full h-64">
            <Line :data="chartData" :options="chartOptions"/>
        </div>
    </div>
</template>

<style scoped>
</style>
