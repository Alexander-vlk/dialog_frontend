<script setup lang="ts">

import MealChartComponent
    from "@/apps/cabinet/components/cabinet_main_page/summary/MealChartComponent.vue";
import LastGlucoseRecordsChartComponent
    from "@/apps/cabinet/components/cabinet_main_page/summary/LastGlucoseRecordsChartComponent.vue";
</script>

<template>
    <div class="h-full">
        <div class="flex h-full flex-col gap-2">
            <div class="shrink-0">
                <MealChartComponent />
            </div>
            <div class="flex-1 min-h-0">
                <LastGlucoseRecordsChartComponent />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
