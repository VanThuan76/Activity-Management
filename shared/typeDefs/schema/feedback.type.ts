export interface IFeedbackList {
    feedbacks: IFeedback[];
}

export interface IFeedback {
    id: number;
    user_id: number;
    activity_id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}