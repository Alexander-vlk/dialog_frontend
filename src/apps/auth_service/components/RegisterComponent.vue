<script setup>
import {computed, ref} from 'vue'
import {EyeIcon, EyeSlashIcon} from '@heroicons/vue/24/outline'

const username = ref('')
const password = ref('')
const passwordRepeat = ref('')
const accepted = ref(false)
const showPassword = ref(false)

const canCreateAccount = computed(() => {
    return username.value && password.value && passwordRepeat.value && accepted.value
})

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
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
                Создать аккаунт
            </h2>

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
</style>
