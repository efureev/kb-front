import type { Ref } from 'vue'
import { useApiForAuthModule } from './index'
import type { ResponseProvidersModel } from '@/api/user/model'

// import { unref } from 'vue'

enum Api {
  Providers = '/providers',
}

export const useProviders = () => {
  const { doGetRequest, loading, data, errorMessage } = useApiForAuthModule(Api.Providers, false)

  doGetRequest()

  return {
    loading,
    errorMessage,
    // providers: unref(data) as ResponseProvidersModel,
    providers: data as Ref<ResponseProvidersModel>,
  }
}
