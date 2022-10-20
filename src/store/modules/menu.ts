import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { store } from '@/store'

interface MenuItem {
  label: string
  url: string
  private: boolean
}

export const usePrivateMenuStore = defineStore('app-menu-private', () => {
  const items: MenuItem[] = [{
    label: 'Home',
    url: '/',
    private: false,
  }, {
    label: 'Profile',
    url: '/profile',
    private: true,
  }, {
    label: 'Space',
    url: '/space',
    private: true,
  }, {
    label: 'Admin',
    url: '/admin',
    private: true,
  }]

  const user = useUserStore()

  const menuList = computed(() => {
    return items.filter(item => !item.private || (user.isAuthenticated && item.private))
  })

  return { items, menuList }
})

// Need to be used outside the setup
export function usePrivateMenuStoreWithOut() {
  return usePrivateMenuStore(store)
}
