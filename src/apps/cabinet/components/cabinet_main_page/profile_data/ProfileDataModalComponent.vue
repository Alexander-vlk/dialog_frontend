<script setup lang="ts">
import {defineProps, defineEmits, computed, onMounted, onUnmounted, watch, type Ref, ref} from 'vue'
import {ArrowLeftIcon} from '@heroicons/vue/24/solid'
import type {AppUser} from "@/apps/auth_service/types.ts";
import formatRussianPhone from "@/common/utils/formatRussianPhone.ts";
import router from "@/router.ts";
import {userAuthStore} from "@/common/stores/user.ts";
import api from '@/common/axios.ts'

const props = defineProps<{
    visible: boolean,
}>()

const userStore = userAuthStore()
if (!userStore.user) {
    router.push({name: 'login'})
    throw new Error('User not authenticated')
}
const user: Ref<AppUser> = ref(userStore.user)

const emit = defineEmits<{
    (e: 'close'): void
}>()

function closeModal() {
    /*Закрыть модальное окно*/
    emit('close')
}

function onBackgroundClick(e: MouseEvent) {
    /*Закрыть модальное окно при клике вне него*/
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
        closeModal()
    }
}

const formattedPhoneNumber = computed(() => {
    const phone = (user.value as any)?.phone || (user.value as any)?.phone_number || ''
    const formattedPhone = formatRussianPhone(phone)
    if (formattedPhone.length === 1) {
        return null
    }
    return formattedPhone
})

function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && props.visible) {
        closeModal()
    }
}

async function handleLogOut(event: Event) {
    event.preventDefault()
    if (!confirm('Действительно выйти?')) {
        return
    }
    await api.post('/api/auth_service/logout/')
    userStore.logout()
    await router.push({name: 'login'})
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
})

watch(
    () => props.visible,
    (visible) => {
        if (visible) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    },
    {immediate: true}
)
</script>

