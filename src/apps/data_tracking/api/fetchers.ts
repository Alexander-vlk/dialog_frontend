import api from '@/common/axios.ts'
import type { AxiosResponse } from 'axios'
import type { GlucoseData, PaginatedResponse } from '@/apps/data_tracking/types.ts'

function isPaginatedGlucoseResponse(
    data: GlucoseData[] | PaginatedResponse<GlucoseData>
): data is PaginatedResponse<GlucoseData> {
    return !Array.isArray(data) && Array.isArray(data.results)
}

export async function fetchGlucoseRecords(): Promise<GlucoseData[]> {
    let url: string | null = '/api/data_tracking/glucose/'
    const records: GlucoseData[] = []

    while (url) {
        const response: AxiosResponse<GlucoseData[] | PaginatedResponse<GlucoseData>> = await api.get(url)
        const data: GlucoseData[] | PaginatedResponse<GlucoseData> = response.data

        if (Array.isArray(data)) {
            records.push(...data)
            break
        }

        if (isPaginatedGlucoseResponse(data)) {
            records.push(...data.results)
            url = data.next
        }
        else {
            break
        }
    }

    return records
}
