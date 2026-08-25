import {ApiError} from "@/services/api/errors.ts";
import {getAccessToken} from "@/services/auth/token.ts";
import {refreshAccessToken} from "@/services/auth/refresh.ts";

const API_URL = import.meta.env.VITE_API_URL;

interface ApiFetchOptions extends RequestInit {
    skipRefresh?: boolean
}

export async function apiFetch<T>(
    path: string,
    options: ApiFetchOptions = {}
): Promise<T> {
    const response = await executeWithRefresh(path, options)

    return handleResponse<T>(response)
}

export async function apiFetchBlob(
    path: string,
    options: ApiFetchOptions = {}
): Promise<Blob> {
    const response = await executeWithRefresh(path, options)

    if (!response.ok) {
        throw await createApiError(response)
    }

    return response.blob()
}

async function executeWithRefresh(
    path: string,
    options: ApiFetchOptions,
): Promise<Response> {
    const {
        skipRefresh = false,
        ...requestOptions
    } = options

    let response = await executeRequest(path, requestOptions)

    if (response.status !== 401 || skipRefresh) {
        return response
    }

    const refreshed = await refreshAccessToken()

    if (!refreshed) {
        return response
    }

    return executeRequest(path, requestOptions)
}

async function executeRequest(
    path: string,
    options: RequestInit
): Promise<Response> {
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

    return fetch(`${API_URL}${path}`, {
        ...options,
        headers,
        credentials: 'include'
    });
}

async function handleResponse<T>(
    response: Response,
): Promise<T> {
    if (!response.ok) {
        await createApiError(response)
    }

    if (response.status === 204) {
        return undefined as T
    }

    const contentType = response.headers.get('content-type')

    if (contentType?.includes('application/json')) {
        return await response.json() as T
    }

    return (await response.text()) as T
}

async function createApiError(response: Response): Promise<never> {
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