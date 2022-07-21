import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import {
  Router,
  createRouter,
  createWebHistory,
  createMemoryHistory
} from 'vue-router'

import installMiddleware from './mw'
import { Pinia } from 'pinia'

export const routes = setupLayouts(generatedRoutes)

if (import.meta.env.DEV) {
  console.log(routes)
}

export default function (store: Pinia, routeBase?: string): Router {
  const routerHistory = import.meta.env.SSR === false ? createWebHistory(routeBase) : createMemoryHistory()

  const router = createRouter({
    history: routerHistory,
    routes
  })
  installMiddleware(router, store)

  return router
}
