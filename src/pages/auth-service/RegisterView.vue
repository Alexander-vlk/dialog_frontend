<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

import FloatingError from '@/components/ui/FloatingError.vue'
import type { NewUser } from '@/types/authTypes.ts'
import { registerUser } from '@/services/auth-service/registerUser.ts'
import { userAuthStore } from '@/stores/user.ts'
import fetchUserData from '@/utils/common/fetchUserData.ts'
import router from '@/router'
import api from '@/services/axios.ts'

import type { DiabetesType, TreatmentType } from '@/types/cabinetTypes.ts'


document.title = 'Регистрация'

const newUser = ref<NewUser>({
    username: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: '',
    patronymicName: '',
    phoneNumber: '',
    email: '',
    gender: '',
    birthDate: '',
    diagnosisDate: '',
    diabetesType: '',
    treatmentType: '',
    imageFile: null,
    remember: false,
    agreedWithPolicy: false,
})
const treatmentTypes = ref<Array<TreatmentType>>([])
const diabetesTypes = ref<Array<DiabetesType>>([])
const errorMessage = ref<string>('')

function setImage(event: Event) {
    const target = event.target as HTMLInputElement;
    newUser.value.imageFile = target.files?.[0] ?? null;
}

function formatPhone(e: Event) {
    // Форматировать телефон
    let x = e?.target.value.replace(/\D/g, '')

    if (x.startsWith('8')) {
        x = '7' + x.slice(1)
    }

    let formatted = '+7';
    if (x.length > 1) formatted += ' (' + x.substring(1, 4)
    if (x.length >= 4) formatted += ') ' + x.substring(4, 7)
    if (x.length >= 7) formatted += '-' + x.substring(7, 9)
    if (x.length >= 9) formatted += '-' + x.substring(9, 11)

    newUser.value.phoneNumber = formatted;
}

async function getTreatmentTypes() {
    // Получить типы лечения
    const response = await api.get('cabinet/public/treatment-types/')
    treatmentTypes.value = response.data
}

async function getDiabetesTypes() {
    // Получить типы диабета
    const response = await api.get('cabinet/public/diabetes-types/')
    diabetesTypes.value = response.data
}

