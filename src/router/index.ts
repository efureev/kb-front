import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import type { Router } from 'vue-router'
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from 'vue-router'

import type { Pinia } from 'pinia'
import installMiddleware from './mw'

export const routes = setupLayouts(generatedRoutes)

// if (import.meta.env.DEV)
//   console.log(routes)

export default function (store: Pinia, routeBase?: string): Router {
  const routerHistory = import.meta.env.SSR === false ? createWebHistory(routeBase) : createMemoryHistory()

  const router = createRouter({
    history: routerHistory,
    routes,
  })
  installMiddleware(router, store)

  return router
}
