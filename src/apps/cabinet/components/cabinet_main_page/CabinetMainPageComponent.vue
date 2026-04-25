<script setup lang="ts">
import ProfileDataComponent
    from "@/apps/cabinet/components/cabinet_main_page/ProfileDataComponent.vue";
import SummaryBlockComponent
    from "@/apps/cabinet/components/cabinet_main_page/summary/SummaryBlockComponent.vue";
import HeaderComponent from '@/common/components/ui/HeaderComponent.vue'
import PlotsContainerComponent
    from '@/apps/cabinet/components/cabinet_main_page/plots/PlotsContainerComponent.vue'
import RepeatableProblemsComponent
    from '@/apps/cabinet/components/cabinet_main_page/additional_info/RepeatableProblemsComponent.vue'
import LastActionsComponent
    from '@/apps/cabinet/components/cabinet_main_page/additional_info/LastActionsComponent.vue'
import SidebarComponent
    from '@/apps/cabinet/components/cabinet_main_page/additional_info/SidebarComponent.vue'

document.title = 'Личный кабинет'
</script>

<template>
    <HeaderComponent />
    <div class="p-4 flex flex-col gap-4">
        <div
            class="grid grid-cols-1 gap-4 md:grid-cols-[1fr_4fr] h-full md:auto-rows-min md:grid-flow-row"
        >
            <div class="block w-full min-h-[300px] bg-white rounded-xl shadow-sm">
                <ProfileDataComponent/>
            </div>
            <div class="block w-full min-h-[300px] bg-white rounded-xl shadow-sm">
                <SummaryBlockComponent/>
            </div>
        </div>
        <div class="block w-full min-h-[300px] bg-white rounded-xl shadow-sm">
            <PlotsContainerComponent />
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr_2fr] md:auto-rows-min md:grid-flow-row">
            <div class="block w-full min-h-[300px] bg-white rounded-xl shadow-sm">
                <SidebarComponent />
            </div>
            <div class="block w-full min-h-[300px] bg-white rounded-xl shadow-sm">
                <RepeatableProblemsComponent />
            </div>
            <div class="block w-full min-h-[300px] bg-white rounded-xl shadow-sm">
                <LastActionsComponent />
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
