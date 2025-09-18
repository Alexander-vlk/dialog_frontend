<script setup lang="ts">
import { userAuthStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import getUserAge from '@/utils/common/getUserAge.ts'
import formatDate from '@/utils/common/formatDate.ts'
import ToDo from '@/components/dev/ToDo.vue'
import RouterButton from '@/components/ui/RouterButton.vue'
import ProfileDataModal from '@/components/profile/modals/ProfileDataModal.vue'
import UserMiniProfile from '@/components/common/user-mini-profile/UserMiniProfile.vue'

const { user } = storeToRefs(userAuthStore())

const showModal = ref(false)

const userGender = {
    MALE: 'Мужской',
    FEMALE: 'Женский',
}

function closeModal(): void {
    // Закрыть меню
    showModal.value = false
}
</script>

<template>
    <UserMiniProfile />
    <div
        class="bg-blue-700 rounded-xl shadow px-4 py-2 my-3"
    >
        <div
            class="flex items-center justify-between text-white"
        >
            <p>
                Пол
            </p>
            <p
                class="text-right"
            >
                {{ userGender[user?.gender] }}
            </p>
        </div>
        <div
            class="flex items-center justify-between text-white"
        >
            <p>
                Дата рождения
            </p>
            <p
                class="text-right"
            >
                {{ formatDate(user?.birth_date) }}
                ({{ getUserAge(user.birth_date) }} лет)
            </p>
        </div>
        <div
            class="flex items-center justify-between text-white"
        >
            <p>
                Тип диабета
            </p>
            <p
                class="text-right"
            >
                {{ user?.diabetesType }}
                <ToDo todo-text="Передавать тип диабета с бекенда" />
            </p>
        </div>
        <div
            class="flex items-center justify-between text-white"
        >
            <p>
                Дата диагноза
            </p>
            <p
                class="text-right"
            >
                {{ formatDate(user?.diagnosis_date) }}
            </p>
        </div>
        <div
            class="flex items-center justify-between text-white"
        >
            <p>
                Тип лечения
            </p>
            <p
                class="text-right"
            >
                {{ userGender[user?.gender] }}
            </p>
        </div>
        <div
            class="flex items-center justify-between text-white"
        >
            <p>
                Рост
            </p>
            <p
                class="text-right"
            >
                182 см
                <ToDo todo-text="Добавить на беке поле в модель и в сериализаторы и в апи и отображать тут" />
            </p>
        </div>
    </div>

    <div
        class="flex text-center mt-4"
    >
        <RouterLink
            :to="{ name: 'profile' }"
            class="w-full bg-orange-500 text-white rounded-xl py-2 shadow hover:bg-orange-700 transition"
        >
            Редактировать профиль
        </RouterLink>
    </div>
    <div
        class="flex text-center mt-2"
    >
        <RouterLink
            :to="{ name: 'profile' }"
            class="w-full bg-orange-500 text-white rounded-xl py-2 shadow hover:bg-orange-700 transition"
        >
            Сменить пароль
        </RouterLink>
    </div>
    <div
        class="flex text-center mt-2"
    >
        <RouterLink
            :to="{ name: 'profile' }"
            class="w-full bg-orange-500 text-white rounded-xl py-2 shadow hover:bg-orange-700 transition"
        >
            Усилить защиту профиля
        </RouterLink>
    </div>
</template>

<style scoped>

</style>
