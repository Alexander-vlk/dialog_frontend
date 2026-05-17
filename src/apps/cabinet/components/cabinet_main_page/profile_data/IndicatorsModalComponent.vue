<script setup lang="ts">
import {defineEmits, defineProps, onMounted, onUnmounted, watch} from 'vue'
import {
    BeakerIcon,
    BoltIcon,
    ChartBarIcon,
    ClipboardDocumentListIcon,
    FireIcon,
    HeartIcon,
    PencilSquareIcon,
    ScaleIcon,
    SparklesIcon,
    SunIcon,
} from '@heroicons/vue/24/outline'
import {ArrowLeftIcon} from '@heroicons/vue/24/solid'

type Indicator = {
    title: string,
    endpoint: string,
    colorClass: string,
    icon: object,
}

type IndicatorGroup = {
    title: string,
    items: Indicator[],
}

const props = defineProps<{
    visible: boolean,
}>()

const emit = defineEmits<{
    (e: 'close'): void,
    (e: 'select', indicator: Indicator): void,
}>()

const groups: IndicatorGroup[] = [
    {
        title: 'Главные показатели',
        items: [
            {
                title: 'Глюкоза',
                endpoint: '/api/data_tracking/glucose/',
                colorClass: 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100',
                icon: BeakerIcon,
            },
            {
                title: 'Давление',
                endpoint: '/api/data_tracking/pressure/',
                colorClass: 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100',
                icon: HeartIcon,
            },
            {
                title: 'Кетоны',
                endpoint: '/api/data_tracking/ketones/',
                colorClass: 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100',
                icon: FireIcon,
            },
            {
                title: 'Температура',
                endpoint: '/api/data_tracking/temperature/',
                colorClass: 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100',
                icon: SunIcon,
            },
        ],
    },
    {
        title: 'Ежедневное состояние',
        items: [
            {
                title: 'Самочувствие',
                endpoint: '/api/data_tracking/health_app_user/',
                colorClass: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
                icon: SparklesIcon,
            },
            {
                title: 'Настроение',
                endpoint: '/api/data_tracking/mood_app_user/',
                colorClass: 'border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100',
                icon: BoltIcon,
            },
            {
                title: 'Вес',
                endpoint: '/api/data_tracking/weight/',
                colorClass: 'border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100',
                icon: ScaleIcon,
            },
            {
                title: 'Питание',
                endpoint: '/api/data_tracking/meals/',
                colorClass: 'border-lime-200 bg-lime-50 text-lime-700 hover:bg-lime-100',
                icon: ClipboardDocumentListIcon,
            },
            {
                title: 'Активность',
                endpoint: '/api/data_tracking/physical_activity/',
                colorClass: 'border-cyan-200 bg-cyan-50 text-cyan-700 hover:bg-cyan-100',
                icon: BoltIcon,
            },
        ],
    },
    {
        title: 'Лабораторные показатели',
        items: [
            {
                title: 'Гемоглобин',
                endpoint: '/api/data_tracking/hemoglobin/',
                colorClass: 'border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100',
                icon: ChartBarIcon,
            },
            {
                title: 'Холестерин',
                endpoint: '/api/data_tracking/cholesterol/',
                colorClass: 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
                icon: ChartBarIcon,
            },
            {
                title: 'Липидный профиль',
                endpoint: '/api/data_tracking/lipid_profile/',
                colorClass: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 hover:bg-fuchsia-100',
                icon: ChartBarIcon,
            },
            {
                title: 'Микроальбуминурия',
                endpoint: '/api/data_tracking/microalbuminuria/',
                colorClass: 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100',
                icon: BeakerIcon,
            },
        ],
    },
    {
        title: 'Контекст',
        items: [
            {
                title: 'Заметка',
                endpoint: '/api/data_tracking/note/',
                colorClass: 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100',
                icon: PencilSquareIcon,
            },
        ],
    },
]

function closeModal() {
    emit('close')
}

function selectIndicator(indicator: Indicator) {
    emit('select', indicator)
}

function onBackgroundClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
        closeModal()
    }
}

function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && props.visible) {
        closeModal()
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
})

watch(
    () => props.visible,
    (visible) => {
        document.body.style.overflow = visible ? 'hidden' : ''
    },
    {immediate: true}
)
</script>

<template>
    <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center modal-overlay backdrop-blur-sm bg-white/30 p-4"
        @click="onBackgroundClick"
    >
        <div class="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-5 md:p-6 flex flex-col gap-5">
            <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-bold">
                    Внести показатели
                </h2>
                <button
                    @click="closeModal"
                    class="flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                    aria-label="Закрыть"
                    title="Закрыть"
                >
                    <ArrowLeftIcon class="w-5 h-5"/>
                </button>
            </div>

            <div class="flex flex-col gap-5">
                <section
                    v-for="group in groups"
                    :key="group.title"
                    class="flex flex-col gap-3"
                >
                    <h3 class="text-sm font-semibold text-gray-500 uppercase">
                        {{ group.title }}
                    </h3>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        <button
                            v-for="item in group.items"
                            :key="item.endpoint"
                            @click="selectIndicator(item)"
                            :class="[
                                'min-h-16 border rounded-lg px-4 py-3 flex items-center gap-3 text-left font-medium transition cursor-pointer',
                                item.colorClass,
                            ]"
                        >
                            <component :is="item.icon" class="w-6 h-6 shrink-0"/>
                            <span>{{ item.title }}</span>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
