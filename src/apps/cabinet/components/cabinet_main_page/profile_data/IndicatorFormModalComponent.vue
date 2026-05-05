<script setup lang="ts">
import {computed, defineEmits, defineProps, onMounted, onUnmounted, ref, watch} from 'vue'
import {
    CheckIcon,
    ChevronDownIcon,
    ClockIcon,
    ExclamationCircleIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import {ArrowLeftIcon} from '@heroicons/vue/24/solid'
import type {AxiosResponse} from 'axios'

import api from '@/common/axios.ts'

type Indicator = {
    title: string,
    endpoint: string,
    colorClass: string,
}

type ChoiceOption = {
    id: number,
    name: string,
}

type PaginatedChoiceResponse = {
    next: string | null,
    results: ChoiceOption[],
}

type FieldConfig = {
    name: string,
    label: string,
    type: 'number' | 'textarea' | 'choice',
    step?: string,
    min?: string,
    choiceEndpoint?: string,
    choiceKey?: string,
}

type FormConfig = {
    timeField: string,
    fields: FieldConfig[],
}

const props = defineProps<{
    visible: boolean,
    indicator: Indicator | null,
}>()

const emit = defineEmits<{
    (e: 'close'): void,
    (e: 'saved'): void,
    (e: 'error', message: string): void,
}>()

const formValues = ref<Record<string, string | number | null>>({})
const measuredAt = ref(toDateTimeLocalValue(new Date()))
const isSubmitting = ref(false)
const submitError = ref('')
const choices = ref<Record<string, ChoiceOption[]>>({})
const choicesLoading = ref<Record<string, boolean>>({})
const choicesError = ref<Record<string, string>>({})
const openChoiceName = ref<string | null>(null)

const maxDateTime = computed(() => toDateTimeLocalValue(new Date()))
const minDateTime = computed(() => {
    const date = new Date()
    date.setDate(date.getDate() - 14)
    return toDateTimeLocalValue(date)
})

const formConfig = computed<FormConfig>(() => getFormConfig(props.indicator?.endpoint || ''))
const canSubmit = computed(() => {
    if (!props.indicator || !measuredAt.value || isSubmitting.value) return false

    return formConfig.value.fields.every((field) => {
        const value = formValues.value[field.name]
        return value !== null && value !== '' && value !== undefined
    })
})

function toDateTimeLocalValue(date: Date) {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
    return localDate.toISOString().slice(0, 16)
}

function getFormConfig(endpoint: string): FormConfig {
    const measuredAtConfig = {
        timeField: 'measured_at',
        fields: [
            {
                name: 'value',
                label: 'Значение',
                type: 'number' as const,
                step: '0.1',
                min: '0',
            },
        ],
    }

    const configs: Record<string, FormConfig> = {
        '/api/data_tracking/pressure/': {
            timeField: 'measured_at',
            fields: [
                {name: 'systolic', label: 'Систолическое', type: 'number', step: '1', min: '0'},
                {name: 'diastolic', label: 'диастолическое', type: 'number', step: '1', min: '0'},
            ],
        },
        '/api/data_tracking/meals/': {
            timeField: 'eaten_at',
            fields: [
                {name: 'calories', label: 'Калории', type: 'number', step: '1', min: '0'},
                {name: 'proteins', label: 'Белки', type: 'number', step: '1', min: '0'},
                {name: 'fats', label: 'Жиры', type: 'number', step: '1', min: '0'},
                {name: 'carbs', label: 'Углеводы', type: 'number', step: '1', min: '0'},
            ],
        },
        '/api/data_tracking/physical_activity/': {
            timeField: 'measured_at',
            fields: [
                {name: 'description', label: 'Физическая активность', type: 'textarea'},
            ],
        },
        '/api/data_tracking/note/': {
            timeField: 'measured_at',
            fields: [
                {name: 'description', label: 'Заметка', type: 'textarea'},
            ],
        },
        '/api/data_tracking/mood_app_user/': {
            timeField: 'measured_at',
            fields: [
                {
                    name: 'mood',
                    label: 'Настроение',
                    type: 'choice',
                    choiceEndpoint: '/api/data_tracking/mood/',
                    choiceKey: 'mood',
                },
            ],
        },
        '/api/data_tracking/health_app_user/': {
            timeField: 'measured_at',
            fields: [
                {
                    name: 'health',
                    label: 'Самочувствие',
                    type: 'choice',
                    choiceEndpoint: '/api/data_tracking/health/',
                    choiceKey: 'health',
                },
            ],
        },
    }

    return configs[endpoint] || measuredAtConfig
}

function resetForm() {
    measuredAt.value = toDateTimeLocalValue(new Date())
    submitError.value = ''
    openChoiceName.value = null
    formValues.value = {}

    formConfig.value.fields.forEach((field) => {
        formValues.value[field.name] = null
    })
}

function closeModal() {
    openChoiceName.value = null
    emit('close')
}

function onBackgroundClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
        closeModal()
    }
}

