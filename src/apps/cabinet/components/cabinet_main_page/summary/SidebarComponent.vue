<script setup lang="ts">

</script>

<template>
    <div class="w-full h-full rounded-xl grid grid-cols-1 grid-rows-[5fr_1fr_3fr_3fr] gap-2">
        <div class="bg-green-400 shadow-sm rounded-xl">
            <div class="relative bg-green-500 w-[90%] p-4 rounded-xl">
                <span class="text-white text-7xl">13</span>
                <div class="text-white text-left flex flex-col justify-end">
                    <span class="text-md">дней замеров подряд</span>
                </div>
            </div>
        </div>
        <h2 class="text-xl flex items-end">Сегодня я ощущаю:</h2>
        <div class="shadow-sm rounded-xl bg-pink-500 p-4 text-white flex items-center justify-center text-xl">
            <p>Сонливость</p>
        </div>
        <div class="shadow-sm rounded-xl bg-blue-300 p-4 text-white flex items-center justify-center text-xl">
            <p>Хорошее настроение</p>
        </div>
    </div>
</template>

<style scoped>

</style>
