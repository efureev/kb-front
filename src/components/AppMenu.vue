<template>
  <el-menu :default-active="$route.path" mode="horizontal" @select="handleSelect">
    <el-menu-item index="/">
      <el-link href="/admin">Home</el-link>
    </el-menu-item>

    <el-menu-item index="admin">
      <el-link href="/admin">Admin</el-link>
    </el-menu-item>

    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>Info</el-menu-item>
    <el-menu-item index="4">Orders</el-menu-item>
    <div style="margin-left: auto"></div>
  </el-menu>
</template>

<script lang="ts" setup>
// import { ClientOnly } from 'vite-ssr'
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'
// import RightMenu from './RightMenu.vue'

// const activeIndex = ref('/')

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  // const router = useRouter()
}
</script>
