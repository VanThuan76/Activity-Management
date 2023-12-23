export interface IRequestVolunteers {
  requestVolunteers: IRequestVolunteer[]
}

export interface IRequestVolunteer {
  id: number
  user_id: number
  organization_id: number
  status: number
  created_at?: any
  updated_at?: any
}

export interface IVolunteerGroupOrganizer {
  id: number
  user_id: number
  organization_id: number
  name: string
  avatar: string
  status: number
  created_at?: any
  updated_at?: any
}
