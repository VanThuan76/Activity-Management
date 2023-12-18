export interface IFeedBacks {
  feedbacks: IFeedback[];
}

export interface IFeedback {
  id: number;
  user_id: number;
  activity_id: number;
  title: string;
  content: string;
  created_at?: any;
  updated_at?: any;
}