<script setup lang="ts">

import GlucoseByTimePlotComponent
    from '@/apps/cabinet/components/cabinet_main_page/plots/GlucoseByTimePlotComponent.vue'
import InsulineCarbsTimePlotComponent
    from '@/apps/cabinet/components/cabinet_main_page/plots/InsulineCarbsTimePlotComponent.vue'
import AverageGlucoseByDaysPlotComponent
    from '@/apps/cabinet/components/cabinet_main_page/plots/AverageGlucoseByDaysPlotComponent.vue'
</script>

<template>
    <section class="mx-4 my-2">
        <div class="flex-wrap justify-between items-center md:flex md:gap-2">
            <GlucoseByTimePlotComponent />
            <InsulineCarbsTimePlotComponent />
            <AverageGlucoseByDaysPlotComponent />
        </div>
    </section>
</template>

<style scoped>

</style>
