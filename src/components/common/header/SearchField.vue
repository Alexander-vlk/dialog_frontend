<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { ref, onMounted, onBeforeUnmount } from "vue"

const isActive = ref(false)
const clickableBox = ref<HTMLElement | null>(null)
const searchInputField = ref<HTMLInputElement | null>(null)

const handleClickOutside = (e: MouseEvent) => {
    if (!clickableBox.value?.contains(e.target)) {
        isActive.value = false
        return
    }
    searchInputField.value?.focus()
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
    <div
        class="w-xl flex items-center gap-x-5 border py-3 px-4 rounded-full"
        ref="clickableBox"
        @click="handleClickOutside"
        @click.stop="isActive = true"
        :class="isActive ? 'border-blue-500' : 'border-gray-200'"
    >
        <MagnifyingGlassIcon class="w-6 h-6" />
        <input type="text" id="searchInputField" placeholder="Поиск" class="w-full border-none outline-none h-full" ref="searchInputField" />
    </div>
</template>

<style scoped>

</style>
