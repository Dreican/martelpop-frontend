export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    email: string
    password: string
    firstName: string
    lastName: string
    display_name: string
}

export interface TokenResponse {
    access_token: string
    token_type: string
}

