<script setup lang="ts">
import {defineProps, defineEmits, computed, onMounted, onUnmounted, watch, type Ref, ref} from 'vue'
import {ArrowLeftIcon, PencilIcon} from '@heroicons/vue/24/solid'
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
    return formatRussianPhone(user.value.phoneNumber)
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
        class="fixed inset-0 z-50 flex items-center justify-center modal-overlay backdrop-blur-sm bg-white/30"
        @click="onBackgroundClick"
    >
        <div
            class="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 flex flex-col gap-4 relative">
            <div class="flex gap-3 items-end justify-between">
                <h2 class="text-xl font-bold">
                    Профиль
                </h2>
                <RouterLink
                    :to="{name: 'edit_profile'}"
                    class="flex items-center text-blue-500 hover:text-blue-700 font-medium mt-4"
                >
                    <PencilIcon class="w-5 h-5"/>
                    Редактировать
                </RouterLink>
            </div>
            <div class="flex items-center gap-4">
                <img
                    :src="user.imageUrl || ''"
                    alt="Аватар"
                    class="w-28 h-28 rounded-full object-cover"
                />
                <div class="flex flex-col">
                    <span class="font-bold text-lg">@{{ user.username }}</span>
                    <span class="text-gray-600 text-md">
                        {{ user.last_name }} {{ user.first_name }} {{ user.patronymic_name }}
                    </span>

                    <div>
                        <span class="text-gray-600 text-md">
                            {{ user.email }}
                        </span>
                        <span> | </span>
                        <span class="text-gray-600 text-sm">
                            {{ formattedPhoneNumber }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="bg-blue-500 text-white rounded-lg p-4 flex flex-col gap-2">
                <p>Здесь будет информация о пользователе...</p>
            </div>
            <div
                class="mt-4 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3">
                <button
                    @click="closeModal"
                    class="flex items-center justify-center gap-2 text-blue-500 hover:text-blue-700 font-medium hover:cursor-pointer w-full md:w-auto"
                >
                    <ArrowLeftIcon class="w-5 h-5"/>
                    Назад
                </button>
                <div class="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    <RouterLink
                        :to="{ name: 'change_password' }"
                        class="bg-blue-400 rounded-xl py-2 px-5 text-white shadow hover:bg-blue-700 transition w-full text-center md:w-auto"
                    >
                        Сменить пароль
                    </RouterLink>
                    <RouterLink
                        :to="{ name: 'change_password' }"
                        class="bg-blue-400 rounded-xl py-2 px-5 text-white shadow hover:bg-blue-700 transition w-full text-center md:w-auto"
                    >
                        Усилить защиту профиля
                    </RouterLink>
                    <button
                        @click.prevent="handleLogOut"
                        class="bg-red-400 rounded-xl py-2 px-5 text-white shadow hover:bg-red-700 transition w-full text-center md:w-auto"
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
