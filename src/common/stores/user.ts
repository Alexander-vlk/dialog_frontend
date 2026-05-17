import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AppUser } from '@/apps/auth_service/types.ts'


export const userAuthStore = defineStore(
    'user',
    () => {
        const storedUser = localStorage.getItem('user')
        const user = ref<AppUser | null>(storedUser ? JSON.parse(storedUser) : null)
        const accessToken = ref<string | null>(localStorage.getItem('accessToken'))
        const isAuthenticated = computed(() => !!accessToken.value)

        function setAccessToken(token: string) {
            accessToken.value = token
            localStorage.setItem('accessToken', token)
        }

        function clearAccessToken() {
            accessToken.value = null
            localStorage.removeItem('accessToken')
        }

        function setUser(newUser: AppUser) {
            user.value = newUser
            localStorage.setItem('user', JSON.stringify(newUser))
        }

        function clearUser() {
            user.value = null
            localStorage.removeItem('user')
        }

        function logout() {
            clearAccessToken()
            clearUser()
        }

        return {
            user,
            accessToken,
            isAuthenticated,
            setAccessToken,
            setUser,
            logout,
        }
    },
)
