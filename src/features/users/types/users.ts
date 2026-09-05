import type {RoleSummaryResponse} from "@/features/auth/types/roles.ts";

export interface UserSummaryResponse {
    id: string
    slug: string
    display_name: string
    avatar_url: string | null
}

export interface UserResponse extends UserSummaryResponse {
    email: string
    firstname: string
    lastname: string
    municipality: string
    date_of_birth: Date
    roles: RoleSummaryResponse
    status: string
    created_at: Date

}


export interface UserAdminResponse extends UserResponse {
    deleted_at: Date | null
    updated_at: Date
}

export interface UserUpdateRequest {
    "email": string,
    "display_name": string,
    "firstname": string,
    "lastname": string,
    "municipality": string,
    "date_of_birth": Date
}