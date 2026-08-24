import { computed, ref } from "vue";
import { defineStore } from 'pinia'

import {
    login as loginRequest,
    logout as logoutRequest,
    refresh as refreshRequest,
    logoutAll as logoutAllRequest,
    register as registerRequest
} from "@/features/auth/api/authApi.ts"

import type {
    LoginRequest,
    RegisterRequest
} from "@/features/auth/types/auth.ts"

import { setAccessToken } from "@/services/auth/token.ts"


export const useAuthStore = defineStore("auth", () => {
    const accessToken = ref<string | null>(null)
    const refreshToken = ref<string | null>(null)

    const initialized = ref(false)
    const loading = ref(false)

    const isAuthenticated = computed(() => accessToken.value !== null)

    async function login(
        request: LoginRequest
    ): Promise<void> {
        loading.value = true;

        try {
            const response = await loginRequest(request)
            refreshToken.value = response.refresh_token
            setAccessToken(response.access_token)
        } finally {
            loading.value = false;
        }
    }

    async function register(
        request: RegisterRequest
    ): Promise<void> {
        loading.value = true;

        try {
            const response = await registerRequest(request)
            refreshToken.value = response.refresh_token
            setAccessToken(response.access_token)
        } finally {
            loading.value = false
        }
    }

    async function refresh(): Promise<boolean> {
        if (!refreshToken.value) {
            return false
        }

        try {
            const response = await refreshRequest({refresh_token: refreshToken.value})
            refreshToken.value = response.refresh_token
            accessToken.value = response.access_token
            setAccessToken(response.access_token)
            return true;
        } catch {
            clearAuthentication()
            return false
        }
    }

    async function logout(): Promise<void> {
        if (!refreshToken.value) {
            clearAuthentication()
            return
        }
        try {
            await logoutRequest({refresh_token: refreshToken.value})
        } finally {
            clearAuthentication()
        }
    }

    async function logoutAll(): Promise<void> {
        try {
            await logoutAllRequest();
        } finally {
            clearAuthentication()
        }
    }

    function clearAuthentication(): void {
        accessToken.value = null
        refreshToken.value = null
        setAccessToken(null)
    }


    return {
        accessToken,
        refreshToken,
        initialized,
        loading,
        isAuthenticated,

        login,
        register,
        refresh,
        logout,
        logoutAll,
        clearAuthentication
    }

})