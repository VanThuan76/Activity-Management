import { AxiosResponse } from 'axios'
import { https, httpsNoToken } from '../config/https.config'
import { IBaseResponse } from '@/typeDefs/baseReponse.type'
import { IOrganization } from '@/typeDefs/schema/organization.type'

class OrganizationService {
  // getAllOrganization(): Promise<AxiosResponse<IBaseResponse<IOrganizations>>> {
  //     return httpsNoToken.get('/Organizations')
  // }
  // getUserById(id: number): Promise<AxiosResponse<IBaseResponse<IUser>>> {
  //     return https.get(`/admin/users/${id}`)
  // }
  newOrganization(body: {
    name: string
    location: string
    description: string
  }): Promise<AxiosResponse<IBaseResponse<IOrganization>>> {
    return https.post('/create_organization', body)
  }
  requestBecomeOrganization(body: { organization_id: number }) {
    return https.post('/request_organization', body)
  }
  // updateUser(id: number, body: { username: string, password: string }) {
  //     return https.put(`/admin/users/${id}`, body)
  // }
  // deleteUser(id: number) {
  //     return https.delete(`/admin/users/${id}`)
  // }
}

export const organizationService = new OrganizationService()
