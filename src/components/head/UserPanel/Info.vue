<script lang="ts">

import { PropType } from 'vue'
import { UserContract } from '@/services/auth/user'
import { logout } from '@/services/auth'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<UserContract>,
      required: true
    }
  },
  setup() {
    return {
      logout
    }
  }
})
</script>

<template>
  <el-sub-menu index="31" class="user">
    <template #title>
      <el-avatar shape="square" :size="42" :src="user.picture" />
    </template>
    <div class="el-menu-item" @click="logout">
      <icon-carbon-logout />
      Logout
    </div>
  </el-sub-menu>
</template>

<style lang="scss">
.user {
  .el-sub-menu__title {
    padding: 0 5px;

    .el-sub-menu__icon-arrow {
      display: none;
    }
  }
}
</style>
