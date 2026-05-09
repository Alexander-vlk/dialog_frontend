<script setup lang="ts">
import { userAuthStore } from '@/common/stores/user.ts'
import { computed, ref, type Ref } from 'vue'
import type { AppUser } from '@/apps/auth_service/types.ts'
import router from '@/router.ts'
import { readableGenderByGenderSlug } from '@/apps/cabinet/constants.ts'
import formatDate from '@/common/utils/formatDate.ts'
import { USE_MOCKS } from '@/common/constants.ts'
import ProfileDataModalComponent
    from '@/apps/cabinet/components/cabinet_main_page/profile_data/ProfileDataModalComponent.vue'
import MedicationTakeModal
    from '@/apps/cabinet/components/cabinet_main_page/profile_data/MedicationTakeModal.vue'
import IndicatorsModalComponent
    from '@/apps/cabinet/components/cabinet_main_page/profile_data/IndicatorsModalComponent.vue'
import IndicatorFormModalComponent
    from '@/apps/cabinet/components/cabinet_main_page/profile_data/IndicatorFormModalComponent.vue'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'

type Indicator = {
    title: string,
    endpoint: string,
    colorClass: string,
    icon: object,
}

type Notification = {
    type: 'success' | 'error',
    text: string,
}

const userStore = userAuthStore()

if (!userStore.user) {
    router.push({ name: 'login' })
    throw new Error('User not authenticated')
}

const user: Ref<AppUser> = ref(userStore.user)
const userWeight = ref(getUserWeight())
const isProfileModalVisible = ref(false)
const isModalOpen = ref(false)
const isIndicatorsModalVisible = ref(false)
const selectedIndicator = ref<Indicator | null>(null)
const notification = ref<Notification | null>(null)
let notificationTimeout: ReturnType<typeof setTimeout> | null = null

function getUserWeight(): number {
    if (USE_MOCKS) return 70
    return 0
}

function switchProfileModal() {
    isProfileModalVisible.value = !isProfileModalVisible.value
}

function switchIndicatorsModal() {
    isIndicatorsModalVisible.value = !isIndicatorsModalVisible.value
}

function openIndicatorForm(indicator: Indicator) {
    selectedIndicator.value = indicator
    isIndicatorsModalVisible.value = false
}

function closeIndicatorForm() {
    selectedIndicator.value = null
}

function showNotification(type: Notification['type'], text: string) {
    notification.value = { type, text }

    if (notificationTimeout) {
        clearTimeout(notificationTimeout)
    }

    notificationTimeout = setTimeout(() => {
        notification.value = null
        notificationTimeout = null
    }, 4000)
}

function handleIndicatorSaved() {
    const indicatorTitle = selectedIndicator.value?.title || 'Показатель'
    showNotification('success', `${indicatorTitle} успешно внесен`)
    closeIndicatorForm()
}

function handleMedicationSaved() {
    showNotification('success', 'Прием лекарства успешно внесен')
    isModalOpen.value = false
}

function handleSaveError(message: string) {
    showNotification('error', message)
}

const formattedGender = computed(() =>
    readableGenderByGenderSlug[user.value.gender]
)

const age = computed(() => ({
    value: 1,
    postfix: 'год'
}))

const formattedDiagnosisDate = computed(() => {
    if (!user.value.diagnosis_date) return 'Не указан'
    return formatDate(user.value.diagnosis_date)
})
</script>

