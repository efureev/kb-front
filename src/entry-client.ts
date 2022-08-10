import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './app.vue'
// import '@/assets/css/index.css'
import createRouter from './router'
import setGlobalHelpers from '@/utils/global.helpers'
import { installI18n } from '@/i18n'
import { getAppRouteCtx } from '@/utils/routeCtx'
import { useAuth } from '@/services/auth/auth'
import { setupStore } from '@/store'

// import '@unocss/reset/tailwind.css'
// import './styles/main.css'
// import 'uno.css'
// import 'element-plus/theme-chalk/base.css'

setGlobalHelpers()

const routeCtx = getAppRouteCtx(new URL(window.location.href))

const app = createApp(App)
const store = setupStore(app)
const router = createRouter(store, routeCtx.route)

await installI18n(app, routeCtx.locale)

const head = createHead()

app.use(head).use(router).use(store)

if (window.__INITIAL_STATE__)
  store.state.value = window.__INITIAL_STATE__

router.isReady().then(() => {
  useAuth()
  app.mount('#app', true)
  // const { alertSuccess } = useAlert()
  // alertSuccess('App loaded')
})
