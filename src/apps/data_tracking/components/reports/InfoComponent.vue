<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

import api from '@/common/axios.ts'
import { useReport } from '@/apps/data_tracking/composables/useReport.ts'

type AvailableIndicatorsResponse = {
    available_indicators: string[]
}

const router = useRouter()

const isLoading = ref(false)
const loadError = ref('')
const submitError = ref('')

const indicators = ref<string[]>([])
const selectedIndicators = ref<string[]>([])

const dateStart = ref('')
const dateEnd = ref('')

const indicatorLabels: Record<string, string> = {
    temperature: 'Температура',
    pressure: 'Давление',
    glucose: 'Глюкоза',
    hemoglobin: 'Гемоглобин',
    cholesterol: 'Холестерин',
    lipid_profile: 'Липидный профиль',
    microalbuminuria: 'Микроальбуминурия',
    weight: 'Вес',
    ketones: 'Кетоны',
    meal: 'Питание'
}

const dateRangeError = computed(() => {
    if (!dateStart.value || !dateEnd.value) return ''
    if (dateStart.value > dateEnd.value) {
        return 'Дата начала не может быть позже даты окончания'
    }
    return ''
})

const canSubmit = computed(() => {
    return (
        selectedIndicators.value.length > 0
        && !!dateStart.value
        && !!dateEnd.value
        && !dateRangeError.value
    )
})

const allSelected = computed(() => {
    return indicators.value.length > 0
        && selectedIndicators.value.length === indicators.value.length
})

function selectAll() {
    selectedIndicators.value = [...indicators.value]
}

function clearAll() {
    selectedIndicators.value = []
}

function goBack() {
    router.back()
}

function formatIndicatorName(indicator: string) {
    return indicatorLabels[indicator] || indicator
}

async function loadIndicators() {
    if (isLoading.value) return

    isLoading.value = true
    loadError.value = ''

    try {
        const response = await api.get<AvailableIndicatorsResponse>(
            '/api/data_tracking/reports/'
        )
        indicators.value = response.data.available_indicators
    } catch (error) {
        console.error(error)
        loadError.value = 'Не удалось загрузить показатели'
    } finally {
        isLoading.value = false
    }
}

const { setReport } = useReport()

async function generateReport() {
    if (!canSubmit.value) return

    submitError.value = ''

    try {
        const response = await api.post(
            '/api/data_tracking/reports/',
            { indicators: selectedIndicators.value },
            { params: { date_start: dateStart.value, date_end: dateEnd.value } }
        )
        setReport(response.data)
    } catch (error: any) {
        console.error(error)
        submitError.value = error?.response?.data?.detail
            || error?.response?.data?.message
            || 'Не удалось сгенерировать отчет'
    }
}

onMounted(() => {
    loadIndicators()
})
</script>

