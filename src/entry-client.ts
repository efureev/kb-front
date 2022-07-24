import 'uno.css'
import App from './app.vue'
import '@/assets/css/index.css'
import setGlobalHelpers from '@/utils/global.helpers'
import { createApp } from 'vue'
import createRouter from './router'
import 'element-plus/theme-chalk/base.css'
import { createPinia } from 'pinia'
import { installI18n } from '@/i18n'
import { getAppRouteCtx } from '@/utils/routeCtx'
import { useAuth } from '@/services/auth/auth'

setGlobalHelpers()

const routeCtx = getAppRouteCtx(new URL(window.location.href))

const store = createPinia()
const router = createRouter(store, routeCtx.route)

const app = createApp(App)
await installI18n(app, routeCtx.locale)

app.use(router).use(store)

if (window.__INITIAL_STATE__) {
  store.state.value = window.__INITIAL_STATE__
}

router.isReady().then(() => {
  useAuth()
  app.mount('#app', true)
})
