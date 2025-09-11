<script setup lang="ts">

</script>

<template>
    <div
        class="flex flex-wrap sm:flex-nowrap gap-2 items-center justify-center"
    >
        <div
            class="w-full bg-blue-500 px-2 py-2 sm:py-4 text-center rounded-xl shadow text-white hover:bg-blue-700 transition cursor-pointer"
        >
            <RouterLink :to="{name: 'main'}">Форум</RouterLink>
        </div>
        <div
            class="w-full bg-blue-500 px-2 py-2 sm:py-4 text-center rounded-xl shadow text-white hover:bg-blue-700 transition cursor-pointer"
        >
            <RouterLink :to="{name: 'main'}">Новости</RouterLink>
        </div>
    </div>
</template>

<style scoped>

</style>
