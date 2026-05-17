<script setup lang="ts">
import { userAuthStore } from '@/common/stores/user.ts'

const userStore = userAuthStore()
if (!userStore.isAuthenticated) {
    window.location.href = '/login'
}
else {
    window.location.href = '/cabinet'
}
</script>

<template>

</template>

<style scoped>

</style>
