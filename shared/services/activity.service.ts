import { AxiosResponse } from 'axios';
import { https, httpsNoToken } from '../config/https.config';
import { IBaseResponse } from '@/typeDefs/baseReponse.type';
import { IActivityList } from '@/typeDefs/schema/activity.type';


class ActivityService {
    getAllActivity(): Promise<AxiosResponse<IBaseResponse<IActivityList>>> {
        return httpsNoToken.get('/activities')
    }
}

export const activityService = new ActivityService()
