<script setup lang="ts">
import {computed, ref, type Ref} from 'vue'
import {USE_MOCKS} from '@/common/constants.ts'

type ActionType = 'glucose' | 'insulin' | 'carbs'

type ActionItem = {
    id: string
    type: ActionType
    value: number
    unit: string
    time: string
}

function generateMockActions(): ActionItem[] {
    const now = new Date()
    const actions: ActionItem[] = []

    for (let i = 0; i < 8; i++) {
        const d = new Date(now.getTime() - i * 2 * 60 * 60 * 1000)

        actions.push({
            id: `g-${i}`,
            type: 'glucose',
            value: +(4 + Math.random() * 8).toFixed(1),
            unit: 'ммоль/л',
            time: d.toISOString()
        })

        actions.push({
            id: `i-${i}`,
            type: 'insulin',
            value: +(Math.random() * 6).toFixed(1),
            unit: 'ЕД',
            time: d.toISOString()
        })

        actions.push({
            id: `c-${i}`,
            type: 'carbs',
            value: Math.floor(Math.random() * 80),
            unit: 'г',
            time: d.toISOString()
        })
    }

    return actions
}

const actions: Ref<ActionItem[]> = ref(getData())

function getData(): ActionItem[] {
    if (USE_MOCKS) return generateMockActions()
    return generateMockActions()
}

const sortedActions = computed(() =>
    [...actions.value].sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    )
)

const lastActions = computed(() => sortedActions.value.slice(0, 3))

function formatTime(dateStr: string) {
    const d = new Date(dateStr)
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

function getLabel(type: ActionType) {
    switch (type) {
        case 'glucose': return 'Сахар'
        case 'insulin': return 'Инсулин'
        case 'carbs': return 'Углеводы'
    }
}

function getColor(type: ActionType) {
    switch (type) {
        case 'glucose': return 'bg-blue-100 text-blue-700'
        case 'insulin': return 'bg-purple-100 text-purple-700'
        case 'carbs': return 'bg-orange-100 text-orange-700'
    }
}

function goToFullHistory() {
    // TODO: router.push('/history')
    console.log('Go to full history')
}
</script>

<template>
    <div class="w-full h-full bg-white rounded-xl shadow-sm p-4 flex flex-col gap-4">
        <h3 class="font-semibold text-lg">
            История действий
        </h3>
        <div class="flex flex-col gap-2">
            <div
                v-for="item in lastActions"
                :key="item.id"
                class="flex justify-between items-center p-3 rounded-lg bg-gray-50"
            >
                <div class="flex items-center gap-2">
                    <span
                        class="px-2 py-1 rounded text-xs font-medium"
                        :class="getColor(item.type)"
                    >
                        {{ getLabel(item.type) }}
                    </span>

                    <span class="text-sm">
                        {{ item.value }} {{ item.unit }}
                    </span>
                </div>

                <span class="text-xs text-gray-500">
                    {{ formatTime(item.time) }}
                </span>
            </div>
        </div>
        <button
            @click="goToFullHistory"
            class="block text-center bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg py-2 transition shadow-sm hover:cursor-pointer"
        >
            Смотреть все
        </button>
    </div>
</template>

<style scoped>
</style>
