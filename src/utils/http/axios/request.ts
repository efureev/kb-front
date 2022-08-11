import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { getCookies } from './cookies'

export const makeRequestOptions = (data: Record<string, any> = {}, withAuth: boolean): AxiosRequestConfig => {
  const cloneData = { ...data }

  if (cloneData.headers === undefined)
    cloneData.headers = {} as Record<string, string>

  cloneData.headers.Accept = 'application/json'

  if (withAuth) {
    const cookies = getCookies()
    const token = cookies['XSRF-TOKEN']
    if (token)
      cloneData.headers['X-XSRF-TOKEN'] = token
  }

  /*

    if (cloneData.baseURL == undefined) {
      cloneData.baseURL = 'http://id.kb.x/'
    }
  */

  return cloneData
}

export const createAxiosRequest = (data: AxiosRequestConfig = {}, withAuth = false): AxiosInstance => {
  const cloneData = makeRequestOptions(data, withAuth)

  return axios.create(cloneData)
}

export const createAxiosAuthRequest = (data: AxiosRequestConfig = {}): AxiosInstance => {
  return createAxiosRequest(data, true)
}
