<script lang="ts" setup>
definePageMeta({ key: route => route.fullPath })
</script>

<template>
  <div class="bio-search-sp2000">
    <ElCollapse accordion>
      <SearchSp2000GetNamByKeyWord />
      <SearchSp2000GetSpeciesByScientificName />
      <SearchSp2000GetSpeciesByCommonName />
      <SearchSp2000GetSpeciesByNameCode />
      <SearchSp2000GetFamiliesByFamilyName />
      <SearchSp2000GetSpeciesByFamilyId />
    </ElCollapse>
  </div>
</template>
