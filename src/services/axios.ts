import axios from 'axios';

import {apiUrl} from "@/constants/common.ts";
import { userAuthStore } from '@/stores/user.ts'
import { STATUS_CODES } from '@/constants/statusCodes.ts'

const api = axios.create({
    baseURL: apiUrl,
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
        console.log(error)

        if (!error.response.status !== STATUS_CODES.UNAUTHORIZED) {
            return Promise.reject(error)
        }

        if (isRefreshing) {
            return Promise.reject(error)
        }

        isRefreshing = true
        const authStore = userAuthStore()
        const response = await api.post('auth_service/refresh/')
        if (!response.status === STATUS_CODES.UNAUTHORIZED) {
            authStore.logout()
            return Promise.reject(error)
        }
        authStore.setAccessToken(response.data.access)
        return api(originalRequest)
    }
)

export default api
