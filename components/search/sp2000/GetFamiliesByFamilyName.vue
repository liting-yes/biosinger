<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'

const familyName = ref('')
const { data, pending, refresh } = await getFamiliesByFamilyNameSp2000API({ familyName })
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
    <ElCollapseItem title="用科名查询，返回科信息集合">
        <ClientOnly>
            <el-popover ref="ElPopoverRef" :visible="visiblePopover" placement="bottom-start" title="用科名查询，返回科信息集合"
                trigger="click" width="1100px" popper-class="bio-get-families-by-family-name__popover">
                <template #reference>
                    <ElInput ref="ElInputRef" v-model="familyName" :prefix-icon="Search" clearable :validate-event="false"
                        @input="onInput" @focus="visiblePopover = true">
                    </ElInput>
                </template>
                <div class="max-h-136" v-loading="pending">
                    <ElScrollbar max-height="544px">
                        <div v-show="data?.data?.familes?.length" class="grid grid-cols-2 gap-4 pr-4">
                            <ElCard v-for="item in data?.data?.familes" :key="item.record_id" shadow="hover">
                                <template #header>
                                    <div flex justify-between items-center>
                                        <h2>{{ item.family }}</h2>
                                    </div>
                                </template>
                                <ElRow :gutter="24">
                                    <ElCol :span="10">科中文名：</ElCol>
                                    <ElCol :span="14">{{ item.family_c }}</ElCol>
                                </ElRow>
                                <ElRow :gutter="24">
                                    <ElCol :span="10">所属界中文名/拉丁文名: </ElCol>
                                    <ElCol :span="14">{{ item.kingdom_c + ' / ' + item.kingdom }}</ElCol>
                                </ElRow>
                                <ElRow :gutter="24">
                                    <ElCol :span="10">所属门中文名/拉丁文名: </ElCol>
                                    <ElCol :span="14">{{ item.phylum_c + ' / ' + item.phylum }}</ElCol>
                                </ElRow>
                                <ElRow :gutter="24">
                                    <ElCol :span="10">所属纲中文名/拉丁文名: </ElCol>
                                    <ElCol :span="14">{{ item.class_c + ' / ' + item.class }}</ElCol>
                                </ElRow>
                                <ElRow :gutter="24">
                                    <ElCol :span="10">所属目中文名/拉丁文名: </ElCol>
                                    <ElCol :span="14">{{ item.order_c + ' / ' + item.order }}</ElCol>
                                </ElRow>
                                <ElRow :gutter="24">
                                    <ElCol :span="10">科ID: </ElCol>
                                    <ElCol :span="14">
                                        <BioCopy :text="item.record_id"></BioCopy>
                                    </ElCol>
                                </ElRow>
                            </ElCard>
                        </div>
                        <ElEmpty v-show="!data?.data?.familes?.length" description="查无数据"></ElEmpty>
                    </ElScrollbar>
                </div>
            </el-popover>
        </ClientOnly>
    </ElCollapseItem>
</template>

<style lang="scss">
.bio-get-families-by-family-name__popover {
    .el-card__header {
        padding: 4px 20px;
    }
}
</style>