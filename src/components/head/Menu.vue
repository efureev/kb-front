<script lang="ts"
  setup
>
import { usePrivateMenuStore } from '@/store/modules/menu'

const { t } = useI18n()
const router = useRouter()
// import { ClientOnly } from 'vite-ssr'
// import { ref } from 'vue'
// import RightMenu from './RightMenu.vue'

const handleSelect = (key: string) => {
  // const router = useRouter()
  // console.log(key)
  // console.log(router)
  router.push(key)
}
const menuStore = usePrivateMenuStore()
</script>

<template>
  <el-menu
    router
    :default-active="$route.path"
    mode="horizontal"
    menu-trigger="click"
    @select="handleSelect"
  >
    <div class="menu-logo">
      <icon-carbon-license-global style="font-size: 2em; " />
    </div>

    <template
      v-for="(menuItem, idx) in menuStore.menuList"
      :key="idx"
    >
      <el-menu-item
        v-if="menuItem.url"
        :index="menuItem.url"
        :disabled="menuItem.disabled"
      >
        {{ t(`menu.${menuItem.label}`) }}
      </el-menu-item>
      <el-sub-menu
        v-else-if="menuItem.index"
        :index="menuItem.index"
        :disabled="menuItem.disabled"
      >
        <template #title>
          {{ t(`menu.${menuItem.label}`) }}
        </template>
        <el-menu-item
          v-for="(submenuItem, sidx) in menuItem.items"
          :key="sidx"
          :index="submenuItem.index"
          :disabled="menuItem.disabled"
        >
          {{ t(`menu.${submenuItem.label}`) }}
        </el-menu-item>
      </el-sub-menu>
    </template>

    <HeadToolbar style="margin-left: auto" />
  </el-menu>
</template>

<style>
.menu-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /*margin: 0 0 0 10px;*/
    line-height: var(--el-menu-item-height);
    font-size: var(--el-menu-item-font-size);
}
</style>
