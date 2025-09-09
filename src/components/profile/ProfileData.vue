<script setup lang="ts">
import { userAuthStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { user } = storeToRefs(userAuthStore())
const imageUrl = ref(`https://${window.location.hostname}${user.value.image_url}`)
</script>

<template>
    <div class="flex items-center gap-4">
        <img
            :src="imageUrl"
            :alt="user?.username"
            class="w-16 h-16 rounded-full object-cover border"
        />
        <div class="min-w-0">
            <div class="text-base font-semibold text-gray-900">@{{ user.username }}</div>
            <div class="text-sm text-gray-600 truncate">
                {{ user.last_name }} {{ user.first_name }} {{ user?.patronymic_name }}
            </div>
        </div>
    </div>
    <div>

    </div>
</template>

<style scoped>

</style>
