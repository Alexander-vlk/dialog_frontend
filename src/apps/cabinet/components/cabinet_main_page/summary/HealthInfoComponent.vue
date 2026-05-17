<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
    ClipboardDocumentIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
} from '@heroicons/vue/24/outline'

import api from '@/common/axios.ts'

type Trend = 'up' | 'down' | 'stable'

type StatItem = {
    label: string
    value: string
    unit: string
    trend: Trend
}

type NutritionItem = {
    label: string
    value: number | string
}

type AverageValueResponse = {
    average: number | null
}

type PressureAverageResponse = {
    avg_systolic: number | null
    avg_diastolic: number | null
}

type WeightLastResponse = {
    value: number
}

type MedicationTakeLastResponse = {
    dose: number
    medication: number
}

type MealsAverageResponse = {
    average_calories: number | null
    average_proteins: number | null
    average_carbs: number | null
    average_fats: number | null
}

const isLoading = ref(false)

const glucoseAverage = ref<number | null>(null)
const cholesterolAverage = ref<number | null>(null)
const temperatureAverage = ref<number | null>(null)
const hemoglobinAverage = ref<number | null>(null)

const avgSystolic = ref<number | null>(null)
const avgDiastolic = ref<number | null>(null)

const weight = ref<number | null>(null)

const nutritionData = ref<MealsAverageResponse | null>(null)

const lastMedication = ref<MedicationTakeLastResponse | null>(null)

function round(value: number | null, digits = 1): string {
    if (value === null || value === undefined) {
        return '—'
    }

    return Number(value).toFixed(digits)
}

const stats = computed<StatItem[]>(() => [
    {
        label: 'Глюкоза',
        value: round(glucoseAverage.value),
        unit: 'ммоль/л',
        trend: 'down',
    },
    {
        label: 'Давление',
        value:
            avgSystolic.value !== null && avgDiastolic.value !== null
                ? `${Math.round(avgSystolic.value)}/${Math.round(avgDiastolic.value)}`
                : '—',
        unit: '',
        trend: 'stable',
    },
    {
        label: 'Вес',
        value: weight.value !== null ? round(weight.value) : '—',
        unit: 'кг',
        trend: 'up',
    },
    {
        label: 'Температура',
        value: round(temperatureAverage.value),
        unit: '°C',
        trend: 'stable',
    },
    {
        label: 'Холестерин',
        value: round(cholesterolAverage.value),
        unit: 'ммоль/л',
        trend: 'up',
    },
    {
        label: 'Гемоглобин',
        value: hemoglobinAverage.value !== null
            ? Math.round(hemoglobinAverage.value).toString()
            : '—',
        unit: 'г/л',
        trend: 'stable',
    },
])

const nutrition = computed<NutritionItem[]>(() => [
    {
        label: 'Ккал',
        value: nutritionData.value?.average_calories
            ? Math.round(nutritionData.value.average_calories)
            : '—',
    },
    {
        label: 'Б',
        value: nutritionData.value?.average_proteins
            ? Math.round(nutritionData.value.average_proteins)
            : '—',
    },
    {
        label: 'Ж',
        value: nutritionData.value?.average_fats
            ? Math.round(nutritionData.value.average_fats)
            : '—',
    },
    {
        label: 'У',
        value: nutritionData.value?.average_carbs
            ? Math.round(nutritionData.value.average_carbs)
            : '—',
    },
])

function getTrendIcon(trend: Trend) {
    if (trend === 'up') {
        return ArrowTrendingUpIcon
    }

    if (trend === 'down') {
        return ArrowTrendingDownIcon
    }

    return null
}

