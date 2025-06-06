<script setup lang="ts">

</script>

<template>
    <button id="menu-toggle" class="md:hidden text-primary focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </button>
    <nav id="menu" class="hidden z-100 md:flex flex-col md:flex-row md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0">
        <ul class="flex flex-col md:flex-row md:space-x-6">
            <li>
                <a href="" class="text-primary hover:underline transition block py-2">Главная</a>
            </li>
            <li>
                <a href="#" class="text-primary hover:underline transition block py-2">Анализ данных</a>
            </li>
            <li>
                <a href="#" class="text-primary hover:underline transition block py-2">Отчёты</a>
            </li>
            <li>
                <a href="#" class="text-primary hover:underline transition block py-2">Контакты</a>
            </li>
        </ul>
    </nav>
</template>

<style scoped>

</style>
