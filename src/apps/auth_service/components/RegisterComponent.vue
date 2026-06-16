<script setup lang="ts">
import {computed, ref} from 'vue'
import {EyeIcon, EyeSlashIcon} from '@heroicons/vue/24/outline'
import api from '@/common/axios.js'
import type { AppUser } from '@/apps/auth_service/types.js'
import { userAuthStore } from '@/common/stores/user.js'
import router from '@/router.js'

const username = ref('')
const password = ref('')
const passwordRepeat = ref('')
const accepted = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')
const showError = ref(false)

const canCreateAccount = computed(() => {
    return username.value && password.value && passwordRepeat.value && accepted.value
})

const handleRegister = async () => {
    /* Регистрация */
    if (password.value !== passwordRepeat.value) {
        errorMessage.value = 'Пароли не совпадают'
        showError.value = true
        return
    }

    try {
        const response = await api.post(
            '/api/auth_service/users/register',
            {
                username: username.value,
                password: password.value,
                password_repeat: passwordRepeat.value,
            }
        )
        const userData: AppUser = response.data
        const userStore = userAuthStore()
        userStore.setUser(userData)
        userStore.setAccessToken(userData.access_token)
        await router.push({ name: 'cabinet' })
    } catch (error: any) {
        // Обработка ошибок валидации с бэкенда
        if (error.response && error.response.data) {
            const errorData = error.response.data

            // Если бэкенд возвращает объект с полями ошибок
            if (typeof errorData === 'object') {
                // Собираем все сообщения об ошибках в одну строку
                const errorMessages = Object.values(errorData).flat()
                errorMessage.value = errorMessages.join('\n')
            } else {
                errorMessage.value = errorData.message || 'Произошла ошибка при регистрации'
            }
        } else {
            errorMessage.value = 'Не удалось соединиться с сервером'
        }
        showError.value = true
    }
}

const closeError = () => {
    showError.value = false
    errorMessage.value = ''
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center px-4">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 relative">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
                Создать аккаунт
            </h2>

            <!-- Всплывашка с ошибкой (прозрачный фон) -->
            <div
                v-if="showError"
                class="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
                <div class="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 pointer-events-auto">
                    <div class="flex items-start gap-3">
                        <div class="flex-shrink-0">
                            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-lg font-semibold text-gray-900">Ошибка валидации</h3>
                            <div class="mt-1 text-sm text-gray-600 whitespace-pre-line">
                                {{ errorMessage }}
                            </div>
                        </div>
                        <button
                            @click="closeError"
                            class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div class="mt-4 flex justify-end">
                        <button
                            @click="closeError"
                            class="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-medium"
                        >
                            Понятно
                        </button>
                    </div>
                </div>
            </div>

            <form @submit.prevent="handleRegister" class="space-y-4">
                <div>
                    <input
                        v-model="username"
                        type="text"
                        required
                        autofocus
                        class="
                            w-full
                            px-4
                            py-2
                            border
                            rounded-lg
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-700
                            focus:border-blue-700
                        "
                        placeholder="Имя пользователя"
                    />
                </div>

                <div>
                    <div class="relative">
                        <input
                            v-model="password"
                            :type="showPassword ? 'text' : 'password'"
                            required
                            class="
                                w-full
                                px-4
                                py-2
                                pr-10
                                border
                                rounded-lg
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-700
                                focus:border-blue-700
                            "
                            placeholder="Пароль"
                        />
                        <button
                            tabindex="-1"
                            type="button"
                            @click="showPassword = !showPassword"
                            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <EyeIcon v-if="showPassword" class="w-5 h-5"/>
                            <EyeSlashIcon v-else class="w-5 h-5"/>
                        </button>
                    </div>

                    <div class="relative mt-4">
                        <input
                            v-model="passwordRepeat"
                            :type="showPassword ? 'text' : 'password'"
                            required
                            class="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                            placeholder="Пароль (ещё раз)"
                        />
                    </div>
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
                        Согласен с <span class="underline">политикой конфиденциальности</span>
                        <span class="text-red-700">*</span>
                    </label>
                </div>

                <button
                    type="submit"
                    class="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                    :disabled="!canCreateAccount"
                    :class="!canCreateAccount ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 cursor-pointer'"
                >
                    Создать аккаунт
                </button>
            </form>

            <p class="text-sm text-center text-gray-600 mt-4">
                Уже есть аккаунт?
                <RouterLink :to="{name: 'login'}" class="text-blue-700 font-medium hover:underline">
                    Войти
                </RouterLink>
            </p>
        </div>
    </div>
</template>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-fade-in {
    animation: fadeIn 0.2s ease-out;
}
</style>
