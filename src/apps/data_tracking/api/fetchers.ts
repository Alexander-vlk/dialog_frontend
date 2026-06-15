import api from '@/common/axios.ts'
import type { AxiosResponse } from 'axios'
import type { GlucoseData, PaginatedResponse } from '@/apps/data_tracking/types.ts'

function isPaginatedGlucoseResponse(
    data: GlucoseData[] | PaginatedResponse<GlucoseData>
): data is PaginatedResponse<GlucoseData> {
    return !Array.isArray(data) && Array.isArray(data.results)
}

export async function fetchGlucoseRecords(): Promise<GlucoseData[]> {
    const records: GlucoseData[] = []

    const dateEnd = new Date()
    const dateStart = new Date()
    dateStart.setDate(dateStart.getDate() - 7)

    const formatDate = (date: Date): string =>
        date.toISOString().split('T')[0]

    const params = {
        date_start: formatDate(dateStart),
        date_end: formatDate(dateEnd),
    }

    let url: string | null = '/api/data_tracking/glucose/'

    while (url) {
        const response: AxiosResponse<
            GlucoseData[] | PaginatedResponse<GlucoseData>
        > = await api.get(url, {
            params: url === '/api/data_tracking/glucose/' ? params : undefined,
        })

        const data = response.data

        if (Array.isArray(data)) {
            records.push(...data)
            break
        }

        if (isPaginatedGlucoseResponse(data)) {
            records.push(...data.results)
            url = data.next
        } else {
            break
        }
    }

    return records
}
