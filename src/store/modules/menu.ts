import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { store } from '@/store'

interface MenuItem {
  label: string
  url?: string
  index?: string
  private?: true
  disabled?: true
}

interface MenuItemGroup {
  label: string
  private: boolean
  index: string
  items: MenuItem[]
}

export const usePrivateMenuStore = defineStore('app-menu-private', () => {
  const items: (MenuItem | MenuItemGroup)[] = [{
    label: 'Home',
    url: '/',
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
  }, {
    label: 'Workspace',
    index: '2',
    items: [
      {
        label: 'item one',
        index: '2-1',
      }, {
        label: 'item two',
        index: '2-2',
      },
    ],
  }, {
    label: 'Status',
    url: '/status',
    disabled: true,
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
