import api from '@/services/axios.ts'
import { userAuthStore } from '@/stores/user.ts'
import type { User } from '@/types/userTypes.ts'


export default async function fetchUserData(): Promise<User | undefined> {
    const userStore = userAuthStore()
    try {
        const response = await api.get(
            'cabinet/private/api/users/',
            {
                headers: {
                    Authorization: `Bearer ${userStore.accessToken}`,
                }
            }
        )
        return response.data
    }
    catch (error) {
        console.error(error)
    }
}
