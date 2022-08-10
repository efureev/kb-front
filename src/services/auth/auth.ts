import type { Ref } from 'vue'
import { watch } from 'vue'
import type { UserContract } from './user'

import { setAuth, unsetAuth, useAuthApi } from '@/services/auth'

interface AuthUserStatus {
  status: string
  logged: boolean
  user?: UserContract
}

let checkUserOnceDone = false

const checkUserStatus = (immediately = false) => {
  const { loading, error, errorMessage, data, doRequest } = useAuthApi('status')

  if (!checkUserOnceDone || immediately) {
    doRequest()
    checkUserOnceDone = true
  }

  return {
    loading,
    error,
    errorMessage,
    userStatus: data as Ref<AuthUserStatus>,
    doRequest,
  }
}

export const useAuth = (immediately = false) => {
  const { loading, error, errorMessage, userStatus } = checkUserStatus(immediately)

  watch([loading], () => {
    if (error.value)
      unsetAuth(error.value)

    else if (userStatus.value.logged)
      setAuth(userStatus.value.user as UserContract)
  })

  return {
    loading,
    errorMessage,
    userStatus,
  }

  // const userStore = useUserStore()

  /* const authorize = (): void => {
     post()
       .then(() => {
         setUser(data.value, payload.rememberMe);
         router.push({name: "private"});
       });
   }
 */
  /* const setUser = (payload: User, remember: boolean): void => {
    if (remember) {
      window.localStorage.setItem(AUTH_KEY, payload[AUTH_TOKEN])
    }

    userStore.setUser(payload)
    state.user = userStore.getUser()
    state.error = undefined
  } */

  /* const logout = (): Promise<void> => {
     window.localStorage.removeItem(AUTH_KEY)
     return Promise.resolve((state.user = undefined) && userStore.clearUser())
   } */

  /* return {
    authorize,
    setUser,
    logout,
    ...toRefs(state),
  }
*/
}