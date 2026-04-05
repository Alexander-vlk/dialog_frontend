<script setup lang="ts">
import Cookie from '@/common/components/ui/Cookie.vue'
</script>

<template>
    <section
        class="min-h-[80lvh] max-w-[1600px] mx-auto"
    >
        <RouterView />
        <Cookie />
    </section>
</template>

<style scoped>

</style>
