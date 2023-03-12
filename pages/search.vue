<script lang="ts" setup>
const defaultActive = ref('/search/sp2000')
</script>

<template>
  <div class="bio-search h-full flex gap-12">
    <el-menu class="w-48 h-fit overflow-hidden" :default-active="defaultActive" router>
      <el-menu-item index="/search/sp2000">
        中国生物物种名录
      </el-menu-item>
    </el-menu>
    <NuxtPage class="flex-1" />
  </div>
</template>

<style lang="scss" scoped>
.bio-search {
  --el-menu-item-height: 48px;

  .el-menu {
    border: none;
    border-radius: 8px;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
  }
}
</style>
