<script lang="ts" setup>
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

    <el-menu-item index="/">
      {{ t('menu.Home') }}
    </el-menu-item>
    <el-menu-item index="/space">
      {{ t('menu.Space') }}
    </el-menu-item>
    <el-menu-item index="/admin">
      {{ t('menu.Admin') }}
    </el-menu-item>

    <el-sub-menu index="2">
      <template #title>
        Workspace
      </template>
      <el-menu-item index="2-1">
        item one
      </el-menu-item>
      <el-menu-item index="2-2">
        item two
      </el-menu-item>
      <el-menu-item index="2-3">
        item three
      </el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>
          item four
        </template>
        <el-menu-item index="2-4-1">
          item one
        </el-menu-item>
        <el-menu-item index="2-4-2">
          item two
        </el-menu-item>
        <el-menu-item index="2-4-3">
          item three
        </el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item
      index="3"
      disabled
    >
      Info
    </el-menu-item>
    <el-menu-item index="4">
      Orders
    </el-menu-item>

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
