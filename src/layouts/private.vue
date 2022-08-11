<template>
  <el-container>
    <!--    <el-aside width="200px">
          <SideMenu />
        </el-aside>
        -->
    <el-main>
      <div class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
        <div class="mt-5 mx-auto text-center opacity-25 text-sm">
          [Private Layout]
        </div>
        <!--    <ClientOnly> -->
        <Suspense>
          <router-view />
        </Suspense>
        <!--    </ClientOnly> -->
      </div>
    </el-main>
  </el-container>
</template>
