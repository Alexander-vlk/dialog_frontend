<script setup lang="ts">
import {computed, ref} from 'vue'
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

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
)

type RecordItem = {
    time: string
    insulin: number
    carbs: number
}

const records = ref<RecordItem[]>(generateMock())

function generateMock(): RecordItem[] {
    const now = new Date()
    const data: RecordItem[] = []

    for (let i = 0; i < 20; i++) {
        const d = new Date(now.getTime() - (19 - i) * 60 * 60 * 1000)

        data.push({
            time: d.toISOString(),
            insulin: Math.random() > 0.6 ? +(Math.random() * 6).toFixed(1) : 0,
            carbs: Math.random() > 0.5 ? Math.floor(Math.random() * 80) : 0
        })
    }

    return data
}

function formatTime(dateStr: string) {
    const date = new Date(dateStr)
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
}

const chartData = computed<ChartData<'line'>>(() => ({
    labels: records.value.map(r => formatTime(r.time)),
    datasets: [
        {
            label: 'Инсулин (ЕД)',
            data: records.value.map(r => r.insulin),
            borderColor: '#8b5cf6',
            backgroundColor: '#8b5cf6',
            tension: 0.35,
            pointRadius: 3,
            yAxisID: 'y'
        },
        {
            label: 'Углеводы (г)',
            data: records.value.map(r => r.carbs),
            borderColor: '#f59e0b',
            backgroundColor: '#f59e0b',
            tension: 0.35,
            pointRadius: 3,
            yAxisID: 'y1'
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
            display: true
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            type: 'linear',
            position: 'left',
            title: {
                display: true,
                text: 'Инсулин'
            },
            beginAtZero: true
        },
        y1: {
            type: 'linear',
            position: 'right',
            title: {
                display: true,
                text: 'Углеводы'
            },
            beginAtZero: true,
            grid: {
                drawOnChartArea: false
            }
        }
    }
}
</script>

<template>
    <div
        class="w-full max-w-md mx-auto p-4 flex flex-col gap-4 rounded-xl"
    >
        <h3 class="font-semibold text-lg">
            Инсулин и углеводы во времени
        </h3>

        <div class="w-full h-64">
            <Line :data="chartData" :options="chartOptions"/>
        </div>
    </div>
</template>

<style scoped>
</style>
