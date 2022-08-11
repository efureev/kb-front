import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import type { Router } from 'vue-router'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuard } from '@/router/mw'
import type { AppRouteRecordRaw } from '@/router/types'
import { PageEnum } from '@/enums/pageEnum'
// import installMiddleware from './mw'
// import { setupRouterGuard } from './mw'

export const routes = setupLayouts(generatedRoutes)

// if (import.meta.env.DEV)
//   console.log(routes)

let router: Router

export default function getRouter(): Router {
  if (!router)
    router = createRouterInstance()

  return router
}

export function createRouterInstance(routeBase?: string): Router {
  const routerHistory = import.meta.env.SSR === false ? createWebHistory(routeBase) : createMemoryHistory()

  router = createRouter({
    history: routerHistory,
    routes,
  })

  setupRouterGuard(router)
  // installMiddleware(router, store)
  return router
}

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
}

/*
export default function (store: Pinia, routeBase?: string): Router {
  const routerHistory = import.meta.env.SSR === false ? createWebHistory(routeBase) : createMemoryHistory()

  const router = createRouter({
    history: routerHistory,
    routes,
  })

  // setupRouterGuard(router)
  // installMiddleware(router, store)

  return router
} */
