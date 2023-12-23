import { IFeedback } from './feedback.type'

export interface IActivityList {
  activities: IActivity[]
}
export interface IActivity {
  id: number
  creator_id: number
  creator: string
  name: string
  description: string
  image: string
  location: string
  num_of_volunteers: number
  status: number
  created_at: string
  updated_at: string
  feedback?: IFeedback[]
  volunteersApplied?: IAppliedVolunteerMapped[]
}
export interface IAppliedVolunteers {
  appliedVolunteers: IAppliedVolunteer[]
}

export interface IAppliedVolunteer {
  id: number
  user_id: number
  activity_id: number
  status: number
  created_at: string
  updated_at: string
}

interface IAppliedVolunteerMapped {
  id: number
  name: string
  avatar: string
  status: number
  created_at: string
  updated_at: string
}
