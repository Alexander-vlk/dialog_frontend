<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

import api from '@/common/axios.ts'
import HeaderComponent from '@/common/components/ui/HeaderComponent.vue'
import { userAuthStore } from '@/common/stores/user.ts'

interface ProfileForm {
    username: string
    first_name: string
    last_name: string
    patronymic_name: string
    email: string
    phone_number: string
    gender: 'male' | 'female' | ''
    height: number | null
    birth_date: string
    diagnosis_date: string
    password: string
    password_repeat: string
    image: string
}

const router = useRouter()
const userStore = userAuthStore()

const isLoading = ref(false)

const form = reactive<ProfileForm>({
    username: userStore.user?.username ?? '',
    first_name: userStore.user?.first_name ?? '',
    last_name: userStore.user?.last_name ?? '',
    patronymic_name: userStore.user?.patronymic_name ?? '',
    email: userStore.user?.email ?? '',
    phone_number: userStore.user?.phone_number ?? '',
    gender: (userStore.user?.gender as 'male' | 'female' | '') ?? '',
    height: userStore.user?.height ?? null,
    birth_date: userStore.user?.birth_date ?? '',
    diagnosis_date: userStore.user?.diagnosis_date ?? '',
    password: '',
    password_repeat: '',
    image: userStore.user?.image ?? '',
})

const goBack = () => {
    router.back()
}

const canSubmit = computed(() => {
    if (!form.username.trim()) {
        return false
    }

    if (form.password || form.password_repeat) {
        return (
            form.password.length > 0 &&
            form.password === form.password_repeat
        )
    }

    return true
})

const saveProfile = async () => {
    console.log('submit')

    if (!canSubmit.value) {
        return
    }

    if (!userStore.user) {
        console.error('User not found')
        return
    }

    console.log('test')
    console.log(userStore.user)

    isLoading.value = true

    try {
        const payload: Record<string, unknown> = {
            username: form.username,
            first_name: form.first_name,
            last_name: form.last_name,
            patronymic_name: form.patronymic_name,
            email: form.email || null,
            phone_number: form.phone_number,
            gender: form.gender || null,
            height: form.height,
            birth_date: form.birth_date || null,
            diagnosis_date: form.diagnosis_date || null,
            image: form.image,
        }

        if (form.password) {
            payload.password = form.password
            payload.password_repeat = form.password_repeat
        }

        console.log('sending', payload)

        const { data } = await api.put(
            `/api/cabinet/update_users/${userStore.user.id}/`,
            payload,
        )

        userStore.setUser({
            ...userStore.user,
            ...data,
        })
        form.password = ''
        form.password_repeat = ''

        console.log('saved')
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <HeaderComponent />

    <div class="flex justify-center px-4 py-8">
        <div class="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-2xl font-bold text-gray-800">
                    Редактирование профиля
                </h1>

                <button
                    type="button"
                    @click="goBack"
                    class="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-lg
                        border
                        border-slate-200
                        text-slate-700
                        hover:bg-slate-50
                        transition
                        cursor-pointer
                    "
                >
                    <ArrowLeftIcon class="w-5 h-5" />
                    <span>Назад</span>
                </button>
            </div>

            <form
                class="grid grid-cols-1 md:grid-cols-2 gap-4"
                @submit.prevent="saveProfile"
            >
                <input
                    v-model="form.username"
                    type="text"
                    placeholder="Имя пользователя *"
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                />

                <input
                    v-model="form.email"
                    type="email"
                    placeholder="E-mail"
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                />

                <input
                    v-model="form.first_name"
                    type="text"
                    placeholder="Имя"
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                />

                <input
                    v-model="form.last_name"
                    type="text"
                    placeholder="Фамилия"
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                />

                <input
                    v-model="form.patronymic_name"
                    type="text"
                    placeholder="Отчество"
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                />

                <input
                    v-model="form.phone_number"
                    type="tel"
                    placeholder="Телефон"
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                />

                <select
                    v-model="form.gender"
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                >
                    <option value="">
                        Пол не указан
                    </option>

                    <option value="male">
                        Мужской
                    </option>

                    <option value="female">
                        Женский
                    </option>
                </select>

                <input
                    v-model.number="form.height"
                    type="number"
                    min="0"
                    placeholder="Рост (см)"
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                />

                <div>
                    <label class="block text-sm text-gray-600 mb-1">
                        Дата рождения
                    </label>

                    <input
                        v-model="form.birth_date"
                        type="date"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                    />
                </div>

                <div>
                    <label class="block text-sm text-gray-600 mb-1">
                        Дата постановки диагноза
                    </label>

                    <input
                        v-model="form.diagnosis_date"
                        type="date"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                    />
                </div>

                <div class="md:col-span-2 pt-2">
                    <button
                        type="submit"
                        :disabled="!canSubmit || isLoading"
                        class="w-full text-white py-2 rounded-lg font-semibold transition"
                        :class="
                            (!canSubmit || isLoading)
                                ? 'bg-gray-200 cursor-not-allowed'
                                : 'bg-blue-700 hover:bg-blue-800 cursor-pointer'
                        "
                    >
                        {{
                            isLoading
                                ? 'Сохранение...'
                                : 'Сохранить изменения'
                        }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
