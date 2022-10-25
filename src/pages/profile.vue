<script setup
  lang="ts">
// import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store/modules/user'

const { t } = useI18n()
const user = useUserStore().getUserInfo
</script>

<template>
  <UserProfiler :user="user" />

  <el-divider />

  <UserAuthTokens :user="user" />

  <div>
    <icon-carbon-campsite class-name="inline-block" />
  </div>
</template>

<route>
{ meta: { layout: "private", requiresAuth: true } }
</route>
