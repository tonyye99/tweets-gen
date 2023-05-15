<template>
  <n-layout>
    <n-layout-header style="padding: 14px" bordered>
      <SidebarTheHeader />
    </n-layout-header>
    <n-layout has-sider class="h-screen bg-white dark:bg-naive-black">
      <SidebarTheSider />
      <n-layout embedded content-style="padding: 24px;" :native-scrollbar="false"
        class="bg-naive-white dark:bg-naive-dark">
        <div class="min-h-screen bg-white dark:bg-naive-black rounded-lg shadow-sm p-5">
          <NuxtPage />
        </div>
      </n-layout>
    </n-layout>
    <!-- <n-layout-footer style="padding: 18px" bordered class="bg-white dark:bg-naive-black">
      <SidebarTheFooter />
    </n-layout-footer> -->
  </n-layout>
</template>
