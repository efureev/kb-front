import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'
// import { AppCxt } from "~/types"
import { isPromise } from '@/utils'
import { store } from '@/store'

export default (router: Router) =>
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    let diffed = false

    const matched = router.resolve(to).matched
    const prevMatched = router.resolve(from).matched

    if (from && !from.name)
      return next()

    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c)
    })

    if (!activated.length)
      return next()

    const matchedComponents: any = []
    matched.forEach((route) => {
      matchedComponents.push(...Object.values(route.components))
    })

    const asyncDataFuncs = matchedComponents.map((component: any) => {
      const asyncData = component.asyncData || null
      if (asyncData) {
        const config = {
          store,
          route: to,
        }
        if (!isPromise(asyncData))
          return Promise.resolve(asyncData(config))

        return asyncData(config)
      }
      return null
    })

    try {
      Promise.all(asyncDataFuncs).then(() => {
        next()
      })
    }
    catch (err) {
      next(err as any)
    }
  }
