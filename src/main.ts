import './assets/main.css'
//import './assets/login.css'
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import {i18n} from '@/i18n'

import {useAuthStore} from "@/features/auth/stores/auth.ts";
import {registerLicense} from '@primeui/license-manager'
import {MartelPopPreset} from "./theme/martelpop";

registerLicense({
    primeui: import.meta.env.VITE_PRIMEUI_LICENSE
});

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

app.use(PrimeVue, {
    theme: {
        preset: MartelPopPreset,

        options: {
            darkModeSelector: false, //'system',
            primaryColor: '#06b6d4',
        },
    },
})

const auth = useAuthStore(pinia)
await auth.initialize()

app.mount('#app')
