<script setup lang="ts">
import HeroActionBlock from "@/components/main-page/HeroActionBlock.vue";
import SwiperBlock from "@/components/main-page/SwiperBlock.vue";
import AdvantagesBlock from "@/components/main-page/AdvantagesBlock.vue";

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
