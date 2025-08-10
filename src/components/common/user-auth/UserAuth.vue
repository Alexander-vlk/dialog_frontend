<script setup lang="ts">
import {ref} from "vue";

import SystemLogin from "@/components/common/user-auth/SystemLogin.vue";
import SystemRegistration from "@/components/common/user-auth/SystemRegistration.vue";
import UserMiniProfile from "@/components/common/user-mini-profile/UserMiniProfile.vue";
import ProfileButton from "@/components/common/user-auth/ProfileButton.vue";
import { userAuthStore } from '@/stores/user.ts'

const userStore = userAuthStore()

defineProps({
    showUserMiniProfile: Boolean,
})
</script>

<template>
    <div v-if="userStore.isAuthenticated">
        <div v-if="showUserMiniProfile" class="w-full">
            <UserMiniProfile />
        </div>
        <div v-else>
            <ProfileButton />
        </div>
    </div>
    <div v-else class="flex gap-x-2">
        <SystemLogin />
        <SystemRegistration />
    </div>
</template>

<style scoped>

</style>
