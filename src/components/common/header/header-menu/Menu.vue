<script setup lang="ts">
import { defineProps } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import SearchField from "@/components/common/header/search-block/SearchField.vue";
import UserAuth from "@/components/common/user-auth/UserAuth.vue";
import HeaderMenuLinks from "@/components/common/header/header-menu/HeaderMenuLinks.vue";

defineProps<{
  isOpen: boolean
}>()
</script>

<template>
    <transition name="slide">
        <div
        v-if="isOpen"
        class="
            fixed top-0 right-0 h-full z-50 bg-white shadow-lg transition-all
            duration-300 ease-in-out w-full md:w-1/2 lg:w-1/3 xl:w-1/4
        "
        >
            <div class="flex justify-between items-center p-4">
                <p class="font-bold text-2xl">Меню</p>
                <button
                    @click="$emit('close')"
                    class="hover:border hover:border-gray-200 hover:cursor-pointer rounded-xl p-2"
                >
                    <XMarkIcon class="w-6 h-6" />
                </button>
            </div>

            <div class="p-4 grid grid-cols-4 gap-4 xl:hidden">
                <div class="col-span-4">
                    <UserAuth :showUserMiniProfile="true" />
                </div>
                <div class="col-span-4">
                    <SearchField />
                </div>
            </div>
            <div class="p-4">
                <HeaderMenuLinks />
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
