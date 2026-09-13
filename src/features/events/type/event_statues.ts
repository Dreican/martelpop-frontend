export enum EventStatusCode {
    DRAFT = 'Draft',
    PUBLISHED = 'Published',
    CANCELLED = 'Cancelled',
    COMPLETED = 'Completed',
}


export interface EventStatusSummaryResponse {
    id: string
    code: EventStatusCode
    name: string
}

export interface EventStatusResponse extends EventStatusSummaryResponse {
    description: string | null
    is_default: boolean
    sort_order: number
    is_bookable: boolean
    allow_edit: boolean
}