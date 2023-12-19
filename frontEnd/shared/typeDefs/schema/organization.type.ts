import { ICreator } from '../baseReponse.type'
export interface IOrganizations {
  organizations: IOrganization[]
}
export interface IOrganization {
  id: number
  name: string
  description: string
  location: string
  creator: ICreator
  status: number
  created_at: string
  updated_at: string
}
export interface IRequestOrganizations {
  requestOrganizations: IRequestOrganization[]
}
export interface IRequestOrganization {
  id: number
  user: ICreator
  organizer: IOrganization
  status: number
  created_at: string
  updated_at: string
}
