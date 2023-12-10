import { AxiosResponse } from 'axios';
import { https, httpsNoToken } from '../config/https.config';
import { IUser } from '@/typeDefs/user.type';


class UserService {
    getAllUser(): Promise<AxiosResponse<IUser[]>> {
        return httpsNoToken.get('/admin/users')
    }
    getUserById(id: number): Promise<AxiosResponse<IUser>> {
        return httpsNoToken.get(`/User/${id}`)
    }
    newUser(body: { username: string, password: string }) {
        return httpsNoToken.post("/User", body)
    }
    updateUser(id: number, body: { username: string, password: string }) {
        return httpsNoToken.put(`/User/${id}`, body)
    }
    deleteUser(id: number) {
        return httpsNoToken.delete(`/User/${id}`)
    }
}

export const userService = new UserService()