function handleKeydown(e: KeyboardEvent) {
    if (!props.visible) return

    if (e.key === 'Escape') {
        if (openChoiceName.value) {
            openChoiceName.value = null
            return
        }
        closeModal()
    }
}

function isPaginatedChoiceResponse(
    data: ChoiceOption[] | PaginatedChoiceResponse
): data is PaginatedChoiceResponse {
    return !Array.isArray(data) && Array.isArray(data.results)
}

function getChoiceLabel(field: FieldConfig) {
    const selectedId = formValues.value[field.name]
    const option = choices.value[field.name]?.find((item) => item.id === selectedId)
    return option?.name || ` ${field.label.toLowerCase()}`
}

function selectChoice(field: FieldConfig, option: ChoiceOption) {
    formValues.value[field.name] = option.id
    openChoiceName.value = null
}

async function loadChoices(field: FieldConfig) {
    if (!field.choiceEndpoint || choices.value[field.name]?.length || choicesLoading.value[field.name]) {
        return
    }

    choicesLoading.value[field.name] = true
    choicesError.value[field.name] = ''

    try {
        let url: string | null = field.choiceEndpoint
        const options: ChoiceOption[] = []

        while (url) {
            const response: AxiosResponse<ChoiceOption[] | PaginatedChoiceResponse> = await api.get(url)
            const data: ChoiceOption[] | PaginatedChoiceResponse = response.data

            if (Array.isArray(data)) {
                options.push(...data)
                break
            }

            if (isPaginatedChoiceResponse(data)) {
                options.push(...data.results)
                url = data.next
            }
            else {
                break
            }
        }

        choices.value[field.name] = options
    }
    catch {
        choicesError.value[field.name] = 'РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РІР°СЂРёР°РЅС‚С‹'
    }
    finally {
        choicesLoading.value[field.name] = false
    }
}

function loadVisibleChoices() {
    formConfig.value.fields
        .filter((field) => field.type === 'choice')
        .forEach((field) => loadChoices(field))
}

async function submit() {
    if (!props.indicator || !canSubmit.value) return

    isSubmitting.value = true
    submitError.value = ''

    try {
        const payload = {
            ...formValues.value,
            [formConfig.value.timeField]: new Date(measuredAt.value).toISOString(),
        }

        await api.post(props.indicator.endpoint, payload)
        emit('saved')
        closeModal()
    }
    catch {
        submitError.value = 'РќРµ СѓРґР°Р»РѕСЃСЊ СЃРѕС…СЂР°РЅРёС‚СЊ РїРѕРєР°Р·Р°С‚РµР»СЊ'
        emit('error', 'РќРµ СѓРґР°Р»РѕСЃСЊ РІРЅРµСЃС‚Рё РїРѕРєР°Р·Р°С‚РµР»СЊ Р·РґРѕСЂРѕРІСЊСЏ')
    }
    finally {
        isSubmitting.value = false
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
        if (visible) {
            resetForm()
            loadVisibleChoices()
        }
    },
    {immediate: true}
)
</script>

