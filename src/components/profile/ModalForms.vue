<script setup lang="ts">

import ToDo from '@/components/dev/ToDo.vue'
</script>

<template>
    <h2
        class="text-xl font-bold"
    >
        Внести показатели
    </h2>
    <div
        class="my-2"
    >
        <button
            class="bg-blue-500 text-white p-2 w-full rounded-xl shadow cursor-pointer hover:bg-blue-700 transition"
        >
            Хлебные единицы
        </button>
    </div>
    <div
        class="my-2"
    >
        <button
            class="bg-blue-500 text-white p-2 w-full rounded-xl shadow cursor-pointer hover:bg-blue-700 transition"
        >
            Давление
        </button>
    </div>
    <div
        class="my-2"
    >
        <button
            class="bg-blue-500 text-white p-2 w-full rounded-xl shadow cursor-pointer hover:bg-blue-700 transition"
        >
            Сахар
        </button>
    </div>
    <div
        class="my-2"
    >
        <button
            class="bg-blue-500 text-white p-2 w-full rounded-xl shadow cursor-pointer hover:bg-blue-700 transition"
        >
            Температура
        </button>
    </div>
    <p>Вносить показатели можно не чаще одного раза в 15 минут</p>
    <ToDo todoText="Привязать кнопки к модалкам и добавить таблицу, сколько записей было внесено по конкретному показателю" />
</template>

<style scoped>

</style>
