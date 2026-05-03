<script setup lang="ts">
import {userAuthStore} from "@/common/stores/user.ts"
import {computed, ref, type Ref} from "vue"
import type {AppUser} from "@/apps/auth_service/types.ts"
import router from "@/router.ts"
import {readableGenderByGenderSlug} from "@/apps/cabinet/constants.ts"
import formatDate from "@/common/utils/formatDate.ts"
import {USE_MOCKS} from "@/common/constants.ts"
import ProfileDataModalComponent
    from "@/apps/cabinet/components/cabinet_main_page/ProfileDataModalComponent.vue"

const userStore = userAuthStore()

if (!userStore.user) {
    router.push({name: 'login'})
    throw new Error('User not authenticated')
}

const user: Ref<AppUser> = ref(userStore.user)
const userWeight = ref(getUserWeight())
const isProfileModalVisible = ref(false)

function getUserWeight(): number {
    if (USE_MOCKS) return 70
    return 0
}

function switchProfileModal() {
    isProfileModalVisible.value = !isProfileModalVisible.value
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
                class="w-full bg-green-500 hover:bg-green-400 text-white font-medium rounded-lg py-2 transition shadow-sm hover:cursor-pointer"
            >
                Внести показатели
            </button>

            <button
                class="w-full bg-green-500 hover:bg-green-400 text-white font-medium rounded-lg py-2 transition shadow-sm hover:cursor-pointer"
            >
                Принять лекарство
            </button>

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
</template>

<style scoped>
</style>
