<script setup lang="ts">
import Header from "@/components/common/header/Header.vue";
import Footer from '@/components/common/footer/Footer.vue'
</script>

<template>
    <Header />
    <section>
        <RouterView />
    </section>
    <Footer />
</template>

<style scoped>

</style>
