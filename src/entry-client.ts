import 'uno.css'
import App from './app.vue'
import '@/assets/css/index.css'
import { createApp } from 'vue'
// import createRouter from './router/index2'
import createRouter from './router'
import 'element-plus/theme-chalk/base.css'
import { createPinia } from 'pinia'
import installMiddleware from '@/router/mw'

const store = createPinia()
const router = createRouter(store)
// const router = createRouter()
installMiddleware(router, store)

const app = createApp(App)
app.use(router).use(store)

if (window.__INITIAL_STATE__) {
  store.state.value = window.__INITIAL_STATE__
}
router.isReady().then(() => {
  app.mount('#app', true)
})
