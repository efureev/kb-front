<script setup
  lang="ts"
>
const dialogFormVisible = ref(false)
</script>

<template>
  <div
    class="el-menu-item"
    @click="dialogFormVisible = true"
  >
    <icon-carbon-login />
  </div>

  <el-dialog
    v-model="dialogFormVisible"
    title="Login with ..."
    width="400px"
  >
    <HeadUserPanelProviderLinks />
  </el-dialog>
</template>
