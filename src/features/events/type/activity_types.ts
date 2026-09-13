import type {UserSummaryResponse} from "@/features/users/types/users.ts";

export interface ActivityTypeSummaryResponse {
    id: string
    name: string
    slug: string
    icon_url: string | null
    color: string | null
}

export interface ActivityTypeResponse extends ActivityTypeSummaryResponse {
    description: string | null
    banner_url: string | null
    default_location: string | null
    default_capacity: number | null
    default_duration_minutes: number | null
    default_price: number | null
}

export interface ActivityTypeAdminResponse extends ActivityTypeResponse {
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    deleted_by: UserSummaryResponse | null
    is_default: boolean
}


export interface ActivityTypeCreateRequest {
    name: string
    description: string | null
    color: string | null
    default_location: string | null
    default_capacity: number | null
    default_duration_minutes: number | null
    default_price: number | null
}

export interface ActivityTypeUpdateRequest {
    name: string
    description: string | null
    color: string | null
    default_location: string | null
    default_capacity: number | null
    default_duration_minutes: number | null
    default_price: number | null
}