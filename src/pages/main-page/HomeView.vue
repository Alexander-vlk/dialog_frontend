<script setup lang="ts">
import HeroActionBlock from "@/components/main-page/HeroAction.vue";
import SwiperBlock from "@/components/main-page/Swiper.vue";
import AdvantagesBlock from "@/components/main-page/Advantages.vue";

document.title = 'Главная'
</script>

<template>
    <section class="mx-auto px-6 py-12">
        <SwiperBlock />
        <HeroActionBlock />
    </section>
    <section class="w-full max-w-7xl mx-auto">
        <AdvantagesBlock />
    </section>
</template>

<style scoped>

</style>
