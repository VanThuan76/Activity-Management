import { AxiosResponse } from 'axios'
import { https, httpsNoToken } from '../config/https.config'
import { IBaseResponse } from '@/typeDefs/baseReponse.type'
import { IFeedBacks } from '@/typeDefs/schema/feedback.type'

class FeedbackService {
  getAllFeedback(): Promise<AxiosResponse<IBaseResponse<IFeedBacks>>> {
    return https.get('/admin/feedback')
  }
//   getActivityById(id: number): Promise<AxiosResponse<IBaseResponse<IActivity>>> {
//     return httpsNoToken.get(`/activities/${id}`)
//   }
//   newActivity(body: { name: string; description: string; location: string; skills: string[] }) {
//     return https.post('/organizer/create_activity', body)
//   }
//   updateActivity(id: number, body: { name: string; description: string; location: string; skills: string[] }) {
//     return https.put(`/organizer/update_activity/${id}`, body)
//   }
//   deleteActivity(id: number) {
//     return https.delete(`/admin/activity/${id}`)
//   }
}

export const feedbackService = new FeedbackService()
