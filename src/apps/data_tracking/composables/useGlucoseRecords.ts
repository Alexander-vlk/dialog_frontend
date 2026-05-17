import { onMounted, ref } from 'vue'

import { fetchGlucoseRecords } from '@/apps/data_tracking/api/fetchers.ts'
import type { GlucoseData } from '@/apps/data_tracking/types.ts'

const glucoseData = ref<GlucoseData[]>([])
const isLoading = ref(false)
const error = ref<unknown>(null)
const hasLoaded = ref(false)
let loadPromise: Promise<void> | null = null

export function useGlucoseRecords() {
    async function loadGlucoseRecords() {
        if (loadPromise) {
            return loadPromise
        }

        isLoading.value = true
        error.value = null

        loadPromise = fetchGlucoseRecords()
            .then((records) => {
                glucoseData.value = records
                hasLoaded.value = true
            })
            .catch((err) => {
                error.value = err
            })
            .finally(() => {
                isLoading.value = false
                loadPromise = null
            })

        return loadPromise
    }

    onMounted(() => {
        if (!hasLoaded.value) {
            loadGlucoseRecords()
        }
    })

    return {
        glucoseData,
        isLoading,
        error,
        hasLoaded,
        loadGlucoseRecords,
    }
}
