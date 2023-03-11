<template>
  <el-container class="biosinger bg-[#FFFBFE] h-screen">
    <el-header class="bg-[rgb(243,237,247)]">
      <BioHeader />
    </el-header>
    <el-main>
      <slot />
    </el-main>
    <el-footer class="drop-shadow bg-[rgb(247,242,249)]">
      <BioFooter />
    </el-footer>
  </el-container>
</template>
