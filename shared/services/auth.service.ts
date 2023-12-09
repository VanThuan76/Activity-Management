import { getCookie, setCookie } from 'cookies-next';
import jwt_decode from 'jwt-decode';
import { IBaseResponse } from '../typeDefs/baseReponse.type';
import { AxiosResponse } from 'axios';
import { IAuthen, IJwtDecode } from '../typeDefs/authen.type';
import { https, httpsNoToken } from '@/config/https.config';
import { APP_SAVE_KEYS } from '@/constant/AppConstant';


class AuthService {
  authenticated(body: { username: string; password: string }): Promise<AxiosResponse<IBaseResponse<IAuthen>>> {
    return httpsNoToken.post('/login', body)
  }
  async providerKey() {
    const sessionKey = getCookie(APP_SAVE_KEYS.SESSION_KEY)
    const data: any = httpsNoToken.post('/refresh-token', { refreshToken: sessionKey })
    if (!data.data) return
    const decodeData: IJwtDecode = await jwt_decode(data.data.access_token)
    setCookie(APP_SAVE_KEYS.KEYS, data.access_token, { maxAge: decodeData.exp });
    setCookie(APP_SAVE_KEYS.SESSION_KEY, data.refresh_token)
    setCookie(APP_SAVE_KEYS.ROLE, decodeData.role);
    setCookie(APP_SAVE_KEYS.TIME_EXPIRED, decodeData.exp);
  }

}

export const authService = new AuthService()
