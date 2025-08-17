<script setup lang="ts">
import Header from "@/components/common/header/Header.vue";
import Footer from '@/components/common/footer/Footer.vue'
import PageLoader from '@/components/ui/PageLoader.vue'
</script>

<template>
    <Header />
    <section
        class="min-h-[80lvh]"
    >
        <RouterView />
    </section>
    <Footer />
    <PageLoader />
</template>

<style scoped>

</style>
