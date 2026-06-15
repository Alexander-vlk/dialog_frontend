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
    Legend,
} from 'chart.js'

import api from '@/common/axios.ts'

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
)

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
    carbs: number
}

const records = ref<RecordItem[]>([])
const isLoading = ref(false)
const error = ref('')

function formatTime(dateStr: string) {
    const date = new Date(dateStr)
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
}

function normalizeTime(dateStr: string) {
    return new Date(dateStr).getTime()
}

function getLastWeekParams() {
    const dateEnd = new Date()
    const dateStart = new Date()

    dateStart.setDate(dateStart.getDate() - 7)

    return {
        date_start: dateStart.toISOString().split('T')[0],
        date_end: dateEnd.toISOString().split('T')[0],
    }
}

async function loadAllPages<T>(url: string): Promise<T[]> {
    const all: T[] = []
    let next: string | null = url

    const params = getLastWeekParams()

    while (next) {
        const response = await api.get<Paginated<T> | T[]>(next, {
            params: next === url ? params : undefined,
        })

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
        const meals = await loadAllPages<Meal>(
            '/api/data_tracking/meals/',
        )

        const carbsMap = new Map<number, number>()

        for (const meal of meals) {
            const time = normalizeTime(meal.eaten_at)

            carbsMap.set(
                time,
                (carbsMap.get(time) || 0) + meal.carbs,
            )
        }

        const sortedTimes = Array.from(carbsMap.keys())
            .sort((a, b) => a - b)

        records.value = sortedTimes.map(time => ({
            time: new Date(time).toISOString(),
            carbs: carbsMap.get(time) || 0,
        }))
    } catch {
        error.value = 'Ошибка загрузки данных'
    } finally {
        isLoading.value = false
    }
}

const chartData = computed<ChartData<'line'>>(() => ({
    labels: records.value.map(r => formatTime(r.time)),
    datasets: [
        {
            label: 'Углеводы (г)',
            data: records.value.map(r => r.carbs),
            borderColor: '#f59e0b',
            backgroundColor: '#f59e0b',
            tension: 0.35,
            pointRadius: 3,
        },
    ],
}))

const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        legend: {
            display: true,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Углеводы (г)',
            },
        },
    },
}

onMounted(() => {
    loadData()
})
</script>

<template>
    <div class="w-full max-w-md mx-auto p-4 flex flex-col gap-4 rounded-xl">
        <h3 class="font-semibold text-lg">
            Углеводы за последнюю неделю
        </h3>

        <div v-if="error" class="text-red-500 text-sm">
            {{ error }}
        </div>

        <div v-if="isLoading" class="text-sm text-gray-500">
            Загрузка...
        </div>

        <div v-if="records.length" class="w-full h-64">
            <Line :data="chartData" :options="chartOptions" />
        </div>

        <div v-else-if="!isLoading" class="text-sm text-gray-500">
            Нет данных за последнюю неделю
        </div>
    </div>
</template>

<style scoped>
</style>
