export interface IOrganizationList {
    organizations: IOrganization[]
}

export interface IOrganization {
    id: number;
    name: string;
    description: string;
    location: string;
    creator: string;
    status: number;
    created_at: string;
    updated_at: string;
}