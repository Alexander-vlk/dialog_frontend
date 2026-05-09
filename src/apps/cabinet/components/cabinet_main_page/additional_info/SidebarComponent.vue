<script setup lang="ts">

</script>

<template>
    <section
        class="
            rounded-2xl
            p-3
            flex flex-col gap-2
        "
    >
        <RouterLink
            :to="{ name: 'cabinet' }"
            class="
                rounded-xl
                px-4 py-3
                text-center
                text-sm font-medium
                text-white
                border border-slate-100
                transition
                bg-blue-500
                hover:bg-blue-400
            "
        >
            Детальные отчеты
        </RouterLink>

        <RouterLink
            :to="{ name: 'cabinet' }"
            class="
                rounded-xl
                px-4 py-3
                text-center
                text-sm font-medium
                text-white
                border border-slate-100
                transition
                bg-blue-500
                hover:bg-blue-400
            "
        >
            Все показатели
        </RouterLink>

        <RouterLink
            :to="{ name: 'cabinet' }"
            class="
                rounded-xl
                px-4 py-3
                text-center
                text-sm font-medium
                text-slate-700
                bg-slate-50
                transition
                hover:bg-slate-400
                hover:text-white
            "
        >
            Сообщить об ошибке
        </RouterLink>
        <RouterLink
            :to="{ name: 'cabinet' }"
            class="
                rounded-xl
                px-4 py-3
                text-center
                text-sm font-medium
                text-slate-700
                bg-slate-50
                transition
                hover:bg-slate-400
                hover:text-white
            "
        >
            Задать вопрос
        </RouterLink>
        <p class="my-4 mx-auto">
            DiaLog - 2026 г.
        </p>
    </section>
</template>

<style scoped>

</style>
