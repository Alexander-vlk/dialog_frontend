<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import api from '@/common/axios.ts'

interface StreakResponse {
    days_count: number
    is_active: boolean
}

const streak = ref<StreakResponse>({
    days_count: 0,
    is_active: false,
})

const isLoading = ref(false)
const loadError = ref('')

const cardClasses = computed(() => {
    if (!streak.value.is_active) {
        return 'border-slate-300 bg-gradient-to-br from-slate-400 to-slate-500'
    }

    const days = streak.value.days_count

    if (days < 7) {
        return 'border-yellow-300 bg-gradient-to-br from-yellow-400 to-yellow-500'
    }

    if (days < 30) {
        return 'border-orange-300 bg-gradient-to-br from-orange-400 to-orange-500'
    }

    return 'border-red-300 bg-gradient-to-br from-red-500 to-red-600'
})

const fireClasses = computed(() => {
    if (!streak.value.is_active) {
        return 'bg-white/10 opacity-50'
    }

    const days = streak.value.days_count

    if (days < 7) {
        return 'bg-yellow-200/30'
    }

    if (days < 30) {
        return 'bg-orange-200/30'
    }

    return 'bg-red-200/30'
})

const streakTitle = computed(() => {
    return streak.value.is_active
        ? 'Ударный режим активен'
        : 'Ударный режим неактивен'
})

const fireEmoji = computed(() => {
    if (!streak.value.is_active) {
        return '⭕'
    }

    return '🔥'
})

async function loadStreak() {
    if (isLoading.value) return

    isLoading.value = true
    loadError.value = ''

    try {
        const response = await api.get<StreakResponse>(
            '/api/cabinet/users/streak/'
        )

        streak.value = response.data
    } catch (error) {
        console.error(error)
        loadError.value = 'Не удалось загрузить ударный режим'
    } finally {
        isLoading.value = false
    }
}

onMounted(loadStreak)
</script>

<template>
    <div class="h-full flex flex-col gap-2">
        <div
            class="
                rounded-2xl
                border
                p-5
                shadow-sm
                transition-all duration-300
            "
            :class="cardClasses"
        >
            <div class="flex items-start justify-between gap-4">
                <div>
                    <p class="text-sm font-medium text-white/90">
                        {{ streakTitle }}
                    </p>

                    <div class="mt-2 flex items-end gap-2">
                        <span class="text-6xl font-bold text-white leading-none">
                            {{ streak.days_count }}
                        </span>

                        <span class="text-white/90 text-sm pb-1">
                            дней подряд
                        </span>
                    </div>
                </div>

                <div
                    class="
                        flex items-center justify-center
                        min-w-12 h-12
                        px-2
                        rounded-2xl
                        backdrop-blur-sm
                        transition-all duration-300
                    "
                    :class="fireClasses"
                >
                    {{ fireEmoji }}
                </div>
            </div>

            <p
                v-if="loadError"
                class="mt-3 text-sm text-white/90"
            >
                {{ loadError }}
            </p>
        </div>
    </div>
</template>

<style scoped>
</style>
