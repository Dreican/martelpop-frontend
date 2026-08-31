import {createI18n} from 'vue-i18n'

import en from './locales/en'
import fr from './locales/fr'
import {getStoredLocale, setStoredLocale} from "@/i18n/locale.ts";

const storedLocale = getStoredLocale()

export const i18n = createI18n({
    legacy: false,
    locale: storedLocale ?? 'fr',
    fallbackLocale: 'en',
    messages: {
        en,
        fr,
    },
})

export function setLocale(locale: 'en' | 'fr'): void {
    i18n.global.locale.value = locale
    setStoredLocale(locale)
}