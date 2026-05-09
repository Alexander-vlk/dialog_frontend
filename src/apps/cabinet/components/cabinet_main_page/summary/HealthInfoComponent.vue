<script setup lang="ts">
import {
    ClipboardDocumentIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
} from '@heroicons/vue/24/outline'

const stats = [
    {
        label: 'Глюкоза',
        value: '6.1',
        unit: 'ммоль/л',
        trend: 'down',
    },
    {
        label: 'Давление',
        value: '124/82',
        unit: '',
        trend: 'stable',
    },
    {
        label: 'Вес',
        value: '78',
        unit: 'кг',
        trend: 'up',
    },
    {
        label: 'Температура',
        value: '36.7',
        unit: '°C',
        trend: 'stable',
    },
    {
        label: 'Холестерин',
        value: '5.8',
        unit: 'ммоль/л',
        trend: 'up',
    },
    {
        label: 'Гемоглобин',
        value: '138',
        unit: 'г/л',
        trend: 'stable',
    },
]

const nutrition = [
    {
        label: 'Ккал',
        value: 2054,
    },
    {
        label: 'Б',
        value: 79,
    },
    {
        label: 'Ж',
        value: 62,
    },
    {
        label: 'У',
        value: 210,
    },
]

function getTrendIcon(trend: string) {
    if (trend === 'up') {
        return ArrowTrendingUpIcon
    }

    if (trend === 'down') {
        return ArrowTrendingDownIcon
    }

    return null
}

function copyData() {
    console.log('copied')
}
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
                    Последние показатели пользователя
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
                    Метформин · 500 мг
                </p>
            </div>

        </div>
    </div>
</template>