async function loadData() {
    if (isLoading.value) return

    isLoading.value = true

    try {
        const [
            glucoseResponse,
            pressureResponse,
            weightResponse,
            cholesterolResponse,
            temperatureResponse,
            hemoglobinResponse,
            medicationResponse,
            mealsResponse,
        ] = await Promise.all([
            api.get<AverageValueResponse>('/api/data_tracking/glucose/average/'),
            api.get<PressureAverageResponse>('/api/data_tracking/pressure/average/'),
            api.get<WeightLastResponse>('/api/data_tracking/weight/last/'),
            api.get<AverageValueResponse>('/api/data_tracking/cholesterol/average/'),
            api.get<AverageValueResponse>('/api/data_tracking/temperature/average/'),
            api.get<AverageValueResponse>('/api/data_tracking/hemoglobin/average/'),
            api.get<MedicationTakeLastResponse>('/api/data_tracking/medication_takes/last/'),
            api.get<MealsAverageResponse>('/api/data_tracking/meals/average/'),
        ])

        glucoseAverage.value = glucoseResponse.data.average

        avgSystolic.value = pressureResponse.data.avg_systolic
        avgDiastolic.value = pressureResponse.data.avg_diastolic

        weight.value = weightResponse.data.value

        cholesterolAverage.value = cholesterolResponse.data.average
        temperatureAverage.value = temperatureResponse.data.average
        hemoglobinAverage.value = hemoglobinResponse.data.average

        lastMedication.value = medicationResponse.data

        nutritionData.value = mealsResponse.data
    }
    catch (error) {
        console.error(error)
    }
    finally {
        isLoading.value = false
    }
}

async function copyData() {
    const text = stats.value
        .map((item) => `${item.label}: ${item.value} ${item.unit}`)
        .join('\n')

    await navigator.clipboard.writeText(text)
}

const lastMedicationText = computed(() => {
    if (!lastMedication.value) {
        return 'Нет данных'
    }

    return `${lastMedication.value.medication.name}, ${lastMedication.value.dose} мг`
})

onMounted(() => {
    loadData()
})
</script>

<template>
    <div
        class="
            rounded-2xl
            border border-slate-200
            bg-white
            shadow-sm
            p-5
        "
    >
        <div class="flex items-start justify-between">
            <div>
                <h2 class="text-lg font-semibold text-slate-900">
                    Сводка здоровья
                </h2>

                <p class="text-sm text-slate-500 mt-1">
                    Основные показатели пользователя
                </p>
            </div>

            <button
                @click="copyData"
                class="
                    rounded-lg
                    border border-slate-200
                    p-2
                    hover:bg-slate-50
                    transition
                    hover:cursor-pointer
                "
            >
                <ClipboardDocumentIcon
                    class="w-5 h-5 text-slate-600"
                />
            </button>
        </div>

        <div
            v-if="isLoading"
            class="mt-4 text-sm text-slate-500"
        >
            Загрузка...
        </div>

        <div class="grid grid-cols-4 gap-2 mt-5">
            <div
                v-for="item in nutrition"
                :key="item.label"
                class="
                    rounded-xl
                    bg-slate-50
                    px-3 py-2
                    text-center
                "
            >
                <p class="text-xs text-slate-500">
                    {{ item.label }}
                </p>

                <p class="text-base font-semibold text-slate-900 mt-1">
                    {{ item.value }}
                </p>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-x-4 gap-y-3 mt-5">
            <div
                v-for="item in stats"
                :key="item.label"
                class="
                    flex items-center justify-between
                    rounded-xl
                    border border-slate-100
                    px-3 py-2.5
                "
            >
                <div>
                    <p class="text-sm text-slate-500">
                        {{ item.label }}
                    </p>

                    <div class="flex items-center gap-1 mt-0.5">
                        <span class="font-semibold text-slate-900">
                            {{ item.value }}
                        </span>

                        <span class="text-xs text-slate-400">
                            {{ item.unit }}
                        </span>
                    </div>
                </div>

                <component
                    :is="getTrendIcon(item.trend)"
                    v-if="getTrendIcon(item.trend)"
                    class="
                        w-4 h-4
                        text-slate-400
                    "
                />
            </div>
        </div>

        <div
            class="
                mt-5
                flex items-center justify-between
                rounded-xl
                bg-slate-50
                px-4 py-3
            "
        >
            <div>
                <p class="text-sm font-medium text-slate-800">
                    Последний препарат
                </p>

                <p class="text-xs text-slate-500 mt-0.5">
                    {{ lastMedicationText }}
                </p>
            </div>
        </div>
    </div>
</template>
