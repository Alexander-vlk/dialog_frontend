<script setup lang="ts">
import {defineProps, defineEmits, computed} from 'vue'
import {ArrowLeftIcon, PencilIcon} from '@heroicons/vue/24/solid'
import type {AppUser} from "@/apps/auth_service/types.ts";
import formatRussianPhone from "@/common/utils/formatRussianPhone.ts";

const props = defineProps<{
    visible: boolean,
    user: AppUser,
}>()

const user = props.user

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
    return formatRussianPhone(props.user.phoneNumber)
})
</script>

<template>
    <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center modal-overlay backdrop-blur-sm bg-white/30"
        @click="onBackgroundClick"
    >
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 flex flex-col gap-4 relative">
            <div class="flex gap-3 items-end ">
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

            <button
                @click="closeModal"
                class="mt-4 self-start flex items-center gap-2 text-blue-500 hover:text-blue-700 font-medium hover:cursor-pointer"
            >
                <ArrowLeftIcon class="w-5 h-5"/>
                Назад
            </button>
        </div>
    </div>
</template>

<style scoped>
</style>
