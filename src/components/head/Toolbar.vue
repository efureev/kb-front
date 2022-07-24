<template>
  <div class="head-toolbar">
    <HeadTimer class="head-toolbar-item" />
    <!--    <HeadLoginDialog />-->
    <HeadUserPanel />
    <!--    <div class="el-menu-item" @click="test"><icon-carbon-login /></div>-->

    <!--    <el-menu-item index="/login">
      <icon-carbon-login />
    </el-menu-item>-->
  </div>
</template>

<style lang="scss" scoped>
.head-toolbar {
  display: flex;
  align-items: center;
  justify-content: center;
  //margin-right: 5px;

  &-item {
    display: inline-block;
    padding: 2px 3px;
  }
}

</style>
