import { defineStore } from 'pinia'
// import type { Ref } from 'vue'
import type { UserInfo } from '#/store'
import { store } from '@/store'
import { authEndpoint, doLogout, getUserStatus } from '@/api/user'
import type { ResponseUserStatusModel } from '@/api/user/model'
import router from '@/router'

interface UserState {
  userInfo: Nullable<UserInfo>
  // sessionTimeout?: boolean
  lastUpdateTime: number
  statusHandled: boolean
}

export const useUserStore = defineStore({
  id: 'app-user',

  state: (): UserState => ({
    // user info
    userInfo: null,
    // Whether the login expired
    // sessionTimeout: false,
    // Last fetch time
    statusHandled: false,
    lastUpdateTime: 0,
  }),

  getters: {
    hasStatusHandled(): boolean {
      return this.statusHandled
    },
    isAuthenticated(): boolean {
      return !!this.userInfo
    },

    getUserInfo(): UserInfo {
      return <UserInfo>(this.userInfo || {}) // || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
    },
    /*
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    */
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },

  actions: {
    setUserInfo(info: UserInfo) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      // setAuthCache(USER_INFO_KEY, info)
    },
    /*
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    */
    resetState() {
      this.userInfo = null
      // this.sessionTimeout = false
    },
    /**
     * @description: login
     */
    async getLoginStatus() {
      try {
        const { response } = getUserStatus()

        const userInfo: ResponseUserStatusModel = await response
        this.statusHandled = true

        if (!userInfo.logged)
          return this.resetState()

        this.setUserInfo(<UserInfo>userInfo.user)

        /* watch([loading], () => {
          // eslint-disable-next-line no-console
          console.log(`login: loading: ${loading}`)

          if (error.value)
            return this.resetState()

          if (!userStatus.value.logged)
            return this.resetState()

          this.setUserInfo(<UserInfo>userStatus.value.user)
        }) */

        // return this.afterLoginAction(goHome)
      }
      catch (error) {
        this.resetState()
        return Promise.reject(error)
      }
    },

    /* async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
       if (!this.getToken)
         return null
       // get user info
       const userInfo = await this.getUserInfoAction()

       const sessionTimeout = this.sessionTimeout
       if (sessionTimeout) {
         this.setSessionTimeout(false)
       }
       else {
         const permissionStore = usePermissionStore()
         if (!permissionStore.isDynamicAddedRoute) {
           const routes = await permissionStore.buildRoutesAction()
           routes.forEach((route) => {
             router.addRoute(route as unknown as RouteRecordRaw)
           })
           router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
           permissionStore.setDynamicAddedRoute(true)
         }
         goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME))
       }
       return userInfo
     }, */

    /*  async getUserInfoAction(): Promise<UserInfo | null> {
        if (!this.getToken)
          return null
        const userInfo = await getUserInfo()
        const { roles = [] } = userInfo
        if (isArray(roles)) {
          const roleList = roles.map(item => item.value) as RoleEnum[]
          this.setRoleList(roleList)
        }
        else {
          userInfo.roles = []
          this.setRoleList([])
        }
        this.setUserInfo(userInfo)
        return userInfo
      }, */

    loginWithProvider(provider: string) {
      this.authorizeWithProvider(provider).then(this.getLoginStatus)
    },

    authorizeWithProvider(provider: string): Promise<any> {
      return new Promise((resolve, reject) => {
        const url = `${window.location.href}?close=true`
        const eurl = encodeURIComponent(url)
        // http://id.kb.x/auth/github/login?id=auth-example&from=http%3A%2F%2Fkb.x%2F%3Fclose%3Dtrue
        const win = window.open(`${authEndpoint}/${provider}/login?id=auth-example&from=${eurl}`)
        if (!win)
          return reject(new Error('missing window'))

        const interval = setInterval(() => {
          try {
            if (win.closed) {
              reject(new Error('Login aborted'))
              clearInterval(interval)
              return
            }

            if (win.location.search.includes('error')) {
              reject(new Error(win.location.search))
              win.close()
              clearInterval(interval)
              return
            }

            if (win.location.href.indexOf(url) === 0) {
              resolve('success')
              win.close()
              clearInterval(interval)
            }
          }
          catch (e) {
          }
        }, 1000)
      })
    },

    /**
     * @description: logout
     */
    async logout() {
      await doLogout()
      this.resetState()

      router().push('/')

      /* if (this.getToken) {
         try {
           await doLogout()
         }
         catch {
           console.log('注销Token失败')
         }
       }
       this.setToken(undefined)
       this.setSessionTimeout(false)
       this.setUserInfo(null)
       goLogin && router.push(PageEnum.BASE_LOGIN) */
    },

    /**
     * @description: Confirm before logging out
     */
    /* confirmLoginOut() {
       const { createConfirm } = useMessage()
       const { t } = useI18n()
       createConfirm({
         iconType: 'warning',
         title: () => h('span', t('sys.app.logoutTip')),
         content: () => h('span', t('sys.app.logoutMessage')),
         onOk: async () => {
           await this.logout(true)
         },
       })
     }, */
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
