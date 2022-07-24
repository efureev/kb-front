import { useAuthApi, authEndpoint } from '@/services/auth'
import { useAuth } from '@/services/auth/auth'

export const useProviders = () => {
  const { loading, errorMessage, data, doRequest } = useAuthApi('providers')

  doRequest()

  return {
    loading,
    errorMessage,
    providers: data
  }
}

export const authorizeWithProvider = (prov: string) => {
  return new Promise((resolve, reject) => {
    const url = window.location.href + '?close=true'
    const eurl = encodeURIComponent(url)
    // http://id.kb.x/auth/github/login?id=auth-example&from=http%3A%2F%2Fkb.x%2F%3Fclose%3Dtrue
    const win = window.open(authEndpoint + '/' + prov + '/login?id=auth-example&from=' + eurl)
    if (!win) {
      return reject(new Error('missing window'))
    }

    const interval = setInterval(() => {
      try {
        if (win.closed) {
          reject(new Error('Login aborted'))
          clearInterval(interval)
          return
        }

        if (win.location.search.indexOf('error') !== -1) {
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
      } catch (e) {
      }
    }, 1000)
  })
}

export const loginWithProvider = (prov: string) => {
  return authorizeWithProvider(prov).then(useAuth)
}
