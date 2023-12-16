export interface IActivityList {
  activities: IActivity[];
}

export interface IActivity {
  id: number;
  creator: number;
  name: string;
  description: string;
  image: string
  location: string;
  num_of_volunteers: number;
  status: number;
  created_at: string;
  updated_at: string;
}