import { ref } from 'vue'

export type ReportData = {
    date_start: string
    date_end: string
    aggregated_values: Record<string, AggregatedIndicator>
}

export type AggregatedIndicator = {
    total: number
    average_values: Record<string, number | null>
    median_values: Record<string, number | null>
    min_value: Record<string, any> | null
    max_value: Record<string, any> | null
}

const STORAGE_KEY = 'report_data'

function loadFromStorage(): ReportData | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

const reportData = ref<ReportData | null>(loadFromStorage())

export function useReport() {
    function setReport(data: ReportData) {
        reportData.value = data
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }

    function clearReport() {
        reportData.value = null
        localStorage.removeItem(STORAGE_KEY)
    }

    return { reportData, setReport, clearReport }
}
