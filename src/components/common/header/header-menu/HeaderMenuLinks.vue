<script setup lang="ts">

</script>

<template>
<nav>
    <ul>
        <li>
            <RouterLink
                :to="{ name: 'main' }"
                class="text-xl hover:underline"
                v-slot="{ isActive }"
            >
                <span :class="{ 'text-blue-500 hover:underline' : isActive }">
                    Главная
                </span>
            </RouterLink>
        </li>
        <li>
            <RouterLink
                :to="{ name: 'profile' }"
                class="text-xl hover:underline"
                v-slot="{ isActive }"
            >
                <span :class="{ 'text-blue-500 hover:underline' : isActive }">
                    Личный кабинет
                </span>
            </RouterLink>
        </li>
        <li>
            <a href="" class="text-xl hover:underline">Форум</a>
        </li>
        <li>
            <a href="" class="text-xl hover:underline">Семейный доступ</a>
        </li>
        <li>
            <a href="" class="text-xl hover:underline">О нас</a>
        </li>
        <li>
            <a href="" class="text-xl hover:underline">Отзывы</a>
        </li>
        <li>
            <a href="" class="text-xl hover:underline">База знаний</a>
        </li>
        <li>
            <a href="" class="text-xl hover:underline">Политика конфиденциальности</a>
        </li>
        <li>
            <a href="" class="text-xl hover:underline">FAQ</a>
        </li>
    </ul>
</nav>
</template>

<style scoped>

</style>
