<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import Menu from "@/components/common/header/nav-menu/Menu.vue";


const isMenuOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
    <button
        @click="toggleMenu"
        class="hover:border hover:border-gray-200 hover:cursor-pointer rounded-xl p-3"
    >
        <Bars3Icon class="w-6 h-6" />
    </button>
    <Menu :isOpen="isMenuOpen" @close="closeMenu" class="py-4 px-6" />
</template>

<style scoped>

</style>
