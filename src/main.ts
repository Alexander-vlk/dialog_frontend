import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from "@/router";

const app = createApp(App)

const apiUrl = import.meta.env.VITE_BACKEND_API_URL

app.use(createPinia())

app.use(router)

app.mount('#app')
