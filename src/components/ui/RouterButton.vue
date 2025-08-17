<script setup lang="ts">
defineProps<{
    routeName: string,
    buttonText: string,
}>()
</script>

<template>
    <RouterLink :to="{ name: routeName }">
        <button
            class="bg-blue-500 rounded-xl py-2 px-5 text-white shadow hover:bg-blue-700 transition cursor-pointer"
        >
            {{ buttonText }}
        </button>
    </RouterLink>
</template>

<style scoped>

</style>
