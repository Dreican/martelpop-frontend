import {apiFetch, apiFetchBlob} from "@/services/api/client.ts";

import type {UserResponse, UserSummaryResponse, UserUpdateRequest} from "@/features/users/types/users.ts";

export function me(): Promise<UserResponse> {
    return apiFetch("/users/me", {
        method: "GET"
    });
}

export function user(slug: string): Promise<UserSummaryResponse> {
    return apiFetch(`/users/${slug}`, {
        method: "GET"
    });
}

export function update_me(request: UserUpdateRequest): Promise<UserResponse> {
    return apiFetch("/users/me", {
        method: "PATCH",
        body: JSON.stringify(request),
    });
}

export function delete_me(): Promise<void> {
    return apiFetch("/users/me", {
        method: "DELETE",
    });
}

export function upload_avatar(file: File): Promise<void> {
    return apiFetch("/users/me/avatar", {
        method: "POST",
        body: file,
    });
}

export function delete_avatar(): Promise<void> {
    return apiFetch("/users/me/avatar", {
        method: "DELETE",
    });
}

export function get_avatar(slug: string): Promise<Blob> {
    return apiFetchBlob(`/users/${slug}/avatar`, {
        method: "GET",
    });
}