<template>
    <Transition name="notification">
        <div
            v-if="notification"
            class="
                modal-overlay
                fixed top-4 right-4 z-[70]
                flex items-start gap-3
                max-w-sm
                rounded-xl
                border
                bg-white
                px-4 py-3
                shadow-sm
            "
            :class="
                notification.type === 'success'
                    ? 'border-emerald-200 text-emerald-700'
                    : 'border-red-200 text-red-700'
            "
        >
            <CheckCircleIcon
                v-if="notification.type === 'success'"
                class="w-5 h-5 shrink-0"
            />

            <ExclamationCircleIcon
                v-else
                class="w-5 h-5 shrink-0"
            />

            <span class="text-sm font-medium">
                {{ notification.text }}
            </span>
        </div>
    </Transition>
    <div
        class="
            h-full
            rounded-2xl
            border border-slate-200
            bg-white
            shadow-sm
            p-5
            flex flex-col
        "
    >
        <div class="flex items-center gap-4">
            <img
                :src="user.image || ''"
                alt="Аватар"
                class="
                    w-18 h-18
                    rounded-2xl
                    object-cover
                    border border-slate-200
                "
            />

            <div class="min-w-0">
                <h2
                    class="
                        text-lg
                        font-semibold
                        text-slate-900
                        truncate
                    "
                >
                    @{{ user.username }}
                </h2>

                <p class="text-sm text-slate-500 mt-1">
                    {{ user.last_name }}
                    {{ user.first_name }}
                </p>
            </div>
        </div>
        <div
            class="
                mt-5
                rounded-2xl
                bg-slate-50
                p-4
                space-y-3
            "
        >
            <div class="flex items-center justify-between">
                <span class="text-sm text-slate-500">
                    Пол
                </span>

                <span class="text-sm font-medium text-slate-900">
                    {{ formattedGender }}
                </span>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-sm text-slate-500">
                    Возраст
                </span>

                <span class="text-sm font-medium text-slate-900">
                    {{ age.value }} {{ age.postfix }}
                </span>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-sm text-slate-500">
                    Рост
                </span>

                <span class="text-sm font-medium text-slate-900">
                    {{ user.height ? `${user.height} см` : 'Не указан' }}
                </span>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-sm text-slate-500">
                    Вес
                </span>

                <span class="text-sm font-medium text-slate-900">
                    {{ userWeight }} кг
                </span>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-sm text-slate-500">
                    Диагноз
                </span>

                <span class="text-sm font-medium text-slate-900">
                    {{ formattedDiagnosisDate }}
                </span>
            </div>
        </div>

        <div class="mt-auto pt-5">
            <div class="flex flex-col gap-2">
                <button
                    @click="switchIndicatorsModal"
                    class="
                        w-full
                        rounded-xl
                        bg-blue-700
                        px-4 py-3
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-blue-500
                        hover:cursor-pointer
                    "
                >
                    Внести показатели
                </button>
                <button
                    @click="isModalOpen = true"
                    class="
                        w-full
                        rounded-xl
                        bg-blue-700
                        text-white
                        px-4 py-3
                        text-sm
                        font-medium
                        text-blue-500
                        transition
                        hover:bg-blue-700
                        hover:cursor-pointer
                    "
                >
                    Принять лекарство
                </button>

                <button
                    @click="switchProfileModal"
                    class="
                        w-full
                        rounded-xl
                        border border-slate-200
                        bg-white
                        px-4 py-3
                        text-sm
                        font-medium
                        text-slate-700
                        transition
                        hover:bg-slate-50
                        hover:cursor-pointer
                    "
                >
                    Открыть профиль
                </button>
            </div>
        </div>

        <MedicationTakeModal
            :visible="isModalOpen"
            @close="isModalOpen = false"
            @saved="handleMedicationSaved"
            @error="handleSaveError"
        />
    </div>
    <ProfileDataModalComponent
        :visible="isProfileModalVisible"
        @close="switchProfileModal"
    />
    <IndicatorsModalComponent
        :visible="isIndicatorsModalVisible"
        @close="switchIndicatorsModal"
        @select="openIndicatorForm"
    />

    <IndicatorFormModalComponent
        :visible="Boolean(selectedIndicator)"
        :indicator="selectedIndicator"
        @close="closeIndicatorForm"
        @saved="handleIndicatorSaved"
        @error="handleSaveError"
    />
</template>

<style scoped>
.notification-enter-active,
.notification-leave-active {
    transition: opacity 150ms ease, transform 150ms ease;
}

.notification-enter-from,
.notification-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
