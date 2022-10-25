import type { Ref } from 'vue'
import { authEndpoint } from './paths'
import type { ResponseTokensModel } from './model'
import { useApiForAuthModule } from '@/api/user/index'
import type { Token } from '@/types/users/token'

enum Api {
  Tokens = 'tokens',
}

export { authEndpoint }

export function getUserAuthTokens(mock = false) {
  if (mock) {
    return {
      tokens: reactive(
        {
          list: <Token[]>[
            {
              id: '123123',
              name: 'dasda',
              last_used_ago: '12',
            },
          ],
        }),
    }
  }

  const { doGetRequest, loading, data, error, errorMessage } = useApiForAuthModule(Api.Tokens)

  const response: Promise<ResponseTokensModel> = doGetRequest<ResponseTokensModel>()

  return {
    loading,
    error,
    errorMessage,
    tokens: data as Ref<ResponseTokensModel>,
    response,
  }
}
