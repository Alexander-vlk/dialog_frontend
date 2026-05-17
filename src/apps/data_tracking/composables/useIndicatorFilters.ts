// @/apps/data_tracking/composables/useIndicatorFilters.ts
import { ref, watch } from 'vue'

export const indicatorLabels: Record<string, string> = {
    temperature: 'Температура',
    pressure: 'Давление',
    glucose: 'Глюкоза',
    hemoglobin: 'Гемоглобин',
    cholesterol: 'Холестерин',
    lipid_profile: 'Липидный профиль',
    microalbuminuria: 'Микроальбуминурия',
    weight: 'Вес',
    ketones: 'Кетоны',
    meal: 'Питание',
    note: 'Заметка',
    physical_activity: 'Физическая активность',
}

export const indicatorEndpoints: Record<string, string> = {
    temperature: '/api/data_tracking/temperature/',
    pressure: '/api/data_tracking/pressure/',
    glucose: '/api/data_tracking/glucose/',
    hemoglobin: '/api/data_tracking/hemoglobin/',
    cholesterol: '/api/data_tracking/cholesterol/',
    lipid_profile: '/api/data_tracking/lipid_profile/',
    microalbuminuria: '/api/data_tracking/microalbuminuria/',
    weight: '/api/data_tracking/weight/',
    ketones: '/api/data_tracking/ketones/',
    meal: '/api/data_tracking/meals/',
    note: '/api/data_tracking/note/',
    physical_activity: '/api/data_tracking/physical_activity/',
}

const STORAGE_KEY = 'indicator_filters'

function loadFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return null
        return JSON.parse(raw) as { indicator: string | null, dateStart: string, dateEnd: string }
    } catch {
        return null
    }
}

function saveToStorage(data: { indicator: string | null, dateStart: string, dateEnd: string }) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
        // ignore
    }
}

const saved = loadFromStorage()

const indicator = ref<string | null>(saved?.indicator ?? null)
const dateStart = ref(saved?.dateStart ?? '')
const dateEnd = ref(saved?.dateEnd ?? '')

watch([indicator, dateStart, dateEnd], ([ind, ds, de]) => {
    saveToStorage({ indicator: ind, dateStart: ds, dateEnd: de })
})

export function useIndicatorFilters() {
    const hasFilters = () => !!indicator.value
    return { indicator, dateStart, dateEnd, hasFilters }
}
