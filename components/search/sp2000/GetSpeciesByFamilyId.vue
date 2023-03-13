<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'

const familyId = ref('')
const { data, pending, refresh } = await getSpeciesByFamilyIdSp2000API({ familyId })
const onInput = () => {
    refresh()
}

const visiblePopover = ref(false)
const ElPopoverRef = ref()
const ElInputRef = ref()
onClickOutside(ElInputRef, (e) => {
    visiblePopover.value = false
}, {
    ignore: [ElPopoverRef.value]
})
</script>

<template>
    <ElCollapseItem title="用科ID查询物种或种下，返回种或种下信息">
        <ClientOnly>
            <el-popover ref="ElPopoverRef" :visible="visiblePopover" placement="bottom-start" title="用科ID查询物种或种下，返回种或种下信息"
                trigger="click" width="1100px" popper-class="bio-get-species-by-family-id__popover">
                <template #reference>
                    <ElInput ref="ElInputRef" v-model="familyId" :prefix-icon="Search" clearable :validate-event="false"
                        @input="onInput" @focus="visiblePopover = true">
                    </ElInput>
                </template>
                <div class="max-h-124" v-loading="pending">
                    <ElScrollbar max-height="496px">
                        <div v-show="data?.data?.species?.length" class="grid grid-cols-2 gap-4 pr-4">
                            <ElCard v-for="item in data?.data?.species" :key="item.namecode" shadow="hover">
                                <template #header>
                                    <div flex justify-between items-center>
                                        <h2>{{ item.scientificName }}</h2>
                                    </div>
                                </template>
                                <ElRow :gutter="24">
                                    <ElCol :span="6">中文名：</ElCol>
                                    <ElCol :span="18">{{ item.chineseName || '暂无' }}</ElCol>
                                </ElRow>
                                <ElRow :gutter="24">
                                    <ElCol :span="6">来源数据库: </ElCol>
                                    <ElCol :span="18">{{ item.databases }}</ElCol>
                                </ElRow>
                                <ElRow :gutter="24">
                                    <ElCol :span="6">学名ID: </ElCol>
                                    <ElCol :span="18">
                                        <BioCopy :text="item.namecode"></BioCopy>
                                    </ElCol>
                                </ElRow>
                            </ElCard>
                        </div>
                        <ElEmpty v-show="!data?.data?.species?.length" description="查无数据"></ElEmpty>
                    </ElScrollbar>
                </div>
            </el-popover>
        </ClientOnly>
    </ElCollapseItem>
</template>

<style lang="scss">
.bio-get-species-by-family-id__popover {
    .el-card__header {
        padding: 4px 20px;
    }
}
</style>