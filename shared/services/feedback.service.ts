import { AxiosResponse } from 'axios';
import { https } from '../config/https.config';
import { IFeedback, IFeedbackList } from '@/typeDefs/schema/feedback.type';
import { IBaseResponse } from '@/typeDefs/baseReponse.type';


class FeedbackService {
    getAllFeedback(): Promise<AxiosResponse<IBaseResponse<IFeedbackList>>> {
        return https.get('/admin/feedback')
    }
    // getFeedbackById(id: number): Promise<AxiosResponse<IBaseResponse<IFeedback>>> {
    //     return https.get(`/admin/feedbacks/${id}`)
    // }
    newFeedback(body: { feedbackname: string, password: string }) {
        return https.post("/register", body)
    }
    updateFeedback(id: number, body: { feedbackname: string, password: string }) {
        return https.put(`/admin/feedbacks/${id}`, body)
    }
    deleteFeedback(id: number) {
        return https.delete(`/admin/feedbacks/${id}`)
    }
}

export const feedbackService = new FeedbackService()
