import { AxiosResponse } from 'axios'
import { https, httpsNoToken } from '../config/https.config'
import { IBaseResponse } from '@/typeDefs/baseReponse.type'
import { IActivity, IActivityList } from '@/typeDefs/schema/activity.type'

class ActivityService {
  getAllActivity(): Promise<AxiosResponse<IBaseResponse<IActivityList>>> {
    return httpsNoToken.get('/activities')
  }
  applyActivity(body: { activity_id: number }) {
    return https.post('/apply_volunteer', body)
  }
  getActivityById(id: number): Promise<AxiosResponse<IBaseResponse<IActivity>>> {
    return httpsNoToken.get(`/activities/${id}`)
  }
  newActivity(body: { name: string; description: string; location: string; skills: string[] }) {
    return https.post('/organizer/create_activity', body)
  }
  updateActivity(id: number, body: { name: string; description: string; location: string; skills: string[] }) {
    return https.put(`/organizer/update_activity/${id}`, body)
  }
  deleteActivity(id: number) {
    return https.delete(`/admin/activity/${id}`)
  }
}

export const activityService = new ActivityService()
