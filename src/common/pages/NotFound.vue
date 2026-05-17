<script setup lang="ts">
import RouterButton from '@/common/components/ui/RouterButton.vue'

document.title = 'Страница не найдена'
</script>

<template>
    <div class="min-h-screen w-full flex items-center justify-center p-4">
        <div class="flex flex-col items-center justify-center w-full max-w-md text-center gap-6">
            <h2 class="text-blue-500 font-bold text-[96px] sm:text-[160px] leading-none">
                404
            </h2>
            <p>
                <span class="text-blue-500 text-xl sm:text-2xl">Страница </span>
                <span class="text-red-500 text-xl sm:text-2xl">не найдена </span>
            </p>
            <RouterButton
                routeName="cabinet"
                buttonText="В личный кабинет"
                class="mt-2"
            />
        </div>
    </div>
</template>
