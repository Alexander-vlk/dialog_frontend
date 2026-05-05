<script setup lang="ts">
import {computed} from 'vue'
import {useGlucoseRecords} from '@/apps/data_tracking/composables/useGlucoseRecords.ts'

// ---- data ----
const {glucoseData} = useGlucoseRecords()

// ---- нормы ----
const MIN = 4
const MAX = 10

// ---- части дня ----
type DayPart = 'night' | 'morning' | 'day' | 'evening'

function getDayPart(date: Date): DayPart {
    const h = date.getHours()

    if (h >= 0 && h < 6) return 'night'
    if (h >= 6 && h < 12) return 'morning'
    if (h >= 12 && h < 18) return 'day'
    return 'evening'
}

const labels: Record<DayPart, string> = {
    night: 'Ночь (00–06)',
    morning: 'Утро (06–12)',
    day: 'День (12–18)',
    evening: 'Вечер (18–24)'
}

// ---- агрегация ----
const stats = computed(() => {
    const result: Record<DayPart, {high: number; low: number; total: number}> = {
        night: {high: 0, low: 0, total: 0},
        morning: {high: 0, low: 0, total: 0},
        day: {high: 0, low: 0, total: 0},
        evening: {high: 0, low: 0, total: 0},
    }

    glucoseData.value.forEach(r => {
        const date = new Date(r.measured_at)
        const part = getDayPart(date)

        result[part].total++

        if (r.value > MAX) result[part].high++
        if (r.value < MIN) result[part].low++
    })

    return result
})

// ---- инсайты ----
const insights = computed(() => {
    const items: string[] = []

    Object.entries(stats.value).forEach(([key, value]) => {
        const part = key as DayPart

        if (value.total === 0) return

        const highRate = value.high / value.total
        const lowRate = value.low / value.total

        if (highRate > 0.3) {
            items.push(`Часто высокий сахар — ${labels[part]}`)
        }

        if (lowRate > 0.2) {
            items.push(`Частые гипо — ${labels[part]}`)
        }
    })

    if (items.length === 0) {
        items.push('Явных повторяющихся проблем не обнаружено')
    }

    return items
})
</script>

<template>
    <div class="w-full h-full bg-white rounded-xl shadow-sm p-4 flex flex-col gap-4">

        <h3 class="font-semibold text-lg">
            Повторяющиеся паттерны
        </h3>

        <div class="flex flex-col gap-2">
            <div
                v-for="(item, idx) in insights"
                :key="idx"
                class="p-3 rounded-lg bg-gray-100 text-sm"
            >
                {{ item }}
            </div>
        </div>

    </div>
</template>

<style scoped>
</style>
