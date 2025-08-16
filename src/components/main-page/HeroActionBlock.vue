<script setup lang="ts">
import api from '@/services/axios.ts'
import {onMounted, reactive} from "vue";

const heroActionBlock = reactive({
    slogan: '',
    short_description: '',
    button_text: '',
})

onMounted(async () => {
    try {
        const response = await api.get('sitesettings/hero-action-block')
        Object.assign(heroActionBlock, response.data)
    }
    catch (error) {
        console.error('Ошибка загрузки данных: ', error)
    }
})
</script>

<template>
    <section
        v-if="heroActionBlock.slogan"
        class="text-center max-w-3xl mx-auto"
    >
        <h1 class="text-4xl font-bold text-gray-900">{{ heroActionBlock.slogan }}</h1>
        <p class="text-gray-600 mt-4 text-lg">{{ heroActionBlock.short_description }}</p>
        <div class="mt-6">
            <a href="" class="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 shadow-md transition">
                {{ heroActionBlock.button_text }}
            </a>
        </div>
    </section>
</template>

<style scoped>

</style>
