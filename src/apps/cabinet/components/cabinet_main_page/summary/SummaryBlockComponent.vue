<script setup lang="ts">
import ChartsContainerComponent
    from "@/apps/cabinet/components/cabinet_main_page/summary/ChartsContainerComponent.vue";
import HealthInfoComponent
    from "@/apps/cabinet/components/cabinet_main_page/summary/HealthInfoComponent.vue";
import SidebarComponent
    from "@/apps/cabinet/components/cabinet_main_page/summary/SidebarComponent.vue";
</script>

<template>
    <div
        class="
            grid
            grid-cols-1
            md:grid-cols-[2fr_2fr_1fr]
            gap-2
            m-2
            items-stretch
        "
    >
        <div>
            <ChartsContainerComponent />
        </div>

        <div>
            <HealthInfoComponent />
        </div>

        <div>
            <SidebarComponent />
        </div>
    </div>
</template>

<style scoped>

</style>
