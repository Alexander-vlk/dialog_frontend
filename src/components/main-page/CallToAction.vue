<script setup lang="ts">
import api from '@/services/axios.ts'
import {onMounted, reactive} from "vue";

const callToActionBlock = reactive({
    action_text: '',
    short_description: '',
    button_text: '',
})

onMounted(async () => {
    try {
        const response = await api.get('sitesettings/call-action-block')
        Object.assign(callToActionBlock, response.data)
    }
    catch (error) {
        console.error('Ошибка загрузки данных: ', error)
    }
})
</script>

<template>
    <section
        v-if="callToActionBlock.action_text"
        class="text-center max-w-3xl mx-auto"
    >
        <h1 class="text-4xl font-bold text-gray-900">{{ callToActionBlock.action_text }}</h1>
        <p class="text-gray-600 mt-4 text-lg">{{ callToActionBlock.short_description }}</p>
        <div class="mt-6">
            <RouterLink :to="{ name: 'register' }" class="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 shadow-md transition">
                {{ callToActionBlock.button_text }}
            </RouterLink>
        </div>
    </section>
</template>

<style scoped>

</style>