<template>
    <div
        v-if="visible"
        class="
            fixed inset-0 z-50
            flex items-start md:items-center justify-center
            modal-overlay
            backdrop-blur-sm
            bg-white/30
            p-4
        "
        @click="onBackgroundClick"
    >
        <div
            class="
                bg-white
                rounded-lg
                shadow-lg
                w-full
                max-w-3xl
                flex flex-col
                overflow-y-auto
                max-h-[calc(100vh-4rem)]
            "
        >
            <div
                class="
                    flex items-center justify-between
                    gap-3
                    border-b border-gray-100
                    px-5 py-4
                "
            >
                <div>
                    <h2 class="text-xl font-bold text-gray-900">
                        Профиль
                    </h2>

                    <p class="text-sm text-gray-500 mt-1">
                        Основная информация пользователя
                    </p>
                </div>
                <button
                    type="button"
                    @click="closeModal"
                    class="
                        flex items-center justify-center
                        w-9 h-9
                        rounded-lg
                        text-gray-500
                        hover:bg-gray-100
                        hover:text-gray-700
                        cursor-pointer
                        transition
                    "
                >
                    <ArrowLeftIcon class="w-5 h-5"/>
                </button>
            </div>
            <div class="p-5 md:p-6 flex flex-col gap-6">
                <div class="flex flex-col md:flex-row gap-5">
                    <img
                        :src="user.image || ''"
                        alt="Аватар"
                        class="
                            w-28 h-28
                            rounded-2xl
                            object-cover
                            border border-blue-100
                            shadow-sm
                        "
                    />

                    <div class="flex-1 flex flex-col gap-4">
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">
                                @{{ user.username }}
                            </h3>

                            <p class="text-gray-600 mt-1">
                                {{ user.last_name }}
                                {{ user.first_name }}
                                {{ user.patronymic_name }}
                            </p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div
                                class="
                                    rounded-lg
                                    border border-blue-100
                                    bg-blue-50
                                    px-4 py-3
                                "
                            >
                                <p class="text-xs font-semibold text-gray-500 uppercase">
                                    Email
                                </p>

                                <p class="text-sm text-gray-900 mt-1 break-all">
                                    {{ user.email || 'Не указан' }}
                                </p>
                            </div>
                            <div
                                class="
                                    rounded-lg
                                    border border-blue-100
                                    bg-blue-50
                                    px-4 py-3
                                "
                            >
                                <p class="text-xs font-semibold text-gray-500 uppercase">
                                    Телефон
                                </p>

                                <p class="text-sm text-gray-900 mt-1">
                                    {{ formattedPhoneNumber || 'Не указан' }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div
                        class="
                            rounded-lg
                            border border-gray-200
                            px-4 py-3
                        "
                    >
                        <p class="text-xs font-semibold text-gray-500 uppercase">
                            Город
                        </p>

                        <p class="text-sm text-gray-900 mt-1">
                            {{ user.town?.name || 'Не указан' }}
                        </p>
                    </div>
                    <div
                        class="
                            rounded-lg
                            border border-gray-200
                            px-4 py-3
                        "
                    >
                        <p class="text-xs font-semibold text-gray-500 uppercase">
                            Рост
                        </p>

                        <p class="text-sm text-gray-900 mt-1">
                            {{ user.height ? `${user.height} см` : 'Не указан' }}
                        </p>
                    </div>
                    <div
                        class="
                            rounded-lg
                            border border-gray-200
                            px-4 py-3
                        "
                    >
                        <p class="text-xs font-semibold text-gray-500 uppercase">
                            Дата рождения
                        </p>
                        <p class="text-sm text-gray-900 mt-1">
                            {{ user.birth_date || 'Не указана' }}
                        </p>
                    </div>
                    <div
                        class="
                            rounded-lg
                            border border-gray-200
                            px-4 py-3
                        "
                    >
                        <p class="text-xs font-semibold text-gray-500 uppercase">
                            Дата диагноза
                        </p>
                        <p class="text-sm text-gray-900 mt-1">
                            {{ user.diagnosis_date || 'Не указана' }}
                        </p>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <span class="text-sm font-semibold text-gray-500 uppercase">
                        Сопутствующие заболевания
                    </span>
                    <div
                        v-if="user.diseases?.length"
                        class="flex flex-wrap gap-2"
                    >
                        <span
                            v-for="disease in user.diseases"
                            :key="disease.id"
                            class="
                                px-3 py-2
                                rounded-lg
                                bg-blue-50
                                border border-blue-100
                                text-sm
                                text-blue-700
                                font-medium
                            "
                        >
                            {{ disease.name }}
                        </span>
                    </div>
                    <div
                        v-else
                        class="
                            rounded-lg
                            border border-dashed border-gray-200
                            px-4 py-4
                            text-sm text-gray-500
                        "
                    >
                        Заболевания не указаны
                    </div>
                </div>
            </div>
            <div
                class="
                    px-5 py-4
                    border-t border-gray-100
                    flex flex-col-reverse md:flex-row
                    md:items-center md:justify-between
                    gap-3
                "
            >
                <button
                    type="button"
                    @click="closeModal"
                    class="
                        flex items-center justify-center gap-2
                        text-blue-500
                        hover:text-blue-700
                        font-medium
                        cursor-pointer
                    "
                >
                    <ArrowLeftIcon class="w-5 h-5"/>
                    Назад
                </button>
                <div class="flex flex-col md:flex-row gap-2">
                    <RouterLink
                        :to="{ name: 'edit_profile' }"
                        class="
                            bg-blue-500
                            hover:bg-blue-400
                            text-white
                            px-5 py-2
                            rounded-lg
                            transition
                            text-center
                        "
                    >
                        Редактировать
                    </RouterLink>
                    <RouterLink
                        :to="{ name: 'change_password' }"
                        class="
                            bg-blue-500
                            hover:bg-blue-400
                            text-white
                            px-5 py-2
                            rounded-lg
                            transition
                            text-center
                        "
                    >
                        Сменить пароль
                    </RouterLink>
                    <button
                        disabled
                        class="
                            bg-gray-200
                            text-gray-400
                            px-5 py-2
                            rounded-lg
                            cursor-not-allowed
                        "
                    >
                        Усилить защиту
                    </button>

                    <button
                        @click.prevent="handleLogOut"
                        class="
                            bg-red-500
                            hover:bg-red-400
                            text-white
                            px-5 py-2
                            rounded-lg
                            transition
                        "
                    >
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
