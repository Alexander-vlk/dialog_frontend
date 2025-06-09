<script setup lang="ts">
import { defineProps } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import HeaderCenter from "@/components/common/header/header-center/HeaderCenter.vue";
import SystemLogin from "@/components/common/user-auth/SystemLogin.vue";
import SystemRegistration from "@/components/common/user-auth/SystemRegistration.vue";
import SearchField from "@/components/common/header/search-block/SearchField.vue";
import UserAuth from "@/components/common/user-auth/UserAuth.vue";

defineProps<{
  isOpen: boolean
}>()
</script>

<template>
    <transition name="slide">
        <div
        v-if="isOpen"
        class="fixed top-0 right-0 h-full z-50 bg-white shadow-lg transition-all duration-300 ease-in-out
        w-full md:w-1/6"
        >
            <div class="flex justify-end ">
                <button @click="$emit('close')" class="hover:border hover:border-gray-200 hover:cursor-pointer rounded-xl p-3">
                    <XMarkIcon class="w-6 h-6" />
                </button>
            </div>

            <div class="p-4 grid grid-cols-4 gap-4 md:hidden">
                <div>
                    <UserAuth />
                </div>
                <div class="col-span-4">
                    <SearchField />
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.slide-enter-from {
  transform: translateX(100%);
}
.slide-enter-to {
  transform: translateX(0%);
}
.slide-enter-active {
  transition: transform 0.3s ease-out;
}
.slide-leave-from {
  transform: translateX(0%);
}
.slide-leave-to {
  transform: translateX(100%);
}
.slide-leave-active {
  transition: transform 0.3s ease-in;
}
</style>
