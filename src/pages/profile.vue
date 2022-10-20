<script setup
  lang="ts">
// import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store/modules/user'

const { t } = useI18n()
const user = useUserStore().getUserInfo
</script>

<template>
  <el-descriptions :title="t('menu.Profile')"
    :column="1">
    <el-descriptions-item>
      <el-image style="width: 100px; height: 100px"
        :src="user.picture"
        fit="fill" />
    </el-descriptions-item>
    <el-descriptions-item label="Username">{{ user.name }}</el-descriptions-item>
    <el-descriptions-item label="Email">{{ user.email }}</el-descriptions-item>
  </el-descriptions>
  <div>
    <icon-carbon-campsite class-name="inline-block" />
  </div>
</template>

<route>
{ meta: { layout: "private", requiresAuth: true } }
</route>
