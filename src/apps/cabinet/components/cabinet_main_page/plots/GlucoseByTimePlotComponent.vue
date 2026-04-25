<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { Line } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'

import { glucoseRecordsMock } from '@/apps/data_tracking/mocks/glucose.ts'
import { USE_MOCKS } from '@/common/constants.ts'
import type { GlucoseData } from '@/apps/data_tracking/types.ts'

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    Filler
)

const glucoseData: Ref<Array<GlucoseData>> = ref(getGlucoseData())

const sortedRecords = computed(() =>
    [...glucoseData.value]
        .sort((a, b) => new Date(a.measured_at).getTime() - new Date(b.measured_at).getTime())
)

function formatTime(dateStr: string) {
    const date = new Date(dateStr)
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
}

const MIN_TARGET = 4
const MAX_TARGET = 10

const chartData = computed<ChartData<'line'>>(() => ({
    labels: sortedRecords.value.map(r => formatTime(r.measured_at)),
    datasets: [
        {
            label: 'Min',
            data: sortedRecords.value.map(() => MIN_TARGET),
            borderWidth: 0,
            pointRadius: 0
        },
        {
            label: 'Целевой диапазон',
            data: sortedRecords.value.map(() => MAX_TARGET),
            borderWidth: 0,
            pointRadius: 0,
            backgroundColor: 'rgba(34,197,94,0.15)',
            fill: '-1' // заливка между min и max
        },
        {
            label: 'Глюкоза',
            data: sortedRecords.value.map(r => r.value),
            borderColor: '#3b82f6',
            backgroundColor: '#3b82f6',
            tension: 0.35,
            pointRadius: 3
        }
    ]
}))

const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                label: (ctx) => ` ${ctx.raw} ммоль/л`
            }
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            beginAtZero: false,
            ticks: {
                callback: (value) => `${value}`
            }
        }
    }
}

function getGlucoseData() {
    if (USE_MOCKS) {
        return glucoseRecordsMock
    }
    // TODO: API
    return glucoseRecordsMock
}
</script>

<template>
    <div
        class="w-full max-w-md mx-auto p-4 flex flex-col gap-4 rounded-xl"
    >
        <h3 class="font-semibold text-lg">
            Глюкоза во времени
        </h3>
        <div class="w-full h-64">
            <Line :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<style scoped>
</style>
