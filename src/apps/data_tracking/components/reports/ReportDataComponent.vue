<script setup lang="ts">
import { computed } from 'vue'
import { useReport } from '@/apps/data_tracking/composables/useReport'

const { reportData } = useReport()
import { ChartBarIcon } from '@heroicons/vue/24/outline'

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
    meal: 'Питание',
}

const fieldLabels: Record<string, string> = {
    value: 'Значение',
    systolic: 'Систолическое',
    diastolic: 'Диастолическое',
    calories: 'Калории',
    proteins: 'Белки',
    carbs: 'Углеводы',
    fats: 'Жиры',
}

function formatIndicatorName(key: string) {
    return indicatorLabels[key] || key
}

function formatFieldName(key: string) {
    return fieldLabels[key] || key
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

function formatDisplayDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}

const indicators = computed(() => {
    if (!reportData.value) return []
    return Object.entries(reportData.value.aggregated_values)
})

function getValueEntries(values: Record<string, number | null>) {
    return Object.entries(values).filter(([, v]) => v !== null)
}

function getMinMaxFields(record: Record<string, any> | null) {
    if (!record) return []
    const skip = new Set(['id', 'created_at', 'updated_at', 'user'])
    return Object.entries(record).filter(([k]) => !skip.has(k))
}
</script>

<template>
    <div class="mx-4 mt-4 mb-4">
        <div
            v-if="!reportData"
            class="
                bg-white
                rounded-xl
                shadow-sm
                px-6
                py-16
                flex
                flex-col
                items-center
                justify-center
                gap-3
                text-center
            "
        >
            <ChartBarIcon class="w-12 h-12 text-slate-300" />
            <p class="text-slate-500 text-base font-medium">
                Выберите параметры, чтобы собрать отчет
            </p>
            <p class="text-slate-400 text-sm">
                Укажите показатели и даты выше, затем нажмите «Сгенерировать отчет»
            </p>
        </div>

        <div
            v-else
            class="flex flex-col gap-4"
        >
            <div
                class="
                    bg-white
                    rounded-xl
                    shadow-sm
                    px-6
                    py-4
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-slate-500
                "
            >
                <span class="font-medium text-slate-700">Период:</span>
                <span>{{ formatDisplayDate(reportData.date_start) }}</span>
                <span>—</span>
                <span>{{ formatDisplayDate(reportData.date_end) }}</span>
            </div>

            <div
                class="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-4
                "
            >
                <div
                    v-for="[key, data] in indicators"
                    :key="key"
                    class="
                        bg-white
                        rounded-xl
                        shadow-sm
                        px-6
                        py-5
                        flex
                        flex-col
                        gap-4
                    "
                >
                    <div class="flex items-center justify-between">
                        <h3 class="font-semibold text-slate-800 text-base">
                            {{ formatIndicatorName(key) }}
                        </h3>
                        <span
                            class="
                                text-xs
                                font-medium
                                px-2.5
                                py-1
                                rounded-full
                                bg-slate-100
                                text-slate-500
                            "
                        >
                            {{ data.total }} зап.
                        </span>
                    </div>

                    <p
                        v-if="data.total === 0"
                        class="text-sm text-slate-400 italic"
                    >
                        Нет данных за выбранный период
                    </p>

                    <template v-else>
                        <div class="grid grid-cols-2 gap-3">
                            <div
                                class="
                                    bg-blue-50
                                    rounded-lg
                                    px-4
                                    py-3
                                    flex
                                    flex-col
                                    gap-1
                                "
                            >
                                <span class="text-xs font-medium text-blue-400 uppercase tracking-wide">
                                    Среднее
                                </span>
                                <div
                                    v-for="[field, val] in getValueEntries(data.average_values)"
                                    :key="field"
                                    class="flex items-baseline gap-1"
                                >
                                    <span class="text-sm font-semibold text-blue-700">{{ val }}</span>
                                    <span
                                        v-if="Object.keys(data.average_values).length > 1"
                                        class="text-xs text-blue-400"
                                    >
                                        {{ formatFieldName(field) }}
                                    </span>
                                </div>
                            </div>

                            <div
                                class="
                                    bg-violet-50
                                    rounded-lg
                                    px-4
                                    py-3
                                    flex
                                    flex-col
                                    gap-1
                                "
                            >
                                <span class="text-xs font-medium text-violet-400 uppercase tracking-wide">
                                    Медиана
                                </span>
                                <div
                                    v-for="[field, val] in getValueEntries(data.median_values)"
                                    :key="field"
                                    class="flex items-baseline gap-1"
                                >
                                    <span class="text-sm font-semibold text-violet-700">{{ val }}</span>
                                    <span
                                        v-if="Object.keys(data.median_values).length > 1"
                                        class="text-xs text-violet-400"
                                    >
                                        {{ formatFieldName(field) }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div class="flex flex-col gap-1">
                                <span class="text-xs font-medium text-slate-400 uppercase tracking-wide">
                                    Минимум
                                </span>
                                <template v-if="data.min_value">
                                    <div
                                        v-for="[field, val] in getMinMaxFields(data.min_value)"
                                        :key="field"
                                    >
                                        <span
                                            v-if="field === 'measured_at'"
                                            class="text-xs text-slate-400"
                                        >
                                            {{ formatDate(val) }}
                                        </span>
                                        <div
                                            v-else
                                            class="flex items-baseline gap-1"
                                        >
                                            <span class="text-sm font-semibold text-emerald-600">{{ val }}</span>
                                            <span
                                                v-if="getMinMaxFields(data.min_value).filter(([k]) => !['measured_at'].includes(k)).length > 1"
                                                class="text-xs text-slate-400"
                                            >
                                                {{ formatFieldName(field) }}
                                            </span>
                                        </div>
                                    </div>
                                </template>
                            </div>

                            <div class="flex flex-col gap-1">
                                <span class="text-xs font-medium text-slate-400 uppercase tracking-wide">
                                    Максимум
                                </span>
                                <template v-if="data.max_value">
                                    <div
                                        v-for="[field, val] in getMinMaxFields(data.max_value)"
                                        :key="field"
                                    >
                                        <span
                                            v-if="field === 'measured_at'"
                                            class="text-xs text-slate-400"
                                        >
                                            {{ formatDate(val) }}
                                        </span>
                                        <div
                                            v-else
                                            class="flex items-baseline gap-1"
                                        >
                                            <span class="text-sm font-semibold text-rose-500">{{ val }}</span>
                                            <span
                                                v-if="getMinMaxFields(data.max_value).filter(([k]) => !['measured_at'].includes(k)).length > 1"
                                                class="text-xs text-slate-400"
                                            >
                                                {{ formatFieldName(field) }}
                                            </span>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
