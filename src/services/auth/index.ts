import type { AxiosRequestConfig } from 'axios'
import type { UserContract } from './user'
import { createRequest } from '@/services/request'

import { useApi } from '@/services/api'

export const authServiceHost = computed<string>(() => import.meta.env.VITE_SERVICE_AUTH_URL)
export const authServicePrefix = 'auth'
export const authEndpoint = `${authServiceHost.value}/${authServicePrefix}`

interface AuthState {
  authenticated: boolean
  user?: UserContract
  error?: Error
}

const state = reactive<AuthState>({
  authenticated: false,
  user: undefined,
  error: undefined,
})

export const unsetAuth = (error?: Error) => {
  state.authenticated = false
  state.user = undefined
  state.error = error
}

export const setAuth = (user: UserContract) => {
  state.authenticated = true
  state.user = user
  state.error = undefined
}

export const user = computed<UserContract | undefined>(() => state.user)

export const isAuthenticated = computed<boolean>(() => state.authenticated)

export const api = (data: AxiosRequestConfig = {}) => {
  if (!data.baseURL)
    data.baseURL = authServiceHost.value

  return createRequest(data)
}

export const useAuthApi = (endpoint: string) => {
  return useApi(`${authEndpoint}/${endpoint}`, api())
}

export const logout = (): void => {
  unsetAuth()

  const { doRequest } = useAuthApi('logout')
  doRequest()
}
