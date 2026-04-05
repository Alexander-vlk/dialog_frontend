<script setup lang="ts">
import ProfileDataComponent
    from "@/apps/cabinet/components/cabinet_main_page/ProfileDataComponent.vue";
import SummaryBlockComponent
    from "@/apps/cabinet/components/cabinet_main_page/summary/SummaryBlockComponent.vue";

document.title = 'Личный кабинет'
</script>

<template>
    <div class="min-h-screen p-4 flex flex-col gap-4">
        <div
            class="grid grid-cols-1 gap-4 md:grid-cols-[1fr_4fr] md:auto-rows-min md:grid-flow-row"
        >
            <div class="block w-full min-h-[300px] bg-white rounded-xl shadow-sm">
                <ProfileDataComponent/>
            </div>
            <div class="block w-full min-h-[300px] bg-white rounded-xl shadow-sm">
                <SummaryBlockComponent/>
            </div>
        </div>

    </div>
</template>

<style scoped>
</style>
