<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue'
import { Pie } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement,
    type ChartOptions,
} from 'chart.js'

import api from '@/common/axios.ts'

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement,
)

type AverageMealResponse = {
    average_calories: number | null
    average_proteins: number | null
    average_carbs: number | null
    average_fats: number | null
}

type MealData = {
    calories: number
    proteins: number
    carbs: number
    fats: number
}

const isLoading = ref(false)
const loadError = ref('')

const averageMeal: Ref<MealData> = ref({
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
})

const colors: Record<string, string> = {
    blue: '#3b82f6',
    red: '#ef4444',
    green: '#22c55e',
}

async function loadAverageMeal() {
    if (isLoading.value) return

    isLoading.value = true
    loadError.value = ''

    try {
        const response = await api.get<AverageMealResponse>(
            '/api/data_tracking/meals/average/'
        )

        const data = response.data

        averageMeal.value = {
            calories: Math.round(data.average_calories || 0),
            proteins: Math.round(data.average_proteins || 0),
            carbs: Math.round(data.average_carbs || 0),
            fats: Math.round(data.average_fats || 0),
        }
    }
    catch (error) {
        console.error(error)
        loadError.value = 'Не удалось загрузить данные о питании'
    }
    finally {
        isLoading.value = false
    }
}

const mealChartData = computed(() => ({
    labels: ['Белки', 'Жиры', 'Углеводы'],
    datasets: [
        {
            data: [
                averageMeal.value.proteins,
                averageMeal.value.fats,
                averageMeal.value.carbs,
            ],
            backgroundColor: [
                colors.blue,
                colors.red,
                colors.green,
            ],
            borderWidth: 0,
        },
    ],
}))

const mealChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
    },
}

onMounted(() => {
    loadAverageMeal()
})
</script>

<template>
    <div
        class="
            w-full
            max-w-xl
            items-center
            mx-auto
            p-4
            flex
            gap-2
            border
            border-blue-400
            rounded-xl
            border-2
        "
    >
        <div
            v-if="isLoading"
            class="text-sm text-slate-500"
        >
            Загрузка...
        </div>

        <div
            v-else-if="loadError"
            class="text-sm text-red-500"
        >
            {{ loadError }}
        </div>

        <template v-else>
            <div class="h-24">
                <Pie
                    class="max-w-[150px]"
                    :data="mealChartData"
                    :options="mealChartOptions"
                />
            </div>

            <div class="flex flex-col gap-1 text-sm w-full max-w-[200px]">
                <div
                    class="flex justify-between"
                    :style="{ color: colors.blue }"
                >
                    <span>Белки:</span>
                    <span>{{ averageMeal.proteins }} г</span>
                </div>

                <div
                    class="flex justify-between"
                    :style="{ color: colors.red }"
                >
                    <span>Жиры:</span>
                    <span>{{ averageMeal.fats }} г</span>
                </div>

                <div
                    class="flex justify-between"
                    :style="{ color: colors.green }"
                >
                    <span>Углеводы:</span>
                    <span>{{ averageMeal.carbs }} г</span>
                </div>

                <div class="flex justify-between">
                    <span>Калории:</span>
                    <span>{{ averageMeal.calories }}</span>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
</style>
