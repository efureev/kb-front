// import { useRouter } from 'vue-router'
// import { useAuth, AUTH_TOKEN } from './auth'
import toQueryString from '@feugene/mu/src/object/toQueryString.js'
import type { AxiosInstance } from 'axios'
import { createRequest } from './request'

/*

export const useApiWithAuth = (endpoint: string) => {
  const {user} = useAuth()

  return useApi(endpoint, user?.value ? user.value[AUTH_TOKEN] : undefined)
}
*/

export const useApi = (endpoint: string, api?: AxiosInstance) => {
  if (api === undefined)
    api = createRequest()

  const data = ref()
  const loading = ref<boolean>(false)
  const error = ref<Error | undefined>()

  const postRequest = (payload?: Record<string, any>) => {
    loading.value = true
    error.value = undefined

    return api && api.post(endpoint, payload, { withCredentials: true })
      .then((res: any) => {
        data.value = res.data
      })
      .catch((e: Error) => {
        error.value = e

        throw e
      })
      .finally(() => loading.value = false)
  }

  const doRequest = (query?: Record<string, any>) => {
    loading.value = true
    error.value = undefined

    let queryString = ''

    if (query)
      queryString = `?${toQueryString(query)}`

    /*    const cloneData = makeRequestOptions(data)

        cloneData.credentials= 'include'
        cloneData.mode= 'cors'

        return fetch(endpoint + queryString, cloneData)
          .then((res: any) => data.value = res.data)
          .catch((e: Error) => {
            error.value = e

            throw e
          })
          .finally(() => loading.value = false)
        */

    return api && api.get(endpoint + queryString, { withCredentials: true })
      .then((res: any) => data.value = res.data)
      .catch((e: Error) => {
        error.value = e

        throw e
      })
      .finally(() => loading.value = false)
  }

  const errorMessage = computed(() => {
    if (error.value)
      return error.value.message

    return null
  })

  /**

   // @ts-ignore
   const del = () => {
      loading.value = true
      error.value = undefined

      return api.delete(endpoint)
        .then((res: any) => data.value = res.data)
        .catch((e: Error) => {
          error.value = e

          throw e
        })
        .finally(() => loading.value = false)
    }

   const errorDetails = computed(() => {
      if (error.value && error.value.response) {
        return error.value.response.data.message
      }
    })

   const errorFields = computed(() => {
      if (error.value && Array.isArray(error.value.response.data.message)) {

        return (error.value.response.data.message as string[]).reduce((acc: Record<string, any>, msg: string) => {
          let [field] = msg.split(' ')

          // TODO: Maximal...
          if (field == 'maximal') {
            field = 'dateOfBirth'
          }

          if (!acc[field]) {
            acc[field] = []
          }

          acc[field].push(msg)

          return acc
        }, {})
      }
    })

   const computedClasses = (key: string) => {
      if (errorFields.value?.hasOwnProperty(key)) {
        return ['border-red-600', 'bg-red-200', 'text-red-900']

      }
      return ['border-grey-600', 'bg-white', 'text-gray-900']
    }
   */

  /* watch([error], () => {
    // If 401 Unauthorised, force user to buy a new subscription
    if (error.value.response.status === 401 && router) {
      router.push('/subscribe')
    }
  }) */

  return {
    loading,
    data,
    error,
    // get,
    postRequest,
    doRequest,
    // del,
    errorMessage,
    // errorDetails,
    // errorFields,
    // computedClasses,
  }
}
