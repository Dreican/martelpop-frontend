export type SupportedLocale = 'en' | 'fr'

const STORAGE_KEY = 'martelpop.locale'

export function getStoredLocale(): SupportedLocale | null {
    const locale = localStorage.getItem(STORAGE_KEY)

    if (locale === 'en' || locale === 'fr') {
        return locale
    }

    return null
}

export function setStoredLocale(locale: SupportedLocale): void {
    localStorage.setItem(STORAGE_KEY, locale)
}