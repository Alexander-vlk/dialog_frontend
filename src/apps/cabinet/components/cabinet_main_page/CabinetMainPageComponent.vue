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

        <!-- top grid -->
        <div
            class="
                grid
                grid-cols-1
                md:grid-cols-[1fr_4fr]
                gap-4
                items-stretch
            "
        >
            <div class="w-full h-full bg-white rounded-xl shadow-sm">
                <ProfileDataComponent class="h-full" />
            </div>

            <div class="w-full h-full bg-white rounded-xl shadow-sm">
                <SummaryBlockComponent class="h-full" />
            </div>
        </div>

        <!-- plots -->
        <div class="w-full bg-white rounded-xl shadow-sm">
            <PlotsContainerComponent />
        </div>

        <!-- bottom grid -->
        <div
            class="
                grid
                grid-cols-1
                md:grid-cols-[1fr_2fr_2fr]
                gap-4
                items-stretch
            "
        >
            <div class="w-full h-full bg-white rounded-xl shadow-sm">
                <SidebarComponent class="h-full" />
            </div>

            <div class="w-full h-full bg-white rounded-xl shadow-sm">
                <RepeatableProblemsComponent class="h-full" />
            </div>

            <div class="w-full h-full bg-white rounded-xl shadow-sm">
                <LastActionsComponent class="h-full" />
            </div>
        </div>

    </div>
</template>

<style scoped>
</style>
