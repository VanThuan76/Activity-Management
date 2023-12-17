import { AxiosResponse } from 'axios';
import { https, httpsNoToken } from '../config/https.config';
import { IBaseResponse } from '@/typeDefs/baseReponse.type';
import { ISkills } from '@/typeDefs/schema/skill.type';


class SkillService {
    getAllSkill(): Promise<AxiosResponse<IBaseResponse<ISkills>>> {
        return httpsNoToken.get('/skills')
    }
    // getUserById(id: number): Promise<AxiosResponse<IBaseResponse<IUser>>> {
    //     return https.get(`/admin/users/${id}`)
    // }
    // newUser(body: { username: string, password: string }) {
    //     return https.post("/register", body)
    // }
    // updateUser(id: number, body: { username: string, password: string }) {
    //     return https.put(`/admin/users/${id}`, body)
    // }
    // deleteUser(id: number) {
    //     return https.delete(`/admin/users/${id}`)
    // }
}

export const skillService = new SkillService()
