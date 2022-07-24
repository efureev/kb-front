<template>
  <div class="head-toolbar">
    <!--    <HeadTimer class="head-toolbar-item" />-->

    <div class="el-menu-item" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon"></div>
    </div>
    <HeadUserPanel />
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
