<script setup lang="ts">
import {computed, ref} from 'vue'

const username = ref('')
const remember = ref(false)
const password = ref('')

const canLogIn = computed(() => {
    return username.value && password.value
})

const handleLogin = () => {
    console.log('Login:', {
        username: username.value,
        remember: remember.value,
        password: password.value,
    })
    // todo: запрос на бек

}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center px-4">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Войти</h2>

            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <input
                        v-model="username"
                        type="text"
                        required
                        autofocus
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                        placeholder="Имя пользователя"
                    />
                </div>

                <div>
                    <input
                        v-model="password"
                        type="password"
                        required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                        placeholder="Введите пароль"
                    />
                </div>

                <div class="flex items-center gap-2">
                    <input
                        id="policy"
                        v-model="remember"
                        type="checkbox"
                        required
                        class="h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-700"
                    />
                    <label for="policy" class="text-sm text-gray-700 cursor-pointer">
                        Запомнить меня
                    </label>
                </div>

                <button
                    type="submit"
                    class="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                    :disabled="!canLogIn"
                    :class="!canLogIn ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 cursor-pointer'"
                >
                    Войти
                </button>
            </form>

            <p class="text-sm text-center text-gray-600 mt-4">
                Нет аккаунта?
                <RouterLink :to="{name: 'register'}" class="text-blue-700 font-medium hover:underline">Регистрация</RouterLink>
            </p>
        </div>
    </div>
</template>

<style scoped>

</style>
