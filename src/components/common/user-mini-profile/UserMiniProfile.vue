<script setup lang="ts">
import {computed} from "vue";

interface User {
  fullName: string
  username: string
  status: 'в сети' | 'не в сети' | 'отошел'
  avatarUrl: string
}

const user: User = {
    fullName: 'Иванов Иван Иванович',
    username: 'testov',
    status: 'в сети',
    avatarUrl: 'https://dialog.com/media/images/stub.png'
}

const statusColor = computed(() => {
  switch (user.status) {
    case 'в сети':
      return 'bg-green-500'
    case 'отошел':
      return 'bg-yellow-400'
    case 'не в сети':
      return 'bg-gray-400'
    default:
      return 'bg-gray-400'
  }
})
</script>

<template>
    <div class="flex items-start gap-4 bg-white rounded-xl w-full">
        <div class="h-16 w-16 rounded overflow-hidden shadow rounded-full border-2">
            <img
                :src="user.avatarUrl"
                alt="Аватар"
                class="w-full h-full object-cover"
            />
        </div>

        <div class="flex flex-col">
            <div class="text-sm text-gray-500">@{{ user.username }}</div>
            <div class="text-base font-semibold leading-tight">
                {{ user.fullName }}
            </div>
            <div class="text-sm mt-1 flex items-center gap-1">
                <span
                :class="statusColor"
                class="w-2 h-2 rounded-full inline-block"
                >
                </span>
                <span class="text-gray-600">{{ user.status }}</span>
            </div>
        </div>
    </div>
</template>
