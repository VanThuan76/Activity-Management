import { AxiosResponse } from 'axios';
import { httpsNoToken } from '../config/https.config';
import { IBaseResponse } from '@/typeDefs/baseReponse.type';
import { IFaqs } from '@/typeDefs/schema/faq.type';

class FaqService {
    getAllFaq(): Promise<AxiosResponse<IBaseResponse<IFaqs>>> {
        return httpsNoToken.get('/faq')
    }
}

export const faqService = new FaqService()
