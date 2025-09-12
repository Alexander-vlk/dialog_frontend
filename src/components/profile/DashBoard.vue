<script setup lang="ts">

import ToDo from '@/components/dev/ToDo.vue'
</script>

<template>
    <h2
        class="text-xl font-bold"
    >
        Сводка <ToDo todoText="Доделать" />
    </h2>
    <div
        class="sm:flex flex-wrap items-center justify-between gap-2"
    >
        <div>
            БЖУ
        </div>
        <div>
            Общие данные
        </div>
        <div>
            Ударный режим
        </div>
    </div>
</template>

<style scoped>

</style>
