import type { Router } from 'vue-router'
import type { Pinia } from 'pinia'
import authMiddleware from './auth'
import ssrMiddleware from './ssr'

export default function installMiddleware(router: Router, store: Pinia) {
  [authMiddleware].forEach((mdw) => {
    router.beforeEach(mdw())
  })

  router.beforeResolve(ssrMiddleware(router, store))
}
