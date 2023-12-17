export interface IVolunteerRequestList {
    volunteerRequests: IVolunteerRequest[];
}
export interface IVolunteerRequest {
    id: number;
    user_id: number;
    organization_id: number;
    status: number;
    created_at: string;
    updated_at: string;
}