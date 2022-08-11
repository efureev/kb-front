import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createHead, renderHeadToString } from '@vueuse/head'
import { ID_INJECTION_KEY } from 'element-plus'
import type { RouteComponent } from 'vue-router'
import { installI18n } from './i18n'
import { setupStore } from './store'
import { getAppRouteCtx } from './utils/routeCtx'
import { createRouterInstance } from './router'
import { isPromise } from './utils'
import App from './app.vue'
import type { ServerCtx } from '#/server'

function renderPreloadLinks(modules: Set<string>, manifest: Record<string, string[]>) {
  let links = ''
  const seen = new Set()
  modules.forEach((id: string) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file: string) => {
        if (!seen.has(file)) {
          seen.add(file)
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink(file: string): string {
  if (file.endsWith('.js'))
    return `<link rel="modulepreload" crossorigin href="${file}">`
  else if (file.endsWith('.css'))
    return `<link rel="stylesheet" href="${file}">`
  else
    return ''
}

export async function render(url: string, manifest: Record<string, string[]>) {
  const routeCtx = getAppRouteCtx(url)

  const app = createSSRApp(App)
  const store = setupStore(app)
  const router = createRouterInstance(routeCtx.route)

  await installI18n(app, routeCtx.locale)
  const head = createHead()

  app.use(head).use(router).use(store)

  app.provide(ID_INJECTION_KEY, {
    prefix: `ssr-${Math.floor(Math.random() * 1e4)}`,
    current: 0,
  })

  router.push(url)

  try {
    await router.isReady()
    const to = router.currentRoute
    const matchedRoute = to.value.matched
    if (to.value.matched.length === 0)
      return ''

    const matchedComponents: Record<string, RouteComponent>[] = []
    matchedRoute.forEach((route) => {
      matchedComponents.push(...Object.values(route.components))
    })
    const asyncDataFuncs = matchedComponents.map((component) => {
      const asyncData = component.asyncData || null
      if (asyncData) {
        const config = {
          store,
          route: to,
        }
        if (!isPromise(asyncData)) {
          const result = asyncData(config)
          return Promise.resolve(result)
        }
        return asyncData(config)
      }
      return null
    })

    await Promise.all(asyncDataFuncs)
    const ctx: ServerCtx = { modules: new Set() }
    const html = await renderToString(app, ctx)

    const { headTags, htmlAttrs, bodyAttrs } = renderHeadToString(head)
    const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
    const state = JSON.stringify(store.state.value)
    return [html, state, preloadLinks, { headTags, htmlAttrs, bodyAttrs }]
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
