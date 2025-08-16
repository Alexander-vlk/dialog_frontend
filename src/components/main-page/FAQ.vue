<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '@/services/axios.ts'
import type { FAQ } from '@/types/mainPageTypes.ts'

const questionsAnswers = ref<Array<FAQ>>([])

onMounted(async () => {
    try {
        const response = await api.get('sitesettings/main-page-faqs')
        questionsAnswers.value = response.data
    }
    catch (error) {
        console.error('Ошибка при получении данных', error)
    }
})
</script>

<template>
    <h3 class="text-3xl font-bold text-center my-7">FAQ</h3>
    <div>
        <details
            v-for="(questionAnswer, index) in questionsAnswers"
            :key="index"
            class="w-full max-w-7xl mx-auto bg-blue-600 rounded-xl shadow my-1 first:pt-2 last:pb-2"
        >
            <summary
                class="bg-blue-600 text-xl text-white px-5 py-2 cursor-pointer"
            >
                {{ questionAnswer.question }}
            </summary>
            <p
                class="text-blue-600 font-bold px-5 py-2 bg-white w-full"
            >
                {{ questionAnswer.answer }}
            </p>
        </details>
    </div>
</template>

<style scoped>
details {
    list-style: none;
}
</style>
