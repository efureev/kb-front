import type { App } from 'vue'
import type { Pinia } from 'pinia'
import { createPinia } from 'pinia'

const store = createPinia()

export function setupStore(app: App<Element>): Pinia {
  app.use(store)

  return store
}

export { store }
