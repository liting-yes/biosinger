<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'

const scientificName = ref('')
const { data, pending, refresh } = await getSpeciesByScientificNameIdSp2000API({ scientificName })
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
    <ElCollapseItem title="根据学名查询，返回种或种下详情">
        <el-popover ref="ElPopoverRef" :visible="visiblePopover" placement="bottom-start" title="根据学名查询，返回种或种下详情"
            trigger="click" width="1100px" popper-class="bio-get-species-by-scientific-name__popover">
            <template #reference>
                <ElInput ref="ElInputRef" v-model="scientificName" :prefix-icon="Search" clearable :validate-event="false"
                    @input="onInput" @focus="visiblePopover = true">
                </ElInput>
            </template>
            <div class="max-h-152" v-loading="pending">
                <ElScrollbar max-height="608px">
                    <div v-show="data?.data?.species?.length" class="grid grid-cols-2 gap-4 pr-4">
                        <ElCard v-for="item in data?.data?.species" :key="item.name_code" shadow="hover">
                            <template #header>
                                <div flex justify-between items-center>
                                    <h2>{{ item.scientific_name }}</h2>
                                </div>
                            </template>
                            <ElRow :gutter="24">
                                <ElCol :span="6">中文名：</ElCol>
                                <ElCol :span="18">{{ item.accepted_name_info.chineseName || '暂无' }}</ElCol>
                            </ElRow>
                            <ElRow :gutter="24">
                                <ElCol :span="6">来源数据库: </ElCol>
                                <ElCol :span="18">{{ item.accepted_name_info.databases }}</ElCol>
                            </ElRow>
                            <ElRow :gutter="24">
                                <ElCol :span="6">学名ID: </ElCol>
                                <ElCol :span="18">
                                    <BioCopy :text="item.name_code"></BioCopy>
                                </ElCol>
                            </ElRow>
                        </ElCard>
                    </div>
                    <ElEmpty v-show="!data?.data?.species?.length" description="查无数据"></ElEmpty>
                </ElScrollbar>
            </div>
        </el-popover>
    </ElCollapseItem>
</template>

<style lang="scss">
.bio-get-species-by-scientific-name__popover {
    .el-card__header {
        padding: 4px 20px;
    }
}
</style>