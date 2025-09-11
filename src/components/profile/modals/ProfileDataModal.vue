<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'
import RouterButton from '@/components/ui/RouterButton.vue'
import { storeToRefs } from 'pinia'
import { userAuthStore } from '@/stores/user.ts'
import { ref } from 'vue'
import ToDo from '@/components/dev/ToDo.vue'


const { user } = storeToRefs(userAuthStore())

const imageUrl = ref(`https://${window.location.hostname}${user.value.image_url}`)

defineProps<{
    isOpenModal: boolean
}>()
</script>

<template>
<div
    v-if="isOpenModal"
    id="modal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-10"
>
    <div
        class="bg-white rounded-xl shadow w-full max-w-5xl p-4"
    >
        <div
            class="flex items-center justify-between mb-2"
        >
            <h2 class="text-xl font-bold">Профиль</h2>
            <ToDo todoText="Доделать эту всплывашку" />
            <button
                @click="$emit('close')"
                class="hover:border hover:border-gray-200 hover:cursor-pointer rounded-xl p-2"
            >
                <XMarkIcon class="w-6 h-6" />
            </button>
        </div>
        <div
            class="md:grid md:grid-cols-3"
        >
            <div
                class="col-span-1"
            >
                <img
                    v-if="imageUrl"
                    :src="imageUrl"
                    :alt="user.username"
                    class="w-64 h-64 border border-blue-100 rounded-xl shadow"
                >
                <div
                    v-else
                    class="w-16 h-16 rounded-full object-cover border block"
                >
                </div>
                <p
                    class="text-xl font-bold text-gray-600"
                >
                    {{ user?.last_name }} {{ user?.first_name }} {{ user?.patronymic_name }}
                </p>
                <p
                    class="text-md font-bold text-gray-500"
                >
                    @{{ user?.username }}
                </p>
                <p
                    class="text-md text-gray-600"
                >
                    {{ user?.email }}
                </p>
                <p
                    class="text-md text-gray-600"
                >
                    {{ user?.phone_number }}
                </p>
            </div>
        </div>
        <RouterButton buttonText="Изменить" routeName="main" />
    </div>
</div>
</template>

<style scoped>
#modal {
    background-color: rgba(0, 0, 0, .1);
}
</style>
