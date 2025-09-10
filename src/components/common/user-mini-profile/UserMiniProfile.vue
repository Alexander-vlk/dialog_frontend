<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { userAuthStore } from '@/stores/user.ts'
import { ref } from 'vue'

const { user } = storeToRefs(userAuthStore())

const imageUrl = ref(`https://${window.location.hostname}${user.value.image_url}`)
</script>

<template>
    <div class="flex items-center gap-2">
        <img
            v-if="imageUrl"
            :src="imageUrl"
            :alt="user?.username"
            class="w-16 h-16 rounded-full object-cover border"
        />
        <div
            v-else
            class="w-16 h-16 rounded-full object-cover border block"
        >
        </div>
        <div class="min-w-0">
            <div class="text-base font-semibold text-gray-900">@{{ user.username }}</div>
            <div class="text-md truncate">
                {{ user.last_name }} {{ user.first_name }} {{ user?.patronymic_name }}
            </div>
        </div>
    </div>
</template>
