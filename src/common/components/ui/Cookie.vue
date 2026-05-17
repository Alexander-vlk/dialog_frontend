<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showCookie = ref(false)
onMounted(() => {
    const accepted = localStorage.getItem('cookieAccepted')
    if (!accepted) {
        showCookie.value = true
    }
})
const acceptCookies = () => {
    localStorage.setItem('cookieAccepted', 'true')
    showCookie.value = false
}
</script>

<template>
    <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
    >
        <div
            v-if="showCookie"
            class="fixed max-w-md mx-auto bottom-4 left-4 right-4 bg-white shadow-lg rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
            <p class="text-sm text-gray-700">
                Находясь на сайте, вы соглашаетесь с тем, <br>что мы используем <b>Cookies</b>
            </p>
            <button
                @click="acceptCookies"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition cursor-pointer"
            >
                Принять
            </button>
        </div>
    </transition>
</template>

<style scoped>

</style>
