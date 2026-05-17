<script setup lang="ts">
import { ref, watch } from 'vue'
import { TableCellsIcon } from '@heroicons/vue/24/outline'
import { indicatorEndpoints, useIndicatorFilters } from '@/apps/data_tracking/composables/useIndicatorFilters.ts'
import api from '@/common/axios.ts'

const { indicator, dateStart, dateEnd } = useIndicatorFilters()

type IndicatorRecord = Record<string, any>

const records = ref<IndicatorRecord[]>([])
const isLoading = ref(false)
const isLoadingMore = ref(false)
const loadError = ref('')
const nextUrl = ref<string | null>(null)
const total = ref(0)

const fieldLabels: Record<string, string> = {
    value: 'Значение',
    systolic: 'Систолическое',
    diastolic: 'Диастолическое',
    calories: 'Калории',
    proteins: 'Белки',
    fats: 'Жиры',
    carbs: 'Углеводы',
    description: 'Описание',
    dose: 'Доза',
    comment: 'Комментарий',
}

const dateFieldByIndicator: Record<string, string> = {
    meal: 'eaten_at',
    note: 'measured_at',
    physical_activity: 'measured_at',
    default: 'measured_at',
}

const skipFields = new Set(['id', 'user', 'created_at', 'updated_at', 'medication'])
const mealFieldOrder = ['calories', 'proteins', 'fats', 'carbs']

function getDateField(ind: string) {
    return dateFieldByIndicator[ind] ?? dateFieldByIndicator.default
}

function getRecordFields(record: IndicatorRecord) {
    const entries = Object.entries(record).filter(
        ([k]) => !skipFields.has(k) && k !== getDateField(indicator.value!)
    )

    if (indicator.value === 'meal') {
        return entries.sort(([a], [b]) => {
            const ai = mealFieldOrder.indexOf(a)
            const bi = mealFieldOrder.indexOf(b)
            if (ai === -1 && bi === -1) return 0
            if (ai === -1) return 1
            if (bi === -1) return -1
            return ai - bi
        })
    }

    return entries
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

function formatFieldLabel(key: string) {
    return fieldLabels[key] ?? key
}

function formatValue(value: any) {
    if (value === null || value === undefined) return '—'
    return value
}

async function loadRecords() {
    if (!indicator.value) return

    const endpoint = indicatorEndpoints[indicator.value]
    records.value = []
    nextUrl.value = null
    total.value = 0
    loadError.value = ''
    isLoading.value = true

    try {
        const params: Record<string, string> = {}
        if (dateStart.value) params.date_start = dateStart.value
        if (dateEnd.value) params.date_end = dateEnd.value

        const response = await api.get(endpoint, { params })
        records.value = response.data.results
        nextUrl.value = response.data.next
        total.value = response.data.count
    } catch {
        loadError.value = 'Не удалось загрузить записи'
    } finally {
        isLoading.value = false
    }
}

async function loadMore() {
    if (!nextUrl.value || isLoadingMore.value) return

    isLoadingMore.value = true
    try {
        const response = await api.get(nextUrl.value)
        records.value.push(...response.data.results)
        nextUrl.value = response.data.next
    } catch {
        loadError.value = 'Не удалось загрузить следующую страницу'
    } finally {
        isLoadingMore.value = false
    }
}

watch([indicator, dateStart, dateEnd], () => {
    loadRecords()
}, { immediate: true })
</script>

<template>
    <div
        class="
            bg-white
            rounded-xl
            shadow-sm
            px-5
            py-5
            flex
            flex-col
            gap-4
        "
    >
        <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-slate-700">
                Записи
            </span>
            <span
                v-if="indicator && !isLoading"
                class="text-xs text-slate-400"
            >
                Показано {{ records.length }} из {{ total }}
            </span>
        </div>
        <div
            v-if="!indicator"
            class="
                flex
                flex-col
                items-center
                justify-center
                gap-3
                text-center
                py-16
            "
        >
            <TableCellsIcon class="w-10 h-10 text-slate-200" />
            <p class="text-sm text-slate-400 font-medium">
                Выберите показатель, чтобы увидеть записи
            </p>
            <p class="text-xs text-slate-300">
                Также можно указать период для фильтрации
            </p>
        </div>
        <div
            v-else-if="isLoading"
            class="flex flex-col gap-3 py-4"
        >
            <div
                v-for="i in 5"
                :key="i"
                class="h-16 rounded-xl bg-slate-100 animate-pulse"
            />
        </div>
        <div
            v-else-if="loadError"
            class="text-sm text-red-500 py-4 text-center"
        >
            {{ loadError }}
        </div>
        <div
            v-else-if="records.length === 0"
            class="text-sm text-slate-400 text-center py-12"
        >
            Записей за выбранный период не найдено
        </div>
        <div
            v-else
            class="flex flex-col gap-2"
        >
            <div
                v-for="record in records"
                :key="record.id"
                class="
                    rounded-xl
                    border
                    border-slate-100
                    px-4
                    py-3
                    flex
                    items-start
                    justify-between
                    gap-4
                    hover:bg-slate-50
                    transition
                "
            >
                <div class="flex flex-wrap gap-x-6 gap-y-1">
                    <div
                        v-for="[key, val] in getRecordFields(record)"
                        :key="key"
                        class="flex flex-col"
                    >
                        <span class="text-xs text-slate-400">
                            {{ formatFieldLabel(key) }}
                        </span>
                        <span class="text-sm font-medium text-slate-800">
                            {{ formatValue(val) }}
                        </span>
                    </div>
                </div>
                <span class="text-xs text-slate-400 shrink-0 mt-0.5">
                    {{ formatDate(record[getDateField(indicator!)]) }}
                </span>
            </div>
            <button
                v-if="nextUrl"
                type="button"
                @click="loadMore"
                :disabled="isLoadingMore"
                class="
                    mt-2
                    w-full
                    py-3
                    rounded-xl
                    border
                    border-slate-200
                    text-sm
                    text-slate-500
                    hover:bg-slate-50
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    transition
                    cursor-pointer
                "
            >
                {{ isLoadingMore ? 'Загрузка...' : 'Загрузить ещё' }}
            </button>
        </div>
    </div>
</template>
