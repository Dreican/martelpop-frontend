import {apiFetch} from "@/services/api/client.ts";

import type {RegisterRequest, TokenResponse,} from "@/features/auth/types/auth.ts";
import type {UserResponse} from "@/features/users/types/users.ts";

export function me(
): Promise<UserResponse> {
    return apiFetch("/users/me", {
        method: "GET"
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