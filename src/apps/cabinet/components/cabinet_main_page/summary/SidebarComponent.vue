<script setup lang="ts">

</script>

<template>
    <div class="h-full flex flex-col gap-2">
        <div
            class="
                rounded-2xl
                border border-emerald-100
                bg-gradient-to-br from-emerald-400 to-emerald-500
                p-5
                shadow-sm
            "
        >
            <div class="flex items-start justify-between gap-4">
                <div>
                    <p class="text-sm font-medium text-emerald-50/90">
                        Серия активности
                    </p>

                    <div class="mt-2 flex items-end gap-2">
                        <span class="text-6xl font-bold text-white leading-none">
                            13
                        </span>

                        <span class="text-emerald-50 text-sm pb-1">
                            дней подряд
                        </span>
                    </div>
                </div>

                <div
                    class="
                        flex items-center justify-center
                        w-12 h-12
                        rounded-2xl
                        bg-white/20
                        backdrop-blur-sm
                    "
                >
                    🔥
                </div>
            </div>

            <div
                class="
                    mt-5
                    h-2
                    rounded-full
                    bg-white/20
                    overflow-hidden
                "
            >
                <div
                    class="
                        h-full
                        w-[65%]
                        rounded-full
                        bg-white
                    "
                />
            </div>
        </div>

        <div class="mt-auto flex flex-col gap-2 mb-4">
            <div class="px-1 pt-1">
                <h2 class="text-lg font-semibold text-slate-900">
                    Сегодняшнее состояние
                </h2>

                <p class="text-sm text-slate-500 mt-1">
                    Последние отметки пользователя
                </p>
            </div>
            <div
                class="
                rounded-2xl
                border border-pink-100
                bg-pink-50
                p-4
                flex items-center justify-between
                gap-3
            "
            >
                <div class="flex items-center gap-3">
                    <div
                        class="
                        w-11 h-11
                        rounded-xl
                        bg-pink-100
                        flex items-center justify-center
                        text-xl
                    "
                    >
                        😴
                    </div>

                    <div>
                        <p class="text-xs font-semibold text-pink-500 uppercase">
                            Самочувствие
                        </p>

                        <p class="text-base font-semibold text-slate-900 mt-0.5">
                            Сонливость
                        </p>
                    </div>
                </div>
            </div>
            <div
                class="
                rounded-2xl
                border border-blue-100
                bg-blue-50
                p-4
                flex items-center justify-between
                gap-3
            "
            >
                <div class="flex items-center gap-3">
                    <div
                        class="
                        w-11 h-11
                        rounded-xl
                        bg-blue-100
                        flex items-center justify-center
                        text-xl
                    "
                    >
                        😊
                    </div>

                    <div>
                        <p class="text-xs font-semibold text-blue-500 uppercase">
                            Настроение
                        </p>

                        <p class="text-base font-semibold text-slate-900 mt-0.5">
                            Хорошее
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>


