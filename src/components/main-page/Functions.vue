<script setup lang="ts">
import { ref, onMounted } from "vue";
import {Swiper, SwiperSlide} from 'swiper/vue';

import api from '@/services/axios.ts'
import type {Feature} from "@/types/mainPageTypes.ts";
import { Pagination } from 'swiper/modules'

const features = ref<Array<Feature>>([])

onMounted(async () => {
    try {
        const response = await api.get('sitesettings/features')
        features.value = response.data
    }
    catch (error) {
        console.error('Ошибка при получении данных', error)
    }
})
</script>

<template>
    <h3 class="text-3xl font-bold text-center mb-5">Функции</h3>
    <Swiper
        :slides-per-view="3"
        :space-between="50"
        :pagination="{ clickable: true }"
        :modules="[Pagination]"
        loop
        class="w-full max-w-7xl mx-auto py-10"
    >
        <SwiperSlide
            v-for="(feature, index) in features"
            :key="index"
            class="bg-white rounded-xl shadow"
        >
            <h4 class="text-xl font-semibold text-blue-500 m-2">{{ feature.name }}</h4>
            <p class="text-gray-600 mx-2 mb-2">{{ feature.description }}</p>
            <div>
                <img :src="feature.image_url" :alt="feature.name" class="rounded-xl" />
            </div>
        </SwiperSlide>
    </Swiper>
</template>

<style scoped>

</style>
