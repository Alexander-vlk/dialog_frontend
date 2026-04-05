<script setup lang="ts">
import {userAuthStore} from "@/common/stores/user.ts";
import {computed, ref, type Ref} from "vue";
import type {AppUser} from "@/apps/auth_service/types.ts";
import router from "@/router.ts";
import {readableGenderByGenderSlug} from "@/apps/cabinet/constants.ts";
import formatDate from "@/common/utils/formatDate.ts";
import {USE_MOCKS} from "@/common/constants.ts";
import ProfileDataModalComponent
    from "@/apps/cabinet/components/cabinet_main_page/ProfileDataModalComponent.vue";

const userStore = userAuthStore()
if (!userStore.user) {
    router.push({name: 'login'})
    throw new Error('User not authenticated')
}
const user: Ref<AppUser> = ref(userStore.user)
const userWeight: Ref<number> = ref(getUserWeight(user.value))
const userDiabetesType: Ref<string> = ref(getUserDiabetesType(user.value))
const userTreatmentType: Ref<string> = ref(getUserTreatmentType(user.value))
const isProfileModalVisible: Ref<boolean> = ref(false)
function getUserWeight(user: AppUser): number {
    if (USE_MOCKS) {
        return 70
    }
    // TODO: делать запрос на бэк
    return 0
}

function getUserDiabetesType(user: AppUser): string {
    /*Получить тип диабета пользователя*/
    if (USE_MOCKS) {
        return '1 типа'
    }
    // TODO: делать запрос на бек
    return ''
}

function getUserTreatmentType(user: AppUser): string {
    /*Получить тип лечения пользователя*/
    if (USE_MOCKS) {
        return 'Инсулинотерапия'
    }
    // TODO: делать запрос на бек
    return ''
}

function switchProfileModal() {
    /* Показать модальное окно профиля */
    isProfileModalVisible.value = !isProfileModalVisible.value
}

const formattedGender = computed(() => {
    /*Форматированный пол*/
    return readableGenderByGenderSlug[user.value.gender]
})
const age = computed(() => {
    /*Форматированная дата рождения*/
    // todo: переделать
    return {
        value: 1,
        postfix: 'год',
    }
})
const formattedDiagnosisDate = computed(() => {
    /*Форматированная дата постановки диагноза*/
    const diagnosisDate = user.value.diagnosisDate
    if (!diagnosisDate) {
        return 'Не указан'
    }
    return formatDate(diagnosisDate)
})
</script>

<template>
    <div class="w-full mx-auto p-4 flex flex-col gap-3">
        <div class="flex items-center gap-2">
            <img
                :src="user.imageUrl || ''"
                alt="Аватар"
                class="w-20 h-20 rounded-full object-cover"
            />
            <div class="flex flex-col">
                <span class="font-bold text-lg">@{{ user.username }}</span>
                <span class="text-gray-600 text-sm">
                    {{ user?.last_name }}
                    {{ user?.first_name }}
                </span>
            </div>
        </div>

        <div class="bg-blue-500 text-white rounded-lg p-4 flex flex-col gap-2">
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
                <span>Тип диабета</span>
                <span>{{ userDiabetesType }}</span>
            </div>
            <div class="flex justify-between">
                <span>Тип лечения</span>
                <span>{{ userTreatmentType }}</span>
            </div>
            <div class="flex justify-between">
                <span>Дата диагноза</span>
                <span>{{ formattedDiagnosisDate }}</span>
            </div>
        </div>
        <div class="flex justify-center">
            <button
                @click="switchProfileModal"
                class="w-full bg-orange-500 hover:bg-orange-400 text-white font-medium py-2 rounded-lg transition hover:cursor-pointer"
            >
                Открыть профиль
            </button>
        </div>

    </div>
    <ProfileDataModalComponent :visible="isProfileModalVisible" @close="switchProfileModal" />
</template>

<style scoped>
</style>
