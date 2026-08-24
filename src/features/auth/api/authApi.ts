import { apiFetch } from "@/services/api/client.ts";

import type {
    LoginRequest,
    RegisterRequest,
    RefreshRequest,
    TokenResponse,
    LogoutRequest
} from "@/features/auth/types/auth.ts";

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

export function refresh(
    request: RefreshRequest
): Promise<TokenResponse> {
    return apiFetch<TokenResponse>("/auth/refresh", {
        method: "POST",
        body: JSON.stringify(request),
    });
}

export function logout(
    request: LogoutRequest
): Promise<void> {
    return apiFetch("/auth/logout", {
        method: "POST",
        body: JSON.stringify(request),
    });
}

export function logoutAll(): Promise<void> {
    return apiFetch("/auth/logout-all", {
        method: "POST",
    });
}