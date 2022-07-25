<script lang="ts">
import '@/assets/styles'

export default defineComponent({
  name: 'App',
  setup() {
    useHead({
      title: 'Knowledge base',
      meta: [
        { name: 'description', content: 'Opinionated Vite Starter Template' },
        {
          name: 'theme-color',
          content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
        },
      ],
    })
  },
})
</script>

<template>
  <el-container>
    <el-header>
      <head-menu />
    </el-header>
    <el-main>
      <router-view />
      <!--    <router-view v-slot="{ Component }"> -->
      <!--      <Suspense> -->
      <!--        <component :is="Component"/> -->
      <!--      </Suspense> -->
      <!--    </router-view> -->
    </el-main>
    <el-footer>
      <CommonFooter />
    </el-footer>
  </el-container>
  <!--  <div class="logo">
      <icon-carbon-license-global />
      <h3>Knowledge base</h3>
    </div> -->

  <!--  <nav>
      <router-link :to="{ name: 'index' }">Go to Home</router-link>
      &lt;!&ndash;    <router-link :to="{ name: 'user' }">Go to User</router-link>&ndash;&gt;
      &lt;!&ndash;    <router-link :to="{ name: 'about' }">Go to about</router-link>&ndash;&gt;
      <router-link :to="{ name: 'profile' }">Go to Profile</router-link>
    </nav> -->
  <!--  <hr /> -->

  <!--  <div class="container pt-12px pb-12px"> -->
  <!--    <router-view /> -->
  <!--  </div> -->
</template>

<style scoped>
nav {
  width: 500px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 20px 0;
  border-radius: 4px;
}
</style>
