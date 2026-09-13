import type {EventStatusSummaryResponse} from "@/features/events/type/event_statues.ts";
import type {ActivityTypeSummaryResponse} from "@/features/events/type/activity_types.ts";

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
