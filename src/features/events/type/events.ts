import type {EventStatusResponse, EventStatusSummaryResponse} from "@/features/events/type/event_statues.ts";
import type {ActivityTypeSummaryResponse} from "@/features/events/type/activity_types.ts";
import type {UserSummaryResponse} from "@/features/users/types/users.ts";

export enum EventAudience {
    PUBLIC = "PUBLIC",
    MEMBERS = "MEMBERS",
    VIP = "VIP"
}

export interface EventSummaryResponse {
    id: string
    slug: string

    title: string

    start_date: Date | null
    end_date: Date | null

    location: string | null
    banner_url: string | null

    activity_type: ActivityTypeSummaryResponse
    status: EventStatusSummaryResponse
}


export interface EventResponse extends EventSummaryResponse {
    description: string | null

    capacity: number | null
    banner_url: string | null
    activity_type: ActivityTypeSummaryResponse
    creator: UserSummaryResponse
    status: EventStatusSummaryResponse

    is_full: boolean
}

export interface EventAdminResponse extends EventResponse {
    status: EventStatusResponse

    audience: EventAudience

    published_at: Date | null
    cancelled_at: Date | null
    completed_at: Date | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    deleted_by: UserSummaryResponse | null
}

