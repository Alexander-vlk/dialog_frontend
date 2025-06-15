import {defineStore} from "pinia";
import { ref, computed } from "vue";

import type { User } from '@/types/userTypes.ts'

export const userAuthStore  = defineStore('auth', () => {
    const user = ref<User | null>(null)
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

    function setUser(newUser: User) {
        user.value = newUser
    }

    function logout() {
        clearAccessToken()
        user.value = null
    }

    return {
        user,
        accessToken,
        isAuthenticated,
        setAccessToken,
        clearAccessToken,
        setUser,
    }
})
