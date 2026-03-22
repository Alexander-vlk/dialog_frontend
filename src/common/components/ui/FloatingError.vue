<script setup lang="ts">
import { ref, watch } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 3000,
  }
})

const visible = ref(false)

watch(
  () => props.message,
  (newVal) => {
    if (newVal) {
      visible.value = true
      setTimeout(() => {
        visible.value = false
      }, props.duration)
    }
  },
  { immediate: true }
)
</script>

<template>
    <transition name="fade">
        <div
            v-if="visible"
            class="fixed top-25 md:top-40 left-1/2 transform -translate-x-1/2 z-50
            bg-red-100 text-red-800 border border-red-300
            px-6 py-3 rounded-xl shadow-md max-w-[350px]"
        >
            {{ message }}
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
