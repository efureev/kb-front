import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getCookies } from './utils/cookies'

export const makeRequestOptions = (data: Record<string, any> = {}): RequestInit => {
  const cloneData = { ...data }
  const cookies = getCookies()
  const token = cookies['XSRF-TOKEN']

  if (cloneData.headers === undefined) {
    cloneData.headers = {} as Record<string, string>
  }
  cloneData.headers['Accept'] = 'application/json'
  if (token) {
    cloneData.headers['X-XSRF-TOKEN'] = token
  }
  /*

    if (cloneData.baseURL == undefined) {
      cloneData.baseURL = 'http://id.kb.x/'
    }
  */

  return cloneData
}

export const createRequest = (data: AxiosRequestConfig = {}): AxiosInstance => {
  const cloneData = makeRequestOptions(data)

  return axios.create(cloneData)
}
