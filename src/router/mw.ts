import type { Router } from 'vue-router'
// import { createPermissionGuard } from '@/router/permission'
import ssrMiddleware from '@/router/ssr'
import { createPermissionGuard } from '@/router/permission'

export function setupRouterGuard(router: Router) {
  // createPageGuard(router)
  // createScrollGuard(router)
  router.$isSSR = import.meta.env.SSR === true

  router.beforeResolve(ssrMiddleware(router))

  createPermissionGuard(router)

  /*
  createPageLoadingGuard(router);
  createHttpGuard(router);
  createScrollGuard(router);
  createMessageGuard(router);
  createProgressGuard(router);
  createPermissionGuard(router);
  createParamMenuGuard(router); // must after createPermissionGuard (menu has been built.)
  createStateGuard(router); */
}

/**
 * Hooks for handling page state
 */
/*
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>()

  router.beforeEach(async (to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!loadedPageMap.get(to.path)
    // Notify routing changes
    // setRouteChange(to);

    return true
  })

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true)
  })
}
*/

// Routing switch back to the top
/*
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return href.startsWith('#')
  }

  const body = document.body

  router.afterEach(async (to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0)
    return true
  })
}
*/

/*

export default function installMiddleware(router: Router, store: Pinia) {
  [authMiddleware].forEach((mdw) => {
    router.beforeEach(mdw())
  })

  router.beforeResolve(ssrMiddleware(router, store))
}
*/
