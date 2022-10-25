<script setup lang="ts">
import type { UserInfo } from '@/types/store/users'

const { user } = defineProps<{
  user: UserInfo
}>()
const { t } = useI18n()
</script>

<template>
  <el-descriptions :title="t('menu.Profile')" :column="1">
    <el-descriptions-item>
      <el-image
        style="width: 100px; height: 100px"
        :src="user.picture"
        fit="fill"
      />
    </el-descriptions-item>
    <el-descriptions-item label="Username">
      {{ user.name }}
    </el-descriptions-item>
    <el-descriptions-item label="Email">
      {{ user.email }}
    </el-descriptions-item>
  </el-descriptions>
</template>
