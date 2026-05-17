<script setup lang="ts">
import { FunnelIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { indicatorLabels, useIndicatorFilters } from '@/apps/data_tracking/composables/useIndicatorFilters.ts'

const { indicator, dateStart, dateEnd } = useIndicatorFilters()

const indicators = Object.keys(indicatorLabels)

function clearFilters() {
    indicator.value = null
    dateStart.value = ''
    dateEnd.value = ''
}
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
        <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
                <FunnelIcon class="w-5 h-5 text-slate-400" />
                <span class="text-sm font-semibold text-slate-700">
                    Фильтры
                </span>
            </div>

            <button
                v-if="indicator || dateStart || dateEnd"
                type="button"
                @click="clearFilters"
                class="
                    flex
                    items-center
                    gap-1
                    text-xs
                    text-slate-400
                    hover:text-slate-600
                    transition
                    cursor-pointer
                "
            >
                <XMarkIcon class="w-4 h-4" />
                Сбросить
            </button>
        </div>

        <!-- Indicator select -->
        <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Показатель
            </label>
            <select
                v-model="indicator"
                class="
                    rounded-xl
                    border
                    border-slate-200
                    px-3
                    py-2.5
                    text-sm
                    text-slate-800
                    bg-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-200
                    cursor-pointer
                "
            >
                <option :value="null">— Не выбран —</option>
                <option
                    v-for="key in indicators"
                    :key="key"
                    :value="key"
                >
                    {{ indicatorLabels[key] }}
                </option>
            </select>
        </div>

        <!-- Date range -->
        <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Дата начала
            </label>
            <input
                v-model="dateStart"
                type="date"
                class="
                    rounded-xl
                    border
                    border-slate-200
                    px-3
                    py-2.5
                    text-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-200
                "
            />
        </div>

        <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Дата окончания
            </label>
            <input
                v-model="dateEnd"
                type="date"
                class="
                    rounded-xl
                    border
                    border-slate-200
                    px-3
                    py-2.5
                    text-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-200
                "
            />
        </div>
    </div>
</template>
