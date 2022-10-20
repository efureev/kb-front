import { defineStore } from 'pinia'
import { store } from '@/store'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: state => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})

// Need to be used outside the setup
export function useCounterStoreWithOut() {
  return useCounterStore(store)
}
