<script setup lang="ts">
import {userAuthStore} from "@/common/stores/user.ts"
import {computed, ref, type Ref} from "vue"
import type {AppUser} from "@/apps/auth_service/types.ts"
import router from "@/router.ts"
import {readableGenderByGenderSlug} from "@/apps/cabinet/constants.ts"
import formatDate from "@/common/utils/formatDate.ts"
import {USE_MOCKS} from "@/common/constants.ts"
import ProfileDataModalComponent
    from "@/apps/cabinet/components/cabinet_main_page/profile_data/ProfileDataModalComponent.vue"
import MedicationTakeModal
    from '@/apps/cabinet/components/cabinet_main_page/profile_data/MedicationTakeModal.vue'
import IndicatorsModalComponent
    from '@/apps/cabinet/components/cabinet_main_page/profile_data/IndicatorsModalComponent.vue'
import IndicatorFormModalComponent
    from '@/apps/cabinet/components/cabinet_main_page/profile_data/IndicatorFormModalComponent.vue'
import {CheckCircleIcon, ExclamationCircleIcon} from '@heroicons/vue/24/outline'

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
    router.push({name: 'login'})
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
    notification.value = {type, text}

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
    postfix: 'год',
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
            class="fixed top-4 right-4 z-[70] max-w-sm rounded-lg border bg-white px-4 py-3 shadow-lg flex items-start gap-3"
            :class="notification.type === 'success' ? 'border-emerald-200 text-emerald-700' : 'border-red-200 text-red-700'"
        >
            <CheckCircleIcon
                v-if="notification.type === 'success'"
                class="w-5 h-5 shrink-0"
            />
            <ExclamationCircleIcon
                v-else
                class="w-5 h-5 shrink-0"
            />
            <span class="text-sm font-medium">{{ notification.text }}</span>
        </div>
    </Transition>

    <div class="w-full p-4 flex flex-col gap-4">

        <div class="flex items-center gap-3">
            <img
                :src="user.image || ''"
                alt="Аватар"
                class="w-20 h-20 rounded-full object-cover"
            />
            <div class="flex flex-col">
                <span class="font-bold text-lg">@{{ user.username }}</span>
                <span class="text-gray-600 text-sm">
                    {{ user.last_name }} {{ user.first_name }}
                </span>
            </div>
        </div>
        <div class="flex-1 bg-blue-500 text-white rounded-xl p-4 flex flex-col justify-between">

            <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                    <span>Пол</span>
                    <span>{{ formattedGender }}</span>
                </div>

                <div class="flex justify-between">
                    <span>Возраст</span>
                    <span>{{ age.value }} {{ age.postfix }}</span>
                </div>

                <div class="flex justify-between">
                    <span>Рост</span>
                    <span v-if="user.height">{{ user.height }} см</span>
                    <span v-else>Не указан</span>
                </div>

                <div class="flex justify-between">
                    <span>Вес</span>
                    <span>{{ userWeight }} кг</span>
                </div>

                <div class="flex justify-between">
                    <span>Дата диагноза</span>
                    <span>{{ formattedDiagnosisDate }}</span>
                </div>
            </div>

        </div>

        <div class="flex flex-col gap-2 mt-auto">
            <button
                @click="switchIndicatorsModal"
                class="w-full bg-green-500 hover:bg-green-400 text-white font-medium rounded-lg py-2 transition shadow-sm hover:cursor-pointer"
            >
                Внести показатели
            </button>

            <button
                @click="isModalOpen = true"
                class="w-full bg-green-500 hover:bg-green-400 text-white font-medium rounded-lg py-2 transition shadow-sm hover:cursor-pointer"
            >
                Принять лекарство
            </button>

            <MedicationTakeModal
                :visible="isModalOpen"
                @close="isModalOpen = false"
                @saved="handleMedicationSaved"
                @error="handleSaveError"
            />

            <button
                @click="switchProfileModal"
                class="w-full bg-orange-500 hover:bg-orange-400 text-white font-medium rounded-lg py-2 transition shadow-sm hover:cursor-pointer"
            >
                Открыть профиль
            </button>
        </div>

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
