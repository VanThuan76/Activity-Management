import { APP_SAVE_KEYS } from '@/constant/AppConstant'
import { authService } from '@/services/auth.service'
import { IBaseResponse } from '@/typeDefs/baseReponse.type'
import axios, { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'

declare module 'axios' {
  export interface AxiosRequestConfig {
    throwAccessDenied?: boolean
  }
}
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

class AxiosConfig {
  baseUrl = BASE_URL
  token = getCookie(APP_SAVE_KEYS.KEYS) || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZV9pZCI6Mywib3JnYW5pemF0aW9uX2lkIjpudWxsLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicGhvbmUiOiIwMzMyNjI4NjY2IiwiZ2VuZGVyIjoxLCJiaXJ0aGRheSI6IjE5OTAtMDEtMDFUMDA6MDA6MDAuMDAwWiIsImFkZHJlc3MiOiIxMjMgTWFpbiBTdHJlZXQiLCJhdmF0YXIiOiJodHRwczovL2V4YW1wbGUuY29tL2F2YXRhci5qcGciLCJzdGF0dXMiOjAsImNyZWF0ZWRfYXQiOiIyMDIzLTEyLTAxVDAyOjQwOjI2LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyMy0xMi0wMVQwMjo0MDoyNi4wMDBaIiwiaWF0IjoxNzAyNDQwMTcyfQ.GFxgbOvN940c4WPfjx6G3IAYMEUWkBf-YcwYVChZKgg"
  axiosConfig = {
    baseURL: this.baseUrl,
    headers: {
      'Accept-Language': 'en-US',
      'Content-Type': 'application/json'
    }
  }

  get getAxiosInstance() {
    const axiosInstance = axios.create(this.axiosConfig)
    axiosInstance.interceptors.request.use(req => {
      if (this.token && req.headers) req.headers['Authorization'] = `Bearer ${this.token}`
      return req
    })
    axiosInstance.interceptors.response.use(
      response => response,
      async (error) => {
        return Promise.reject(error)
      }
    )
    return axiosInstance
  }
  get getAxiosInstanceNoAuth() {
    const axiosInstance = axios.create(this.axiosConfig)
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 403) {
          // redirect
          return Promise.reject(error)
        }
        return Promise.reject(error)
      }
    )
    return axiosInstance
  }
}
export const https = new AxiosConfig().getAxiosInstance
export const httpsNoToken = new AxiosConfig().getAxiosInstanceNoAuth