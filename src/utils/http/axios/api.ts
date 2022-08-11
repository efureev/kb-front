// import { useRouter } from 'vue-router'
// import { useAuth, AUTH_TOKEN } from './auth'
import toQueryString from '@feugene/mu/src/object/toQueryString'
import type { AxiosInstance } from 'axios'
import { createAxiosAuthRequest, createAxiosRequest } from './request'

/*

export const useApiWithAuth = (endpoint: string) => {
  const {user} = useAuth()

  return useApi(endpoint, user?.value ? user.value[AUTH_TOKEN] : undefined)
}
*/

export const useApi = (endpoint: string, axiosInstance: AxiosInstance = createAxiosRequest()) => {
  const data = ref()
  const loading = ref<boolean>(false)
  const error = ref<Error | undefined>()

  const doPostRequest = (payload?: Record<string, any>) => {
    loading.value = true
    error.value = undefined

    return axiosInstance.post(endpoint, payload, { withCredentials: true })
      .then((res: any) => {
        data.value = res.data
      })
      .catch((e: Error) => {
        error.value = e

        throw e
      })
      .finally(() => loading.value = false)
  }

  const doGetRequest = <T>(query?: Record<string, any>): Promise<T> => {
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

    return axiosInstance.get(endpoint + queryString, { withCredentials: true })
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
    doPostRequest,
    doGetRequest,
    // del,
    errorMessage,
    // errorDetails,
    // errorFields,
    // computedClasses,
  }
}

export const useApiWithAuth = (endpoint: string, axiosInstance: AxiosInstance = createAxiosAuthRequest()) => {
  return useApi(endpoint, axiosInstance)
}
