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
