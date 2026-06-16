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
    if (!canSubmit.value) {
        return
    }

    if (!userStore.user) {
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
            email: form.email || '',
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

    <div class="min-h-screen  px-4 py-4 md:px-6 md:py-8">
        <div class="mx-auto w-full max-w-4xl">
            <div class="
                bg-white
                md:rounded-2xl md:shadow-lg
                p-4 md:p-6
            ">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <h1 class="text-xl md:text-2xl font-bold text-gray-800">
                        Редактирование профиля
                    </h1>

                    <button
                        type="button"
                        @click="goBack"
                        class="
                            flex items-center justify-center gap-2
                            px-4 py-2.5 md:py-2
                            rounded-lg
                            border border-slate-200
                            text-slate-700
                            active:bg-slate-100
                            hover:bg-slate-50
                            transition
                            cursor-pointer
                            touch-manipulation
                            w-full sm:w-auto
                        "
                    >
                        <ArrowLeftIcon class="w-5 h-5" />
                        <span>Назад</span>
                    </button>
                </div>

                <!-- Форма: мобильная версия - одна колонка, десктоп - сетка -->
                <form
                    class="
                        grid grid-cols-1
                        md:grid-cols-2
                        gap-3 md:gap-4
                    "
                    @submit.prevent="saveProfile"
                >
                    <!-- Поля ввода: на мобильных увеличенные отступы для удобства касания -->
                    <input
                        v-model="form.username"
                        type="text"
                        placeholder="Имя пользователя *"
                        class="
                            w-full
                            px-4 py-3 md:py-2
                            border border-gray-300
                            rounded-lg
                            text-base md:text-sm
                            focus:outline-none
                            focus:ring-2 focus:ring-blue-700
                            focus:border-blue-700
                            transition
                            touch-manipulation
                        "
                    />

                    <input
                        v-model="form.email"
                        type="email"
                        placeholder="E-mail"
                        class="
                            w-full
                            px-4 py-3 md:py-2
                            border border-gray-300
                            rounded-lg
                            text-base md:text-sm
                            focus:outline-none
                            focus:ring-2 focus:ring-blue-700
                            focus:border-blue-700
                            transition
                            touch-manipulation
                        "
                    />

                    <input
                        v-model="form.first_name"
                        type="text"
                        placeholder="Имя"
                        class="
                            w-full
                            px-4 py-3 md:py-2
                            border border-gray-300
                            rounded-lg
                            text-base md:text-sm
                            focus:outline-none
                            focus:ring-2 focus:ring-blue-700
                            focus:border-blue-700
                            transition
                            touch-manipulation
                        "
                    />

                    <input
                        v-model="form.last_name"
                        type="text"
                        placeholder="Фамилия"
                        class="
                            w-full
                            px-4 py-3 md:py-2
                            border border-gray-300
                            rounded-lg
                            text-base md:text-sm
                            focus:outline-none
                            focus:ring-2 focus:ring-blue-700
                            focus:border-blue-700
                            transition
                            touch-manipulation
                        "
                    />

                    <input
                        v-model="form.patronymic_name"
                        type="text"
                        placeholder="Отчество"
                        class="
                            w-full
                            px-4 py-3 md:py-2
                            border border-gray-300
                            rounded-lg
                            text-base md:text-sm
                            focus:outline-none
                            focus:ring-2 focus:ring-blue-700
                            focus:border-blue-700
                            transition
                            touch-manipulation
                        "
                    />

                    <input
                        v-model="form.phone_number"
                        type="tel"
                        placeholder="Телефон"
                        class="
                            w-full
                            px-4 py-3 md:py-2
                            border border-gray-300
                            rounded-lg
                            text-base md:text-sm
                            focus:outline-none
                            focus:ring-2 focus:ring-blue-700
                            focus:border-blue-700
                            transition
                            touch-manipulation
                        "
                    />

                    <select
                        v-model="form.gender"
                        class="
                            w-full
                            px-4 py-3 md:py-2
                            border border-gray-300
                            rounded-lg
                            text-base md:text-sm
                            bg-white
                            focus:outline-none
                            focus:ring-2 focus:ring-blue-700
                            focus:border-blue-700
                            transition
                            touch-manipulation
                            appearance-none
                            bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')]
                            bg-[length:20px]
                            bg-no-repeat
                            bg-[right_12px_center]
                            pr-10
                        "
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
                        class="
                            w-full
                            px-4 py-3 md:py-2
                            border border-gray-300
                            rounded-lg
                            text-base md:text-sm
                            focus:outline-none
                            focus:ring-2 focus:ring-blue-700
                            focus:border-blue-700
                            transition
                            touch-manipulation
                        "
                    />

                    <!-- Дата: на мобильных подписи над полем для лучшей читаемости -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">
                            Дата рождения
                        </label>

                        <input
                            v-model="form.birth_date"
                            type="date"
                            class="
                                w-full
                                px-4 py-3 md:py-2
                                border border-gray-300
                                rounded-lg
                                text-base md:text-sm
                                focus:outline-none
                                focus:ring-2 focus:ring-blue-700
                                focus:border-blue-700
                                transition
                                touch-manipulation
                                min-h-[44px] md:min-h-[40px]
                            "
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">
                            Дата постановки диагноза
                        </label>

                        <input
                            v-model="form.diagnosis_date"
                            type="date"
                            class="
                                w-full
                                px-4 py-3 md:py-2
                                border border-gray-300
                                rounded-lg
                                text-base md:text-sm
                                focus:outline-none
                                focus:ring-2 focus:ring-blue-700
                                focus:border-blue-700
                                transition
                                touch-manipulation
                                min-h-[44px] md:min-h-[40px]
                            "
                        />
                    </div>

                    <!-- Кнопка сохранения: занимает всю ширину, увеличенная для касания -->
                    <div class="md:col-span-2 pt-2">
                        <button
                            type="submit"
                            :disabled="!canSubmit || isLoading"
                            class="
                                w-full
                                py-3.5 md:py-2.5
                                rounded-lg
                                font-semibold
                                text-base md:text-sm
                                transition
                                touch-manipulation
                                min-h-[48px] md:min-h-[44px]
                            "
                            :class="
                                (!canSubmit || isLoading)
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900 cursor-pointer'
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
    </div>
</template>
