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

import {
    getAccessToken,
    setAccessToken
} from "@/services/auth/token.ts"


export const useAuthStore = defineStore("auth", () => {
    const loading = ref(false)

    const isAuthenticated = computed(() => getAccessToken() !== null)

    async function login(
        request: LoginRequest
    ): Promise<void> {
        loading.value = true;

        try {
            const response = await loginRequest(request)
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
            setAccessToken(response.access_token)
        } finally {
            loading.value = false
        }
    }

    async function refresh(): Promise<boolean> {
        try {
            const response = await refreshRequest()
            setAccessToken(response.access_token)
            return true;
        } catch {
            clearAuthentication()
            return false
        }
    }

    async function logout(): Promise<void> {
        try {
            await logoutRequest()
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
        setAccessToken(null)
    }

    return {
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