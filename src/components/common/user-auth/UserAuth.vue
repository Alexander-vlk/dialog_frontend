<script setup lang="ts">
import {ref} from "vue";

import SystemLogin from "@/components/common/user-auth/SystemLogin.vue";
import SystemRegistration from "@/components/common/user-auth/SystemRegistration.vue";
import UserMiniProfile from "@/components/common/user-mini-profile/UserMiniProfile.vue";
import ProfileButton from "@/components/common/user-auth/ProfileButton.vue";

const isUserAuthenticated = ref(true)

defineProps({
    showUserMiniProfile: Boolean,
})
</script>

<template>
    <div v-if="isUserAuthenticated">
        <div v-if="showUserMiniProfile" class="w-full">
            <UserMiniProfile />
        </div>
        <div v-else>
            <ProfileButton />
        </div>
    </div>
    <div v-else class="flex gap-x-2 mt-5">
        <SystemLogin />
        <SystemRegistration />
    </div>
</template>

<style scoped>

</style>
