import type {RoleSummaryResponse} from "@/features/auth/types/roles.ts";

export interface PermissionSummaryResponse {
    code: string
    name: string
}

export interface PermissionResponse extends PermissionSummaryResponse {
    description: string
    roles: RoleSummaryResponse[]
}