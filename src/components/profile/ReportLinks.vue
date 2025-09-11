<script setup lang="ts">

</script>

<template>
    <h2
        class="text-xl font-bold"
    >
        Все отчеты
    </h2>
    <div
        class="w-full bg-blue-500 p-2 text-center rounded-xl shadow my-2 text-white hover:bg-blue-700 transition cursor-pointer"
    >
        <RouterLink :to="{name: 'main'}">Дневные</RouterLink>
    </div>
    <div
        class="w-full bg-blue-500 p-2 text-center rounded-xl shadow my-2 text-white hover:bg-blue-700 transition cursor-pointer"
    >
        <RouterLink :to="{name: 'main'}">Недельные</RouterLink>
    </div>
    <div
        class="w-full bg-blue-500 p-2 text-center rounded-xl shadow my-2 text-white hover:bg-blue-700 transition cursor-pointer"
    >
        <RouterLink :to="{name: 'main'}">Месячные</RouterLink>
    </div>
</template>

<style scoped>

</style>
