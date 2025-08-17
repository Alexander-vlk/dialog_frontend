<script setup lang="ts">
import RouterButton from '@/components/ui/RouterButton.vue'
document.title = 'Страница не найдена'
</script>

<template>
    <div
        class="bg-white shadow my-7 w-full min-h-[40lvh] flex flex-wrap flex-col items-center justify-center p-4"
    >
        <div
            class="flex flex-wrap items-center justify-center w-full max-w-[50lvw] gap-8"
        >
            <h2 class="text-blue-500 font-bold text-[128px] sm:text-[256px] leading-none" id="not-found-error-code">
                404
            </h2>

            <div class="bg-red-500 hidden xl:block rounded-xl shadow w-[0.75lvmin] h-[20lvh] flex-shrink-0"></div>

            <div class="flex flex-col">
                <p class="w-full text-5xl font-bold">
                    <span class="text-blue-500 text-2xl sm:text-[3lvmin]">Страница</span>
                    <span class="text-red-500 text-2xl sm:text-[3lvmin] block">не найдена</span>
                </p>
                <RouterButton
                    routeName="main"
                    buttonText="На главную"
                    class="mt-4 self-start"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
