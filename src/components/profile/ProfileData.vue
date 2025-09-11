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
    <table class="table-auto border-collapse border border-gray-300 w-full text-left mt-4">
        <tbody>
        <tr>
            <td class="border border-gray-300 bg-gray-100 px-2 py-2 font-medium">Пол</td>
            <td class="border border-gray-300 px-2 py-2">{{ userGender[user?.gender] }}</td>
        </tr>
        <tr>
            <td class="border border-gray-300 bg-gray-100 px-2 py-2 font-medium">Дата рождения</td>
            <td class="border border-gray-300 px-2 py-2">
                {{ formatDate(user?.birth_date) }}
                ({{ getUserAge(user.birth_date) }} лет)
            </td>
        </tr>
        <tr>
            <td class="border border-gray-300 bg-gray-100 px-2 py-2 font-medium">Вес</td>
            <td class="border border-gray-300 px-2 py-2">
                75 кг
                <ToDo todo-text="Вычислять поле из последнего недельного отчета, где заполнен вес, и отправлять через апи" />
            </td>
        </tr>
        <tr>
            <td class="border border-gray-300 bg-gray-100 px-2 py-2 font-medium">Рост</td>
            <td class="border border-gray-300 px-2 py-2">
                182 см
                <ToDo todo-text="Добавить на беке поле в модель и в сериализаторы и в апи и отображать тут" />
            </td>
        </tr>
        <tr>
            <td class="border border-gray-300 bg-gray-100 px-2 py-2 font-medium">Тип диабета</td>
            <td class="border border-gray-300 px-2 py-2">
                1 типа {{ user?.diabetesType }}
                <ToDo todo-text="Передавать тип диабета с бекенда" />
            </td>
        </tr>
        </tbody>
    </table>
    <div>
        <button
            @click="() => showModal = true"
            class="w-full mt-2 text-white bg-blue-500 py-1 rounded-xl shadow cursor-pointer hover:bg-blue-700 transition"
        >
            Показать все
        </button>
    </div>
    <div
        class="mt-4 flex gap-2 flex-wrap items-center"
    >
        <RouterButton buttonText="Сменить пароль" routeName="main" />
    </div>
    <ProfileDataModal
        :isOpenModal="showModal"
        @close="closeModal"
    />
</template>

<style scoped>

</style>
