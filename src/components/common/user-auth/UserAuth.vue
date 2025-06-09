<script setup lang="ts">
import {ref} from "vue";

import SystemLogin from "@/components/common/user-auth/SystemLogin.vue";
import SystemRegistration from "@/components/common/user-auth/SystemRegistration.vue";
import UserProfile from "@/components/common/user-profile/UserProfile.vue";

const isUserAuthenticated = ref(false)
</script>

<template>
    <div v-if="isUserAuthenticated"><UserProfile /></div>
    <div v-else class="flex gap-x-2 mt-5">
        <SystemLogin />
        <SystemRegistration />
    </div>
</template>

<style scoped>

</style>
