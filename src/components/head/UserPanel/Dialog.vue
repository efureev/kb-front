<script setup lang="ts">
import { isAuthenticated, logout } from '@/services/auth'
import { useAuth } from '@/services/auth/auth'
import UserInfo from '../UserPanel/UserInfo.vue'

const { loading, userStatus } = useAuth()
const dialogFormVisible = ref(false)
</script>

<template>
  <template v-if="!loading">

    <user-info v-if="userStatus.logged" :user="userStatus.user" />

    <div v-if="isAuthenticated" class="el-menu-item" @click="logout">
      <icon-carbon-logout />
    </div>
    <template v-else>
      <div class="el-menu-item" @click="dialogFormVisible=true">
        <icon-carbon-login />
      </div>

      <el-dialog v-model="dialogFormVisible" title="Login with ..." width="400px">
        <HeadLoginProviderLinks />
      </el-dialog>
    </template>
  </template>
</template>
