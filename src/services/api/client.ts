import {ApiError} from "@/services/api/errors.ts";

const API_URL = import.meta.env.VITE_API_URL;

import { getAccessToken } from "@/services/auth/token.ts";

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const headers = new Headers(options.headers)
    const accessToken = getAccessToken()

    if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`)
    }

    if (
        options.body &&
        !(options.body instanceof FormData) &&
        !headers.has('Content-Type')
    ) {
        headers.set('Content-Type', 'application/json')
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
        credentials: 'include'
    });

    if (!response.ok) {
        await createApiError(response);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    const contentType = response.headers.get('content-type')

    if (contentType?.includes('application/json')) {
        return response.json() as Promise<T>
    }

    return response.text() as T;

}

export async function apiFetchBlob(
    path: string,
    options: RequestInit = {}
): Promise<Blob> {
    const response = await fetch(`${API_URL}${path}`, options)

    if (!response.ok) {
        await createApiError(response);
    }

    return response.blob();
}


async function createApiError(response: Response): Promise<ApiError> {
    let detail: unknown
    const contentType = response.headers.get('content-type')

    if (contentType?.includes('application/json')) {
        try {
            const body: unknown = await response.json()

            if (
                typeof body === 'object' &&
                body !== null &&
                'detail' in body
            ) {
                detail = body.detail
            } else {
                detail = body
            }

        } catch {
            detail = undefined
        }
    } else {
        detail = await response.text()
    }
    throw new ApiError(response.status, detail)
}