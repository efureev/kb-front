import { Router } from 'vue-router'
import authMiddleware from './auth'
import ssrMiddleware from './ssr'
import { Pinia } from 'pinia'

export default function installMiddleware(router: Router, store: Pinia) {
  [authMiddleware].forEach(mdw => {
    router.beforeEach(mdw())
  })

  router.beforeResolve(ssrMiddleware(router, store))
}
