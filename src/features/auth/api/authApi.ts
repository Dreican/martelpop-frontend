import {apiFetch} from "@/services/api/client.ts";

import type {LoginRequest, RegisterRequest, TokenResponse,} from "@/features/auth/types/auth.ts";

export function login(
    request: LoginRequest
): Promise<TokenResponse> {
    return apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(request),
    });
}

export function register(
    request: RegisterRequest
): Promise<TokenResponse> {
    return apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(request),
    });
}

export function refresh(): Promise<TokenResponse> {
    return apiFetch<TokenResponse>("/auth/refresh", {
        method: "POST",
        skipRefresh: true,
    });
}

export function logout(): Promise<void> {
    return apiFetch("/auth/logout", {
        method: "POST",
    });
}

export function logoutAll(): Promise<void> {
    return apiFetch("/auth/logout-all", {
        method: "POST",
    });
}