<script setup
  lang="ts"
>
import Info from './Info.vue'
import Login from './Login.vue'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
// const { isAuthenticated, userInfo } = useUserStore()
</script>

<template>
  <Info
    v-if="userStore.isAuthenticated"
    :user="userStore.userInfo"
  />
  <Login v-else />
</template>
