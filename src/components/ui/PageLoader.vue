<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isLoading = ref(true)
onMounted(() => {
    window.addEventListener('load',
        async () => {
            isLoading.value = false
        }
    )
})
</script>

<template>
    <div
        v-if="isLoading"
        class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-100"
    >
        <div class="w-16 h-16 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
    </div>
</template>

<style scoped>

</style>
