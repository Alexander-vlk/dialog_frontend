<script setup lang="ts">
import { ref } from 'vue'

import ToDo from '@/components/dev/ToDo.vue'
import FirstColumn from '@/components/profile/dashboard/FirstColumn.vue'
import SecondColumn from '@/components/profile/dashboard/SecondColumn.vue'
import ThirdColumn from '@/components/profile/dashboard/ThirdColumn.vue'


const streakDays = ref<number>(1)
</script>

<template>
    <h2
        class="text-xl font-bold"
    >
        Сводка <ToDo todoText="Доделать" />
    </h2>
    <div
        class="sm:flex flex-wrap items-center justify-between gap-2"
    >
        <div>
            <FirstColumn />
        </div>
        <div>
            <SecondColumn />
        </div>
        <div>
            <ThirdColumn />
        </div>
    </div>
</template>

<style scoped>

</style>
