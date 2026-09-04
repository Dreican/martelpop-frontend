export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    email: string
    password: string
    firstname: string
    lastname: string
    display_name: string
    municipality: string
    date_of_birth: string
}

export interface TokenResponse {
    access_token: string
    token_type: string
}

