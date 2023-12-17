export interface IOrganizationRequestList {
    organizationRequests: IOrganizationRequest[];
}

export interface IOrganizationRequest {
    id: number;
    user_id: number;
    organization_id: number;
    status: number;
    created_at: string;
    updated_at: string;
}