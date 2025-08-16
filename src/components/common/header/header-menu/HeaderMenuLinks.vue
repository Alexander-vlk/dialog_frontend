<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

import api from '@/services/axios.ts'
import { userAuthStore } from '@/stores/user.ts'
import FloatingError from '@/components/ui/FloatingError.vue'


const userStore = userAuthStore()

const errorMessage = ref('')

function logoutUser() {
    errorMessage.value = ''
    if (!confirm('Вы уверены?')) {
        return
    }

    try {
        api.post(
            'auth_service/logout/',
            {},
            {
                headers: {
                    'Authorization': `Bearer ${userStore.accessToken}`
                }
            }
        )
    }
    catch (error: unknown) {
        if (!axios.isAxiosError(error)) {
            console.error(error)
            return
        }
        errorMessage.value = 'Ошибка!'
    }
    userStore.logout()
}
</script>

<template>
<nav>
    <ul>
        <li>
            <RouterLink
                :to="{ name: 'main' }"
                class="text-xl hover:underline"
                v-slot="{ isActive }"
            >
                <span :class="{ 'text-blue-500 hover:underline' : isActive }">
                    Главная
                </span>
            </RouterLink>
        </li>
        <li>
            <RouterLink
                :to="{ name: 'profile' }"
                class="text-xl hover:underline"
                v-slot="{ isActive }"
            >
                <span :class="{ 'text-blue-500 hover:underline' : isActive }">
                    Личный кабинет
                </span>
            </RouterLink>
        </li>
        <li>
            <a href="" class="text-xl hover:underline">Форум</a>
        </li>
        <li>
            <a href="" class="text-xl hover:underline">Семейный доступ</a>
        </li>
        <li>
            <a href="" class="text-xl hover:underline">О нас</a>
        </li>
        <li>
            <a href="" class="text-xl hover:underline">Отзывы</a>
        </li>
        <li>
            <a href="" class="text-xl hover:underline">База знаний</a>
        </li>
        <li>
            <a href="" class="text-xl hover:underline">Политика конфиденциальности</a>
        </li>
        <li>
            <a href="" class="text-xl hover:underline">FAQ</a>
        </li>
        <li v-if="userStore.isAuthenticated">
            <button @click="logoutUser" class="text-xl text-red-700 hover:underline cursor-pointer">Выйти</button>
        </li>
    </ul>
    <FloatingError :message="errorMessage" />
</nav>
</template>

<style scoped>

</style>
