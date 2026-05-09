<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
} from 'chart.js'
import api from '@/common/axios.ts'

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
)

type MedicationTake = {
    id: number
    medication: number
    taken_at: string
    dose: number
}

type Meal = {
    id: number
    carbs: number
    eaten_at: string
}

type Paginated<T> = {
    count: number
    next: string | null
    previous: string | null
    results: T[]
}

type RecordItem = {
    time: string
    insulin: number
    carbs: number
}

/**
 * ===== STATE =====
 */

const records = ref<RecordItem[]>([])
const isLoading = ref(false)
const error = ref('')

/**
 * ===== HELPERS =====
 */

function formatTime(dateStr: string) {
    const date = new Date(dateStr)
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
}

function normalizeTime(dateStr: string) {
    return new Date(dateStr).getTime()
}

async function loadAllPages<T>(url: string): Promise<T[]> {
    const all: T[] = []
    let next: string | null = url

    while (next) {
        const response = await api.get<Paginated<T> | T[]>(next)
        const data = response.data

        if (Array.isArray(data)) {
            all.push(...data)
            break
        }

        all.push(...data.results)
        next = data.next
    }

    return all
}

async function loadData() {
    if (isLoading.value) return

    isLoading.value = true
    error.value = ''

    try {
        const [medications, meals] = await Promise.all([
            loadAllPages<MedicationTake>('/api/data_tracking/medication_takes/'),
            loadAllPages<Meal>('/api/data_tracking/meals/')
        ])

        const insulinMap = new Map<number, number>()
        const carbsMap = new Map<number, number>()

        for (const m of medications) {
            const t = normalizeTime(m.taken_at)
            insulinMap.set(t, (insulinMap.get(t) || 0) + m.dose)
        }

        for (const meal of meals) {
            const t = normalizeTime(meal.eaten_at)
            carbsMap.set(t, (carbsMap.get(t) || 0) + meal.carbs)
        }

        const allTimes = new Set([
            ...insulinMap.keys(),
            ...carbsMap.keys()
        ])

        const sorted = Array.from(allTimes).sort((a, b) => a - b)

        records.value = sorted.map(t => ({
            time: new Date(t).toISOString(),
            insulin: insulinMap.get(t) || 0,
            carbs: carbsMap.get(t) || 0
        }))
    }
    catch (e) {
        error.value = 'Ошибка загрузки данных'
    }
    finally {
        isLoading.value = false
    }
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

onMounted(() => {
    loadData()
})
</script>

<template>
    <div class="w-full max-w-md mx-auto p-4 flex flex-col gap-4 rounded-xl">
        <h3 class="font-semibold text-lg">
            Инсулин и углеводы во времени
        </h3>

        <div v-if="error" class="text-red-500 text-sm">
            {{ error }}
        </div>

        <div v-if="isLoading" class="text-sm text-gray-500">
            Загрузка...
        </div>

        <div class="w-full h-64" v-if="records.length">
            <Line :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<style scoped>
</style>
