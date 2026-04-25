<script setup lang="ts">
import {computed, ref, type Ref} from 'vue'
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

import {glucoseRecordsMock} from '@/apps/data_tracking/mocks/glucose.ts'
import {USE_MOCKS} from "@/common/constants.ts"
import type {GlucoseData} from "@/apps/data_tracking/types.ts"

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
)

const glucoseData: Ref<Array<GlucoseData>> = ref(getGlucoseData())

const groupedByDays = computed(() => {
    const map: Record<string, number[]> = {}

    glucoseData.value.forEach(r => {
        const date = new Date(r.measured_at)
        const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

        if (!map[key]) {
            map[key] = []
        }
        map[key].push(r.value)
    })

    return map
})

const averageByDays = computed(() => {
    return Object.entries(groupedByDays.value)
        .map(([date, values]) => ({
            date,
            avg: values.reduce((a, b) => a + b, 0) / values.length
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    return `${d.getDate()}.${d.getMonth() + 1}`
}

const chartData = computed<ChartData<'line'>>(() => ({
    labels: averageByDays.value.map(d => formatDate(d.date)),
    datasets: [
        {
            label: 'Средняя глюкоза',
            data: averageByDays.value.map(d => +d.avg.toFixed(1)),
            borderColor: '#10b981',
            backgroundColor: '#10b981',
            tension: 0.35,
            pointRadius: 4
        }
    ]
}))

const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
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
            beginAtZero: false
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
            Средняя глюкоза по дням
        </h3>

        <div class="w-full h-64">
            <Line :data="chartData" :options="chartOptions"/>
        </div>
    </div>
</template>

<style scoped>
</style>
