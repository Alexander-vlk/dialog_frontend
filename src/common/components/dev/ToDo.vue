<script setup lang="ts">

defineProps({
    todoText: String
})
</script>

<template>
    <span
        class="text-orange-500 font-bold italic cursor-pointer"
        :title="todoText"
    >
        TODO
    </span>
</template>

<style scoped>

</style>
