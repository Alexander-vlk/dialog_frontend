<script setup lang="ts">
import type {MealData} from "@/apps/data_tracking/types.ts"
import {averageMealMock} from "@/apps/data_tracking/mocks/meal.ts"
import {ref, computed, type Ref} from "vue"
import {USE_MOCKS} from "@/common/constants.ts"
import {Pie} from "vue-chartjs"
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement, type ChartOptions,
} from "chart.js"

ChartJS.register(Tooltip, Legend, ArcElement)

const averageMeal: Ref<MealData> = ref(getAverageMeal())

function getAverageMeal(): MealData {
    if (USE_MOCKS) {
        return averageMealMock
    }
    return averageMealMock
}

const colors: Record<string, string> = {
    blue: '#3b82f6',
    red: '#ef4444',
    green: '#22c55e',
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
</script>

<template>
    <div
        class="w-full max-w-xl items-center mx-auto p-4 flex gap-2 border border-blue-400 rounded-xl border-2">
        <div class="h-24">
            <Pie class="max-w-[150px]" :data="mealChartData" :options="mealChartOptions"/>
        </div>

        <div class="flex flex-col gap-1 text-sm w-full max-w-[200px]">
            <div class="flex justify-between" :style="{color: colors.blue}">
                <span>Белки:</span>
                <span>{{ averageMeal.proteins }} г</span>
            </div>
            <div class="flex justify-between" :style="{color: colors.red}">
                <span>Жиры:</span>
                <span>{{ averageMeal.fats }} г</span>
            </div>
            <div class="flex justify-between" :style="{color: colors.green}">
                <span>Углеводы:</span>
                <span>{{ averageMeal.carbs }} г</span>
            </div>
            <div class="flex justify-between">
                <span>Калории:</span>
                <span>{{ averageMeal.calories }} г</span>
            </div>
        </div>

    </div>
</template>
<style scoped>
</style>
