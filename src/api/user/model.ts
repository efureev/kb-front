import type { UserInfo } from '#/store'

/**
 * @description: Get user information return value
 */
export interface ResponseUserStatusModel {
  status: string
  logged: boolean
  user?: UserInfo
}

export interface ResponseProvidersModel {
  [key: number]: string
}