<template>
    <div
        class="
            bg-white
            mx-4
            mt-4
            px-4
            py-4
            rounded-xl
            shadow-sm
            max-w-[1600px]
            flex
            flex-col
            gap-6
        "
    >
        <!-- Header -->
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-2xl font-bold text-slate-900">
                Сформировать отчет
            </h2>

            <button
                type="button"
                @click="goBack"
                class="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-lg
                    border
                    border-slate-200
                    text-slate-700
                    hover:bg-slate-50
                    transition
                    cursor-pointer
                "
            >
                <ArrowLeftIcon class="w-5 h-5" />
                <span>Назад</span>
            </button>
        </div>

        <!-- Load error -->
        <div
            v-if="loadError"
            class="text-sm text-red-500"
        >
            {{ loadError }}
        </div>

        <!-- Form -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

            <!-- Indicators -->
            <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between">
                    <label class="text-sm font-semibold text-slate-600">
                        Показатели
                    </label>

                    <div class="flex items-center gap-2">
                        <button
                            type="button"
                            @click="selectAll"
                            :disabled="allSelected"
                            class="
                                text-xs
                                font-medium
                                text-blue-600
                                hover:text-blue-500
                                disabled:text-slate-300
                                disabled:cursor-not-allowed
                                transition
                                cursor-pointer
                            "
                        >
                            Выбрать все
                        </button>

                        <span class="text-slate-200">|</span>

                        <button
                            type="button"
                            @click="clearAll"
                            :disabled="selectedIndicators.length === 0"
                            class="
                                text-xs
                                font-medium
                                text-slate-500
                                hover:text-slate-400
                                disabled:text-slate-300
                                disabled:cursor-not-allowed
                                transition
                                cursor-pointer
                            "
                        >
                            Очистить
                        </button>
                    </div>
                </div>

                <div
                    class="
                        h-[220px]
                        rounded-xl
                        border
                        border-slate-200
                        px-4
                        py-3
                        bg-white
                        flex
                        flex-col
                        gap-1
                        overflow-y-auto
                    "
                >
                    <label
                        v-for="indicator in indicators"
                        :key="indicator"
                        class="
                            flex
                            items-center
                            gap-3
                            px-2
                            py-2
                            rounded-lg
                            cursor-pointer
                            hover:bg-slate-50
                            transition
                            select-none
                            shrink-0
                        "
                        :class="{
                            'bg-blue-50 hover:bg-blue-50': selectedIndicators.includes(indicator)
                        }"
                    >
                        <input
                            type="checkbox"
                            :value="indicator"
                            v-model="selectedIndicators"
                            class="
                                w-4
                                h-4
                                rounded
                                border-slate-300
                                text-blue-600
                                accent-blue-600
                                cursor-pointer
                            "
                        />
                        <span
                            class="text-sm text-slate-800"
                            :class="{ 'font-medium text-blue-700': selectedIndicators.includes(indicator) }"
                        >
                            {{ formatIndicatorName(indicator) }}
                        </span>
                    </label>

                    <p
                        v-if="indicators.length === 0 && !isLoading"
                        class="text-sm text-slate-400 py-2"
                    >
                        Нет доступных показателей
                    </p>
                </div>

                <p class="text-xs text-slate-400">
                    Выбрано: {{ selectedIndicators.length }} из {{ indicators.length }}
                </p>
            </div>

            <!-- Dates + submit -->
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <label
                        class="text-sm font-semibold text-slate-600"
                        :class="{ 'text-red-500': dateRangeError }"
                    >
                        Дата начала
                    </label>
                    <input
                        v-model="dateStart"
                        type="date"
                        class="
                            rounded-xl
                            border
                            px-4
                            py-3
                            focus:outline-none
                            focus:ring-2
                            transition
                        "
                        :class="
                            dateRangeError
                                ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                : 'border-slate-200 focus:ring-blue-200'
                        "
                    />
                </div>

                <div class="flex flex-col gap-2">
                    <label
                        class="text-sm font-semibold text-slate-600"
                        :class="{ 'text-red-500': dateRangeError }"
                    >
                        Дата окончания
                    </label>
                    <input
                        v-model="dateEnd"
                        type="date"
                        class="
                            rounded-xl
                            border
                            px-4
                            py-3
                            focus:outline-none
                            focus:ring-2
                            transition
                        "
                        :class="
                            dateRangeError
                                ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                : 'border-slate-200 focus:ring-blue-200'
                        "
                    />

                    <p
                        v-if="dateRangeError"
                        class="text-xs text-red-500"
                    >
                        {{ dateRangeError }}
                    </p>
                </div>

                <!-- Submit error -->
                <p
                    v-if="submitError"
                    class="text-sm text-red-500"
                >
                    {{ submitError }}
                </p>

                <div class="flex justify-end">
                    <button
                        type="button"
                        @click="generateReport"
                        :disabled="!canSubmit"
                        class="
                            px-5
                            py-3
                            rounded-xl
                            bg-blue-600
                            text-white
                            font-medium
                            hover:bg-blue-500
                            disabled:bg-slate-300
                            disabled:cursor-not-allowed
                            transition
                            cursor-pointer
                        "
                    >
                        Сгенерировать отчет
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
