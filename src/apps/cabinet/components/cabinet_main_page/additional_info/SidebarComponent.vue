<script setup lang="ts">

</script>

<template>
    <section
        class="m-4 grid grid-cols-1 gap-2"
    >
        <RouterLink
            class="block text-center bg-orange-500 hover:bg-orange-400 text-white font-medium rounded-lg py-2 transition shadow-sm hover:cursor-pointer"
            to="{ name: 'cabinet'}"
        >
            Детальные отчеты
        </RouterLink>
        <RouterLink
            class="block text-center bg-orange-500 hover:bg-orange-400 text-white font-medium rounded-lg py-2 transition shadow-sm hover:cursor-pointer"
            to="{ name: 'cabinet'}"
        >
            Все показатели
        </RouterLink>
        <RouterLink
            class="block text-center bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg py-2 transition shadow-sm hover:cursor-pointer"
            to="{ name: 'cabinet'}"
        >
            Сообщить об ошибке
        </RouterLink>
    </section>
</template>

<style scoped>

</style>
