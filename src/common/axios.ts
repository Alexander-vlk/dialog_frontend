import axios from "axios";
import router from '@/router.ts'

import {API_URL} from '@/common/constants.ts'
import {STATUS_CODES} from '@/common/constants.ts'
import { userAuthStore } from '@/common/stores/user.ts'

const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})
api.interceptors.request.use((config) => {
    const authStore = userAuthStore()
    if (authStore.accessToken) {
        config.headers.Authorization = `Bearer ${authStore.accessToken}`
    }

    return config
})
let isRefreshing = false
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config
        if (error.response.status !== STATUS_CODES.UNAUTHORIZED) {
            return Promise.reject(error)
        }
        if (isRefreshing) {
            return Promise.reject(error)
        }
        isRefreshing = true
        const authStore = userAuthStore()
        try {
            const response = await api.post(
                '/auth_service/token/refresh/',
            )
            authStore.setAccessToken(response.data.access)
            return api(originalRequest)
        }
        catch (error) {
            authStore.logout()
            await router.push({ name: 'login' })
            return Promise.reject(error)
        }
    }
)

export default api
