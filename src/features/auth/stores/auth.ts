import {computed, ref} from "vue";
import {defineStore} from 'pinia'

import {
    login as loginRequest,
    logout as logoutRequest,
    logoutAll as logoutAllRequest,
    refresh as refreshRequest,
    register as registerRequest
} from "@/features/auth/api/authApi.ts"

import type {LoginRequest, RegisterRequest} from "@/features/auth/types/auth.ts"

import {setAccessToken} from "@/services/auth/token.ts"
import type {UserResponse} from "@/features/users/types/users.ts";
import {me} from "@/features/users/api/usersApi.ts";


export const useAuthStore = defineStore("auth", () => {
    const loading = ref(false)
    const initialized = ref(false)
    const accessToken = ref<string | null>(null)
    const isAuthenticated = computed(() => accessToken.value !== null)
    const user = ref<UserResponse | null>(null)

    function updateAccessToken(token: string | null): void {
        accessToken.value = token
        setAccessToken(token)
    }

    async function initialize(): Promise<void> {
        if (initialized.value) {
            return
        }

        try {
            const response = await refreshRequest()
            setAccessToken(response.access_token)
            user.value = await me()
        } catch {
            setAccessToken(null)
            user.value = null
        } finally {
            initialized.value = true
            console.log("Auth store initialized")
        }
    }

    async function login(
        request: LoginRequest
    ): Promise<void> {
        loading.value = true;

        try {
            const response = await loginRequest(request)
            updateAccessToken(response.access_token)
            user.value = await me()
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
            updateAccessToken(response.access_token)
        } finally {
            loading.value = false
        }
    }

    async function refresh(): Promise<boolean> {
        try {
            const response = await refreshRequest()
            updateAccessToken(response.access_token)
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
        updateAccessToken(null)
    }

    return {
        loading,
        isAuthenticated,
        user,

        initialize,
        login,
        register,
        refresh,
        logout,
        logoutAll,
        clearAuthentication
    }
})