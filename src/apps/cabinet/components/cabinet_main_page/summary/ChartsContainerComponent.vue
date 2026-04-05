<script setup lang="ts">

import MealChartComponent
    from "@/apps/cabinet/components/cabinet_main_page/summary/MealChartComponent.vue";
import LastGlucoseRecordsChartComponent
    from "@/apps/cabinet/components/cabinet_main_page/summary/LastGlucoseRecordsChartComponent.vue";
</script>

<template>
    <div>
        <div class="flex flex-col gap-2">
            <MealChartComponent />
            <LastGlucoseRecordsChartComponent />
        </div>
        <div>

        </div>
    </div>
</template>

<style scoped>

</style>
