<script lang="ts" setup>
definePageMeta({ key: route => route.fullPath })
</script>

<template>
  <div class="bio-search-sp2000">
    <ElCollapse accordion>
      <SearchSp2000GetNamByKeyWord />
      <SearchSp2000GetSpeciesByScientificName />
      <SearchSp2000GetSpeciesByCommonName />
      <SearchSp2000GetFamiliesByFamilyName />
      <SearchSp2000GetSpeciesByFamilyId />
      <SearchSp2000GetSpeciesByNameCode />
    </ElCollapse>
  </div>
</template>

<style lang="scss">
.bio-search-sp2000 {
  .el-collapse {
    --el-collapse-header-font-size: 14px;

    border: none;
    border-radius: 8px;
    overflow: hidden;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
  }

  .el-collapse-item__header {
    font-weight: 600px;
    padding-left: 24px;

    &:hover {
      --el-collapse-header-text-color: #fdba74;
    }
  }

  .el-collapse-item__content {
    padding-left: 24px;
    padding-right: 48px;
  }
}
</style>