<template>
    <div
        v-if="visible && indicator"
        class="fixed inset-0 z-50 flex items-center justify-center modal-overlay backdrop-blur-sm bg-white/30 p-4"
        @click="onBackgroundClick"
    >
        <form
            class="bg-white rounded-lg shadow-lg w-full max-w-xl p-5 md:p-6 flex flex-col gap-5"
            @submit.prevent="submit"
        >
            <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-bold">
                    {{ indicator.title }}
                </h2>
                <button
                    type="button"
                    @click="closeModal"
                    class="flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                    aria-label="Р—Р°РєСЂС‹С‚СЊ"
                    title="Р—Р°РєСЂС‹С‚СЊ"
                >
                    <ArrowLeftIcon class="w-5 h-5"/>
                </button>
            </div>

            <div class="flex flex-col gap-4">
                <label class="flex flex-col gap-2">
                    <span class="text-sm font-semibold text-gray-500 uppercase">
                        Время замера
                    </span>
                    <span class="relative">
                        <input
                            v-model="measuredAt"
                            type="datetime-local"
                            class="w-full border border-gray-200 rounded-lg px-4 py-3 pr-12 text-gray-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            :min="minDateTime"
                            :max="maxDateTime"
                            required
                        />
                        <ClockIcon class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                    </span>
                </label>

                <template
                    v-for="field in formConfig.fields"
                    :key="field.name"
                >
                    <label
                        v-if="field.type === 'number'"
                        class="flex flex-col gap-2"
                    >
                        <span class="text-sm font-semibold text-gray-500 uppercase">
                            {{ field.label }}
                        </span>
                        <input
                            v-model.number="formValues[field.name]"
                            type="number"
                            class="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            :step="field.step"
                            :min="field.min"
                            required
                        />
                    </label>

                    <label
                        v-else-if="field.type === 'textarea'"
                        class="flex flex-col gap-2"
                    >
                        <span class="text-sm font-semibold text-gray-500 uppercase">
                            {{ field.label }}
                        </span>
                        <textarea
                            v-model="formValues[field.name]"
                            class="min-h-24 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 resize-none focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            required
                        />
                    </label>

                    <div
                        v-else
                        class="flex flex-col gap-2"
                    >
                        <span class="text-sm font-semibold text-gray-500 uppercase">
                            {{ field.label }}
                        </span>

                        <div class="relative">
                            <button
                                type="button"
                                class="w-full min-h-16 border rounded-lg px-4 py-3 flex items-center justify-between gap-3 text-left transition cursor-pointer"
                                :class="openChoiceName === field.name ? 'border-blue-400 ring-2 ring-blue-100 bg-blue-50 text-blue-900' : 'border-blue-100 bg-gray-50 text-gray-600 hover:border-blue-300'"
                                @click="openChoiceName = openChoiceName === field.name ? null : field.name"
                            >
                                <span class="font-medium truncate">
                                    {{ getChoiceLabel(field) }}
                                </span>
                                <ChevronDownIcon
                                    class="w-5 h-5 shrink-0 transition"
                                    :class="{ 'rotate-180': openChoiceName === field.name }"
                                />
                            </button>

                            <div
                                v-if="openChoiceName === field.name"
                                class="absolute z-10 mt-2 w-full overflow-hidden rounded-lg border border-blue-100 bg-white shadow-lg"
                            >
                                <div
                                    v-if="choicesLoading[field.name]"
                                    class="px-4 py-3 text-sm text-gray-500"
                                >
                                    Р—Р°РіСЂСѓР·РєР°...
                                </div>
                                <div
                                    v-else-if="choicesError[field.name]"
                                    class="px-4 py-3 flex items-center gap-2 text-sm text-red-600 bg-red-50"
                                >
                                    <ExclamationCircleIcon class="w-5 h-5 shrink-0"/>
                                    {{ choicesError[field.name] }}
                                </div>
                                <div
                                    v-else-if="!choices[field.name]?.length"
                                    class="px-4 py-3 text-sm text-gray-500"
                                >
                                    Выберите
                                </div>
                                <div
                                    v-else
                                    class="max-h-64 overflow-y-auto py-1"
                                >
                                    <button
                                        v-for="option in choices[field.name]"
                                        :key="option.id"
                                        type="button"
                                        class="w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-blue-50 cursor-pointer"
                                        :class="formValues[field.name] === option.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'"
                                        @click="selectChoice(field, option)"
                                    >
                                        <span class="font-medium truncate">{{ option.name }}</span>
                                        <CheckIcon
                                            v-if="formValues[field.name] === option.id"
                                            class="w-5 h-5 shrink-0"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <div
                v-if="submitError"
                class="px-4 py-3 flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg"
            >
                <ExclamationCircleIcon class="w-5 h-5 shrink-0"/>
                {{ submitError }}
            </div>

            <div class="mt-1 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                <button
                    type="button"
                    @click="closeModal"
                    class="flex items-center justify-center gap-2 text-blue-500 hover:text-blue-700 font-medium cursor-pointer"
                >
                    <XMarkIcon class="w-5 h-5"/>
                   Назад
                </button>
                <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg cursor-pointer transition"
                    :disabled="!canSubmit"
                >
                    {{ isSubmitting ? 'РЎРѕС…СЂР°РЅРµРЅРёРµ...' : 'Внести' }}
                </button>
            </div>
        </form>
    </div>
</template>
