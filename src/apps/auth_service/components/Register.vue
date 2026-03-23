<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const passwordRepeat = ref('')
const accepted = ref(false)

const handleRegister = () => {
    if (password.value !== passwordRepeat.value) {
        return
    }
    // todo: запрос на бек
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center px-4">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 relative">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Регистрация</h2>

            <form @submit.prevent="handleRegister" class="space-y-4">
                <div>
                    <input
                        v-model="username"
                        type="text"
                        required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                        placeholder="Имя пользователя"
                    />
                </div>

                <div>
                    <input
                        v-model="password"
                        type="password"
                        required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                        placeholder="Пароль"
                    />
                </div>

                <div>
                    <input
                        v-model="passwordRepeat"
                        type="password"
                        required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                        placeholder="Пароль (ещё раз)"
                    />
                </div>

                <div class="flex items-center gap-2">
                    <input
                        id="policy"
                        v-model="accepted"
                        type="checkbox"
                        required
                        class="h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-700"
                    />
                    <label for="policy" class="text-sm text-gray-700 cursor-pointer">
                        Согласен с политикой конфиденциальности
                    </label>
                </div>

                <button
                    type="submit"
                    class="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition cursor-pointer"
                >
                    Создать аккаунт
                </button>
            </form>

            <p class="text-sm text-center text-gray-600 mt-4">
                Уже есть аккаунт?
                <RouterLink :to="{name: 'login'}" class="text-blue-700 font-medium hover:underline">Войти</RouterLink>
            </p>
        </div>
    </div>
</template>

<style scoped>
</style>
