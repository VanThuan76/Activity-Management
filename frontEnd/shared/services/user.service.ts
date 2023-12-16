import { AxiosResponse } from 'axios';
import { https } from '../config/https.config';
import { IUser, IUserList } from '@/typeDefs/schema/user.type';
import { IBaseResponse } from '@/typeDefs/baseReponse.type';


class UserService {
    getAllUser(): Promise<AxiosResponse<IBaseResponse<IUserList>>> {
        return https.get('/admin/users')
    }
    getUserById(id: number): Promise<AxiosResponse<IBaseResponse<IUser>>> {
        return https.get(`/admin/users/${id}`)
    }
    newUser(body: { username: string, password: string }) {
        return https.post("/register", body)
    }
    updateUser(id: number, body: { username: string, password: string }) {
        return https.put(`/admin/users/${id}`, body)
    }
    deleteUser(id: number) {
        return https.delete(`/admin/users/${id}`)
    }
}

export const userService = new UserService()
