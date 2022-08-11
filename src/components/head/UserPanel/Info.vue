<script lang="ts">
import type { PropType } from 'vue'
// import type { UserContract } from '@/services/auth/user'
// import { logout } from '@/services/auth'
import { useUserStore } from '@/store/modules/user'
import { DEFAULT_LOCALE, SUPPORTED_LANGUAGES } from '@/i18n'
import type { UserInfo } from '#/store'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<UserInfo>,
      required: true,
    },
  },
  setup() {
    const { locale } = useI18n()

    const newLocale = ref(locale.value)
    const route = useRoute()

    watch([newLocale], () => {
      const base = newLocale.value === DEFAULT_LOCALE ? '' : `/${newLocale.value}`
      window.location.pathname = base + route.fullPath
    })

    return {
      logout: useUserStore().logout,
      locale,
      locales: SUPPORTED_LANGUAGES,
      newLocale,
    }
  },
})
</script>

<template>
  <el-sub-menu
    index="31"
    class="user"
  >
    <template #title>
      <el-avatar
        shape="square"
        :size="42"
        :src="user.picture"
      />
    </template>
    <div class="el-menu-item justify-center">
      <el-radio-group
        v-model="newLocale"
        size="small"
      >
        <el-radio-button
          v-for="lang in locales"
          :key="lang.locale"
          :title="lang.name"
          :label="lang.locale"
        />
      </el-radio-group>
    </div>
    <hr style="margin: 10px 0; color: var(--el-border-color);">
    <div
      class="el-menu-item"
      @click="logout"
    >
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
