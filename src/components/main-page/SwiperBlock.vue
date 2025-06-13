<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';

import api from '@/plugins/axios/axios.ts'
import { backendUrl } from '@/constants/common.ts'
import type {Slide} from "@/types/mainPageTypes.ts";

console.log(backendUrl)
const sliderImages = ref<Array<Slide>>([])

onMounted(async () => {
    try {
        const response = await api.get('sitesettings/slider-images/')
        sliderImages.value = response.data
    }
    catch (error) {
        console.error('Ошибка получения данных: ', error)
    }
})

</script>

<template>
  <div class="w-full max-w-7xl mx-auto py-10">
    <Swiper
      :slides-per-view="1"
      :space-between="20"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 5000 }"
      loop
      class="rounded-2xl shadow-lg"
    >
      <SwiperSlide
        v-for="(slideImage, index) in sliderImages"
        :key="index"
        class="bg-blue-50 flex flex-col items-start gap-4"
      >
          <img :src="backendUrl + slideImage.image_url" :alt="slideImage.alt">
      </SwiperSlide>

      <div class="swiper-pagination mt-4"></div>
    </Swiper>
  </div>
</template>

<style scoped>

</style>
