import {refresh} from '@/features/auth/api/authApi'
import {setAccessToken} from '@/services/auth/token'

let refreshPromise: Promise<boolean> | null = null

export async function refreshAccessToken(): Promise<boolean> {
    if (refreshPromise) {
        return refreshPromise
    }

    refreshPromise = performRefresh()

    try {
        return await refreshPromise
    } finally {
        refreshPromise = null
    }
}



async function performRefresh(): Promise<boolean> {
    try {
        const response = await refresh()
        return true
    } catch {
        setAccessToken(null)
        return false
    }
}