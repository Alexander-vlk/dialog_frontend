<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'

import {
    ALREADY_AUTHENTICATED,
    AUTHORIZATION_ERROR_MESSAGE,
    UNKNOWN_ERROR_MESSAGE,
} from '@/constants/errorMessages.ts'
import {STATUS_CODES} from "@/constants/statusCodes.ts";
import api from '@/plugins/axios/axios.ts'
import FloatingError from "@/components/common/errors/FloatingError.vue"

import type {UserLoginCredentials} from "@/types/authTypes.ts"
import axios from 'axios'
import { userAuthStore } from '@/stores/user.ts'
import fetchUserData from '@/utils/common/fetchUserData.ts'


document.title = 'Авторизация'

const credentials = ref<UserLoginCredentials>({
    username: '',
    password: '',
    remember: false,
})

const errorMessage = ref('')

const sendCredentials = async () => {
    errorMessage.value = ''

    let accessToken = undefined
    try {
        const response = await api.post(
            'auth_service/token/',
            credentials.value,
        )
        accessToken = response.data.access
    }
    catch (error: unknown) {
        if (!axios.isAxiosError(error)) {
            errorMessage.value = UNKNOWN_ERROR_MESSAGE
            console.error(error)
            return
        }

        if (!error.response) {
            errorMessage.value = UNKNOWN_ERROR_MESSAGE
            return
        }
        if (error.response.status === STATUS_CODES.UNAUTHORIZED) {
            errorMessage.value = AUTHORIZATION_ERROR_MESSAGE
            return
        }
        if (error.response.status === STATUS_CODES.BAD_REQUEST) {
            errorMessage.value = ALREADY_AUTHENTICATED
            return
        }
    }
    if (!accessToken) {
        console.error('Unable to set access token. Try again later.')
        return
    }

    const userStore = userAuthStore()
    userStore.setAccessToken(accessToken)

    const userData = await fetchUserData()
    if (!userData) {
        console.error('Unable to set user data. Try again later.')
        return
    }
    userStore.setUser(userData)

    await router.push({name: 'profile'})
}
</script>

<template>
    <div class="flex justify-center items-center min-h-[80dvh]">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold text-primary text-center mb-6">Вход в аккаунт</h2>

            <form class="space-y-4" @submit.prevent="sendCredentials">
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-700">Имя пользователя</label>
                    <input
                        v-model="credentials.username"
                        type="text"
                        id="username"
                        name="username"
                        required
                        autofocus
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Пароль</label>
                    <input
                        v-model="credentials.password"
                        type="password"
                        id="password"
                        name="password"
                        required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                </div>

                <div class="flex justify-between items-center text-sm">
                    <label class="flex items-center hover:cursor-pointer">
                        <input type="checkbox" name="remember" class="mr-2" v-model="credentials.remember">
                        Запомнить меня
                    </label>
                    <a href="#" class="text-primary hover:text-secondary underline hover:text-blue-700">Забыли пароль?</a>
                </div>

                <button type="submit" class="w-full bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 cursor-pointer transition">
                    Войти
                </button>
            </form>

            <p class="text-center text-sm text-gray-600 mt-4">
                Нет аккаунта? <a href="/register/" class="text-primary hover:text-secondary underline hover:text-blue-700">Зарегистрироваться</a>
            </p>
        </div>
    </div>
    <FloatingError :message="errorMessage" />
</template>

<style scoped>

</style>
