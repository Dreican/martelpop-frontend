const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const headers = new Headers(options.headers)

    if (
        options.body &&
        !(options.body instanceof FormData) &&
        !headers.has('Content-Type')
    ) {
        headers.set('Content-Type', 'application/json')
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers
    });

    if (!response.ok) {
        throw new Error(`API request failed ${response.status}`);
    }

    return response.json() as Promise<T>;

}