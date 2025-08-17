<script setup lang="ts">
import { userAuthStore } from '@/stores/user.ts'
import router from '@/router'

const authStore = userAuthStore()

if (!authStore.isAuthenticated) {
    router.push({ name: 'notFound' })
}

document.title = "Личный кабиет";
</script>

<template>
    <h2>Личный кабинет</h2>
</template>

<style scoped>

</style>
