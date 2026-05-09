<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue'
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
} from 'chart.js'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { indicatorEndpoints, indicatorLabels, useIndicatorFilters } from '@/apps/data_tracking/composables/useIndicatorFilters.ts'
import api from '@/common/axios.ts'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

const { indicator, dateStart, dateEnd } = useIndicatorFilters()

type IndicatorRecord = Record<string, any>

const records = ref<IndicatorRecord[]>([])
const isLoading = ref(false)
const loadError = ref('')

const multiFieldIndicators: Record<string, string[]> = {
    pressure: ['systolic', 'diastolic'],
    meal: ['calories', 'proteins', 'fats', 'carbs'],
}

const fieldLabels: Record<string, string> = {
    value: 'Значение',
    systolic: 'Систолическое',
    diastolic: 'Диастолическое',
    calories: 'Калории',
    proteins: 'Белки',
    fats: 'Жиры',
    carbs: 'Углеводы',
}

const dateFieldByIndicator: Record<string, string> = {
    meal: 'eaten_at',
    default: 'measured_at',
}

function getDateField(ind: string) {
    return dateFieldByIndicator[ind] ?? dateFieldByIndicator.default
}

const availableFields = computed(() => {
    if (!indicator.value) return []
    return multiFieldIndicators[indicator.value] ?? ['value']
})

const selectedField = ref('value')

watch(availableFields, (fields) => {
    selectedField.value = fields[0] ?? 'value'
})

const isTextOnly = computed(() => {
    if (!indicator.value) return false
    return ['note', 'physical_activity'].includes(indicator.value)
})

const labels = computed(() =>
    records.value.map(r => {
        const raw = r[getDateField(indicator.value!)]
        return new Date(raw).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
    })
)

const dataPoints = computed(() =>
    records.value.map(r => r[selectedField.value] ?? null)
)

const chartData = computed(() => ({
    labels: labels.value,
    datasets: [
        {
            label: indicator.value ? (fieldLabels[selectedField.value] ?? selectedField.value) : '',
            data: dataPoints.value,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.08)',
            pointBackgroundColor: '#3b82f6',
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.35,
            fill: true,
        },
    ],
}))

const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: {
                title: (items: any[]) => items[0]?.label ?? '',
                label: (item: any) => ` ${item.parsed.y}`,
            },
        },
    },
    scales: {
        x: {
            grid: { color: 'rgba(0,0,0,0.04)' },
            ticks: { color: '#94a3b8', font: { size: 11 } },
        },
        y: {
            grid: { color: 'rgba(0,0,0,0.04)' },
            ticks: { color: '#94a3b8', font: { size: 11 } },
        },
    },
}))

async function loadAllRecords() {
    if (!indicator.value || isTextOnly.value) return

    const endpoint = indicatorEndpoints[indicator.value]
    records.value = []
    loadError.value = ''
    isLoading.value = true

    try {
        const params: Record<string, string> = {}
        if (dateStart.value) params.date_start = dateStart.value
        if (dateEnd.value) params.date_end = dateEnd.value

        let url: string | null = endpoint
        const all: IndicatorRecord[] = []

        while (url) {
            const response = await api.get(url, { params })
            all.push(...response.data.results)
            url = response.data.next
            params
        }

        records.value = all.reverse() // chronological order
    } catch {
        loadError.value = 'Не удалось загрузить данные для графика'
    } finally {
        isLoading.value = false
    }
}

watch([indicator, dateStart, dateEnd], () => {
    loadAllRecords()
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
            h-full
            flex
            flex-col
            gap-4
        "
    >
        <div class="flex items-center justify-between gap-3 flex-wrap">
            <span class="text-sm font-semibold text-slate-700">
                Динамика
                <span
                    v-if="indicator"
                    class="font-normal text-slate-400"
                >
                    — {{ indicatorLabels[indicator] }}
                </span>
            </span>
            <div
                v-if="indicator && availableFields.length > 1"
                class="flex gap-1"
            >
                <button
                    v-for="field in availableFields"
                    :key="field"
                    type="button"
                    @click="selectedField = field"
                    class="
                        px-3
                        py-1
                        rounded-lg
                        text-xs
                        font-medium
                        transition
                        cursor-pointer
                    "
                    :class="
                        selectedField === field
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    "
                >
                    {{ fieldLabels[field] ?? field }}
                </button>
            </div>
        </div>
        <div
            v-if="!indicator"
            class="
                flex-1
                flex
                flex-col
                items-center
                justify-center
                gap-3
                text-center
                py-10
            "
        >
            <ChartBarIcon class="w-10 h-10 text-slate-200" />
            <p class="text-sm text-slate-400 font-medium">
                Выберите показатель для отображения графика
            </p>
        </div>
        <div
            v-else-if="isTextOnly"
            class="
                flex-1
                flex
                flex-col
                items-center
                justify-center
                gap-3
                text-center
                py-10
            "
        >
            <ChartBarIcon class="w-10 h-10 text-slate-200" />
            <p class="text-sm text-slate-400 font-medium">
                График недоступен для данного показателя
            </p>
        </div>
        <div
            v-else-if="isLoading"
            class="flex-1 min-h-[200px] rounded-xl bg-slate-100 animate-pulse"
        />
        <div
            v-else-if="loadError"
            class="flex-1 flex items-center justify-center text-sm text-red-500"
        >
            {{ loadError }}
        </div>
        <div
            v-else-if="records.length === 0"
            class="
                flex-1
                flex
                flex-col
                items-center
                justify-center
                gap-3
                text-center
                py-10
            "
        >
            <ChartBarIcon class="w-10 h-10 text-slate-200" />
            <p class="text-sm text-slate-400 font-medium">
                Нет данных за выбранный период
            </p>
        </div>
        <div
            v-else
            class="flex-1 min-h-[200px]"
        >
            <Line
                :data="chartData"
                :options="chartOptions"
            />
        </div>
    </div>
</template>
