<script setup lang="ts">
import Logo from '@/components/common/header/header-logo/Logo.vue'
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

<template>
    <footer class="bg-white shadow-md py-6">
        <div class="container mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
            <Logo />

            <nav class="mt-4 md:mt-0">
                <ul class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                    <li>
                        <RouterLink :to="{ name: 'main'}" class="text-primary hover:underline transition">О нас</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'main' }" class="text-primary hover:underline transition">Политика конфиденциальности</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'main' }" class="text-primary hover:underline transition">Контакты</RouterLink>
                    </li>
                </ul>
            </nav>

            <p class="text-gray-500 text-sm mt-4 md:mt-0">2024 - {{ currentYear }}. &copy; DiaLog. Все права защищены.</p>
        </div>
    </footer>
</template>

<style scoped>

</style>
