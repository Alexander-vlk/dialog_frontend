<script setup lang="ts">
import {computed, defineEmits, defineProps, onMounted, onUnmounted, ref, watch} from 'vue'
import {
    CheckIcon,
    ChevronDownIcon,
    ClockIcon,
    DocumentTextIcon,
    ExclamationCircleIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import {ArrowLeftIcon} from '@heroicons/vue/24/solid'
import type {AxiosResponse} from 'axios'

import api from '@/common/axios.ts'
import {userAuthStore} from '@/common/stores/user.ts'
import router from '@/router.ts'

type Medication = {
    id: number,
    name: string,
    type: string,
}

type PaginatedMedicationResponse = {
    next: string | null,
    results: Medication[],
}

const props = defineProps<{
    visible: boolean
}>()

const emit = defineEmits<{
    (e: 'close'): void,
    (e: 'saved'): void,
    (e: 'error', message: string): void,
}>()

const userStore = userAuthStore()
if (!userStore.user) {
    router.push({name: 'login'})
    throw new Error('User not authenticated')
}

const medications = ref<Medication[]>([])
const selectedMedication = ref<number | null>(null)
const dose = ref<number | null>(null)
const takenAt = ref(toDateTimeLocalValue(new Date()))
const comment = ref('')
const isSelectOpen = ref(false)
const isLoadingMedications = ref(false)
const isSubmitting = ref(false)
const loadError = ref('')
const submitError = ref('')

const selectedMedicationObject = computed(() =>
    medications.value.find((medication) => medication.id === selectedMedication.value) || null
)

const maxDateTime = computed(() => toDateTimeLocalValue(new Date()))
const minDateTime = computed(() => {
    const date = new Date()
    date.setDate(date.getDate() - 14)
    return toDateTimeLocalValue(date)
})

const canSubmit = computed(() =>
    Boolean(selectedMedication.value && dose.value && dose.value > 0 && takenAt.value && !isSubmitting.value)
)

function toDateTimeLocalValue(date: Date) {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
    return localDate.toISOString().slice(0, 16)
}

function closeModal() {
    isSelectOpen.value = false
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
        if (isSelectOpen.value) {
            isSelectOpen.value = false
            return
        }
        closeModal()
    }
}

function isPaginatedMedicationResponse(
    data: Medication[] | PaginatedMedicationResponse
): data is PaginatedMedicationResponse {
    return !Array.isArray(data) && Array.isArray(data.results)
}

function getMedicationTypeLabel(type: string) {
    const labels: Record<string, string> = {
        insulin: 'Инсулин',
        tablet: 'Таблетки',
        other: 'Другое',
    }

    return labels[type] || type
}

function selectMedication(medication: Medication) {
    selectedMedication.value = medication.id
    isSelectOpen.value = false
}

async function loadMedications() {
    if (medications.value.length || isLoadingMedications.value) return

    isLoadingMedications.value = true
    loadError.value = ''

    try {
        let url: string | null = '/api/data_tracking/medications/'
        const allMedications: Medication[] = []

        while (url) {
            const response: AxiosResponse<Medication[] | PaginatedMedicationResponse> = await api.get(url)
            const data: Medication[] | PaginatedMedicationResponse = response.data

            if (Array.isArray(data)) {
                allMedications.push(...data)
                break
            }

            if (isPaginatedMedicationResponse(data)) {
                allMedications.push(...data.results)
                url = data.next
            }
            else {
                break
            }
        }

        medications.value = allMedications
    }
    catch {
        loadError.value = 'Не удалось загрузить список лекарств'
    }
    finally {
        isLoadingMedications.value = false
    }
}

