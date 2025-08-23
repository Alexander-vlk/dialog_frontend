<script setup lang="ts">
import { ref } from 'vue'
import api from '@/services/axios.ts'

const isLoading = ref(true)
const isErrorOccurred = ref(false)

let activeRequests = 0
api.interceptors.request.use((config) => {
    activeRequests++;
    isLoading.value = true;
    return config;
});
api.interceptors.response.use(
    (response) => {
        activeRequests--;
        if (activeRequests === 0) {
            isLoading.value = false;
        }
        return response;
    },
    (error) => {
        activeRequests--;
        if (activeRequests === 0) {
            isLoading.value = false;
            isErrorOccurred.value = true;
        }
        return Promise.reject(error);
    }
);

if (!activeRequests) {
    isLoading.value = false;
}
</script>

<template>
    <div
        v-if="isLoading"
        class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-100"
    >
        <div class="w-16 h-16 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div
        v-if="isErrorOccurred"
        class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-100"
    >
        <p class="text-3xl">
            Что-то пошло не так...
        </p>
    </div>
</template>

<style scoped>

</style>
