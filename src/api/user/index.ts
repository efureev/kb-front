import type { Ref } from 'vue'
import { authEndpoint } from './paths'
import type { ResponseUserStatusModel } from './model'
import { useApi, useApiWithAuth } from '@/utils/http/axios'

enum Api {
  Status = '/status',
  Logout = '/logout',
}

export { authEndpoint }

export const useApiForAuthModule = (endpoint: string, withAuth = true) => {
  const url = `${authEndpoint}/${endpoint}`

  return withAuth ? useApiWithAuth(url) : useApi(url)
}

export function getUserStatus() {
  const { doGetRequest, loading, data, error, errorMessage } = useApiForAuthModule(Api.Status)

  const response: Promise<ResponseUserStatusModel> = doGetRequest<ResponseUserStatusModel>()

  return {
    loading,
    error,
    errorMessage,
    userStatus: data as Ref<ResponseUserStatusModel>,
    response,
  }
}

export function doLogout() {
  const { doGetRequest } = useApiForAuthModule(Api.Logout)

  return doGetRequest()
}

/*

interface IResponse<T> {
  code: number
  data: T
  msg: string
}

export interface IFruitItem {
  id: number
  name: string
  price: number
}

export const getFruitList = async () => {
  const { data } = await Axios.get<IResponse<IFruitItem[]>>('/justTest/getFruitList')
  if (data.code === 0)
    return data.data

  return []
}
*/