const sendNewUserData = async () => {
    // Отправить данные нового пользователя
    let accessToken = undefined
    try {
        const response = await registerUser(newUser.value)
        accessToken = response.data.access
    }
    catch (error) {
        if (!axios.isAxiosError(error)) {
            console.error(error)
            return
        }
        errorMessage.value = error.response.data
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

onMounted(async () => {
    await getDiabetesTypes()
    await getTreatmentTypes()
})
</script>

<template>
    <div class="flex justify-center items-center min-h-[80lvh] my-5">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-5xl">
            <h2 class="text-2xl font-bold text-primary mb-6">Регистрация</h2>
            <form
                class="space-y-4 md:grid grid-cols-2 md:gap-5"
                @submit.prevent="sendNewUserData"
                type="multipart/form-data"
            >
                <div>
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700">Имя пользователя <span class="text-red-700">*</span></label>
                        <input
                            v-model="newUser.username"
                            placeholder="krutoy_bober"
                            type="text"
                            id="username"
                            required
                            autofocus
                            class="w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label for="password1" class="block text-sm font-medium text-gray-700">Пароль <span class="text-red-700">*</span></label>
                        <input
                            v-model="newUser.password1"
                            type="password"
                            id="password1"
                            required
                            class="w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label for="password2" class="block text-sm font-medium text-gray-700">Повторите пароль <span class="text-red-700">*</span></label>
                        <input
                            v-model="newUser.password2"
                            type="password"
                            id="password2"
                            required
                            class="w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email <span class="text-red-700">*</span></label>
                        <input
                            v-model="newUser.email"
                            placeholder="star_butterfly@mail.ru"
                            type="email"
                            id="email"
                            required
                            class="w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Телефон <span class="text-red-700">*</span></label>
                        <input
                            v-model="newUser.phoneNumber"
                            @input="formatPhone"
                            inputmode="numeric"
                            pattern="[0-9]*"
                            placeholder="+7 (___) ___-__-__"
                            type="tel"
                            id="phoneNumber"
                            required
                            class="w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label for="gender" class="block text-sm font-medium text-gray-700">Пол <span class="text-red-700">*</span></label>
                        <select
                            v-model="newUser.gender"
                            id="gender"
                            required
                            class="w-full h-12 px-4 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="">Выберите</option>
                            <option value="MALE">Мужской</option>
                            <option value="FEMALE">Женский</option>
                        </select>
                    </div>
                    <div>
                        <label for="birthDate" class="block text-sm font-medium text-gray-700">Дата рождения <span class="text-red-700">*</span></label>
                        <input
                            v-model="newUser.birthDate"
                            type="date"
                            id="birthDate"
                            required
                            class="w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label for="last_name" class="block text-sm font-medium text-gray-700">Фамилия <span class="text-red-700">*</span></label>
                        <input
                            v-model="newUser.last_name"
                            placeholder="Иванов"
                            type="text"
                            id="last_name"
                            required
                            class="w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label for="first_name" class="block text-sm font-medium text-gray-700">Имя <span class="text-red-700">*</span></label>
                        <input
                            v-model="newUser.first_name"
                            placeholder="Иван"
                            type="text"
                            id="first_name"
                            required
                            class="w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label for="patronymicName" class="block text-sm font-medium text-gray-700">Отчество <span class="text-red-700">*</span></label>
                        <input
                            v-model="newUser.patronymicName"
                            placeholder="Иваныч"
                            type="text"
                            id="patronymicName"
                            class="w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label for="diagnosisDate" class="block text-sm font-medium text-gray-700">Дата диагноза</label>
                        <input
                            v-model="newUser.diagnosisDate"
                            type="date"
                            id="diagnosisDate"
                            required
                            class="w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label for="diabetesType" class="block text-sm font-medium text-gray-700">Тип диабета</label>
                        <select
                            v-model="newUser.diabetesType"
                            id="diabetesType"
                            required
                            class="w-full h-12 px-4 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="">Не указывать</option>
                            <option
                                v-for="(diabetesType, index) in diabetesTypes"
                                :key="index"
                                :value="diabetesType.slug"
                            >
                                {{ diabetesType.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="treatmentType" class="block text-sm font-medium text-gray-700">Тип лечения</label>
                        <select
                            v-model="newUser.treatmentType"
                            id="treatmentType"
                            required
                            class="w-full h-12 px-4 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="">Не указывать</option>
                            <option
                                v-for="(treatmentType, index) in treatmentTypes"
                                :key="index"
                                :value="treatmentType.slug"
                            >
                                {{ treatmentType.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="profile-image" class="block text-sm font-medium text-gray-700">
                            Фото профиля
                        </label>
                        <input
                            @change="setImage"
                            type="file"
                            name="profile-image"
                            id="profile-image"
                            class="w-full h-12 px-4 py-2 text-sm rounded-lg cursor-pointer text-blue-700
                               file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                               file:text-sm file:font-semibold file:bg-blue-200 file:text-blue-800
                               hover:file:bg-blue-300 hover:file:cursor-pointer"
                        >
                    </div>
                </div>
                <div>
                    <div class="flex items-center text-sm">
                        <label class="flex items-center hover:cursor-pointer">
                            <input type="checkbox" v-model="newUser.remember" class="mr-2" />
                            Запомнить меня
                        </label>
                    </div>
                    <div class="flex items-center text-sm mb-2">
                        <label class="flex items-center hover:cursor-pointer">
                            <input type="checkbox" v-model="newUser.agreedWithPolicy" class="mr-2" />
                            Согласен с&nbsp;
                            <RouterLink
                                :to="{ name: 'privacyPolicy'}"
                                class="hover:underline text-blue-500"
                            >
                                политикой конфиденциальности
                            </RouterLink>
                        </label>
                    </div>
                    <button
                        type="submit"
                        class="w-full bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 cursor-pointer transition"
                    >
                        Зарегистрироваться
                    </button>
                    <p class="text-center text-sm text-gray-600 mt-4">
                        Уже есть аккаунт?
                        <RouterLink
                            :to="{ name: 'login' }"
                            class="text-primary hover:text-secondary underline hover:text-blue-700"
                        >
                            Войти
                        </RouterLink>
                    </p>
                </div>
            </form>
        </div>
    </div>
    <FloatingError :message="errorMessage" />
</template>

<style scoped>

</style>