async function submit() {
    if (!canSubmit.value) return

    isSubmitting.value = true
    submitError.value = ''

    try {
        await api.post('/api/data_tracking/medication_takes/', {
            medication: selectedMedication.value,
            dose: dose.value,
            taken_at: new Date(takenAt.value).toISOString(),
            comment: comment.value,
        })
        emit('saved')
        closeModal()
    }
    catch {
        submitError.value = 'Не удалось сохранить прием лекарства'
        emit('error', 'Не удалось внести прием лекарства')
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
            takenAt.value = toDateTimeLocalValue(new Date())
            submitError.value = ''
            loadMedications()
        }
        else {
            isSelectOpen.value = false
        }
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
        <form
            class="bg-white rounded-lg shadow-lg w-full max-w-xl p-5 md:p-6 flex flex-col gap-5"
            @submit.prevent="submit"
        >
            <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-bold">
                    Принять лекарство
                </h2>
                <button
                    type="button"
                    @click="closeModal"
                    class="flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                    aria-label="Закрыть"
                    title="Закрыть"
                >
                    <ArrowLeftIcon class="w-5 h-5"/>
                </button>
            </div>

            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold text-gray-500 uppercase">
                        Лекарство
                    </label>

                    <div class="relative">
                        <button
                            type="button"
                            class="w-full min-h-16 border rounded-lg px-4 py-3 flex items-center justify-between gap-3 text-left transition cursor-pointer"
                            :class="[
                                isSelectOpen ? 'border-blue-400 ring-2 ring-blue-100' : 'border-blue-100 hover:border-blue-300',
                                selectedMedicationObject ? 'bg-blue-50 text-blue-900' : 'bg-gray-50 text-gray-500',
                            ]"
                            @click="isSelectOpen = !isSelectOpen"
                        >
                            <span class="flex items-center gap-3 min-w-0">
                                <span class="flex items-center justify-center w-10 h-10 rounded-lg bg-white text-blue-600 shadow-sm shrink-0">
                                    <DocumentTextIcon class="w-5 h-5"/>
                                </span>
                                <span class="flex flex-col min-w-0">
                                    <span class="font-medium truncate">
                                        {{ selectedMedicationObject?.name || 'Выберите препарат' }}
                                    </span>
                                    <span
                                        v-if="selectedMedicationObject"
                                        class="text-xs text-blue-600"
                                    >
                                        {{ getMedicationTypeLabel(selectedMedicationObject.type) }}
                                    </span>
                                </span>
                            </span>
                            <ChevronDownIcon
                                class="w-5 h-5 shrink-0 transition"
                                :class="{ 'rotate-180': isSelectOpen }"
                            />
                        </button>

                        <div
                            v-if="isSelectOpen"
                            class="absolute z-10 mt-2 w-full overflow-hidden rounded-lg border border-blue-100 bg-white shadow-lg"
                        >
                            <div
                                v-if="isLoadingMedications"
                                class="px-4 py-3 text-sm text-gray-500"
                            >
                                Загрузка...
                            </div>
                            <div
                                v-else-if="loadError"
                                class="px-4 py-3 flex items-center gap-2 text-sm text-red-600 bg-red-50"
                            >
                                <ExclamationCircleIcon class="w-5 h-5 shrink-0"/>
                                {{ loadError }}
                            </div>
                            <div
                                v-else-if="!medications.length"
                                class="px-4 py-3 text-sm text-gray-500"
                            >
                                Список лекарств пуст
                            </div>
                            <div
                                v-else
                                class="max-h-64 overflow-y-auto py-1"
                            >
                                <button
                                    v-for="medication in medications"
                                    :key="medication.id"
                                    type="button"
                                    class="w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-blue-50 cursor-pointer"
                                    :class="selectedMedication === medication.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'"
                                    @click="selectMedication(medication)"
                                >
                                    <span class="flex flex-col min-w-0">
                                        <span class="font-medium truncate">{{ medication.name }}</span>
                                        <span class="text-xs text-gray-500">{{ getMedicationTypeLabel(medication.type) }}</span>
                                    </span>
                                    <CheckIcon
                                        v-if="selectedMedication === medication.id"
                                        class="w-5 h-5 shrink-0"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <label class="flex flex-col gap-2">
                    <span class="text-sm font-semibold text-gray-500 uppercase">
                        Дозировка
                    </span>
                    <span class="relative">
                        <input
                            v-model.number="dose"
                            type="number"
                            class="w-full border border-gray-200 rounded-lg px-4 py-3 pr-12 text-gray-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            min="0"
                            step="0.1"
                            required
                        />
                        <ClockIcon class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                    </span>
                </label>

                <label class="flex flex-col gap-2">
                    <span class="text-sm font-semibold text-gray-500 uppercase">
                        Время приема
                    </span>
                    <span class="relative">
                        <input
                            v-model="takenAt"
                            type="datetime-local"
                            class="w-full border border-gray-200 rounded-lg px-4 py-3 pr-12 text-gray-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            :min="minDateTime"
                            required
                        />
                        <ClockIcon class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                    </span>
                </label>

                <label class="flex flex-col gap-2">
                    <span class="text-sm font-semibold text-gray-500 uppercase">
                        Комментарий
                    </span>
                    <textarea
                        v-model="comment"
                        class="min-h-24 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 resize-none focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                </label>
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
                    {{ isSubmitting ? 'Сохранение...' : 'Сохранить' }}
                </button>
            </div>
        </form>
    </div>
</template>
