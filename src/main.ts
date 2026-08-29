import './assets/main.css'
//import './assets/login.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import router from './router'

import {useAuthStore} from "@/features/auth/stores/auth.ts";
import { registerLicense } from '@primeui/license-manager'

registerLicense({
    primeui: import.meta.env.VITE_PRIMEUI_LICENSE
});

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false,
        },
    },
})

const auth = useAuthStore(pinia)
await auth.initialize()

app.mount('#app')
