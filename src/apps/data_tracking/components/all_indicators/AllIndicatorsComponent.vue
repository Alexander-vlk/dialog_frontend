<script setup lang="ts">
import HeaderComponent from '@/common/components/ui/HeaderComponent.vue'
import FilterComponent from '@/apps/data_tracking/components/all_indicators/FilterComponent.vue'
import PlotComponent from '@/apps/data_tracking/components/all_indicators/PlotComponent.vue'
import IndicatorsListComponent from '@/apps/data_tracking/components/all_indicators/IndicatorsListComponent.vue'
import InfoComponent from '@/apps/data_tracking/components/all_indicators/InfoComponent.vue'
</script>

<template>
    <HeaderComponent />
    <InfoComponent />
    <div class="mx-4 mt-4 flex flex-col gap-4 max-w-[1600px]">
        <!-- Filter + Plot row -->
        <div class="flex flex-col md:flex-row gap-4 items-stretch">
            <div class="w-full md:w-72 shrink-0">
                <FilterComponent />
            </div>
            <div class="flex-1">
                <PlotComponent />
            </div>
        </div>

        <!-- Indicators list -->
        <IndicatorsListComponent />
    </div>
</template>
