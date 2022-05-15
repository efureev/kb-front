import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
// import { isAuthenticated } from '@/services/auth'

export default () => (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const isAuthenticated = false
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  next()
}
