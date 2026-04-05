<script setup lang="ts">
import { ClipboardIcon } from '@heroicons/vue/24/solid'

const stats = [
    { label: 'Калории', avg: 2054, median: 2000 },
    { label: 'Белки', avg: 79, median: 75 },
    { label: 'Жиры', avg: 10, median: 12 },
    { label: 'Углеводы', avg: 110, median: 105 }
]

function getTrend(avg: number, median: number) {
    if (avg > median) return 'up'
    if (avg < median) return 'down'
    return 'equal'
}

function copyData() {
    // TODO: логика копирования
    console.log('Скопировано')
}
</script>

<template>
    <div class="bg-blue-500 h-full rounded-xl shadow-sm text-white flex flex-col gap-2">
        <h2 class="py-2 mx-4 text-xl">Общая информация по здоровью</h2>
        <div class=" h-[2px] bg-white mx-4"></div>

        <div class="h-full mx-4">
            <table class="w-full text-sm">
                <thead class="text-white/80">
                <tr>
                    <th class="text-left font-medium pb-2">Показатель</th>
                    <th class="text-right font-medium pb-2">Среднее</th>
                    <th class="text-right font-medium pb-2">Медианное</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="(item, index) in stats"
                    :key="index"
                >
                    <td class="py-1">{{ item.label }}</td>
                    <td class="text-right py-1">
                        <div class="flex items-center justify-end gap-1">
                            <span>{{ item.avg }}</span>
                            <span
                                v-if="getTrend(item.avg, item.median) === 'up'"
                                class="text-green-400 text-xs"
                            >
                  ▲
                </span>

                            <span
                                v-else-if="getTrend(item.avg, item.median) === 'down'"
                                class="text-red-700 text-xs"
                            >
                  ▼
                </span>
                        </div>
                    </td>

                    <td class="text-right py-1">{{ item.median }}</td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="relative mt-10">
            <button
                @click="copyData"
                class="absolute bottom-2 right-2 p-1 rounded hover:bg-white/20 transition"
            >
                <ClipboardIcon class="w-7 h-7 text-white hover:cursor-pointer" />
            </button>
        </div>
    </div>
</template>

<style scoped>
</style>
