import type {PermissionSummaryResponse} from "@/features/auth/types/permissions.ts";

export interface RoleSummaryResponse {
    id: string
    code: string
    name: string
}

export interface RoleResponse extends RoleSummaryResponse {
    description: string
    permissions: PermissionSummaryResponse[]
    is_default: boolean
    created_at: Date
    updated_at: Date
}