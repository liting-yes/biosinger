<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'

const keyword = ref('')
const { data, pending, refresh } = await getNameByKeywordSp2000API({ keyword })
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
    <ElCollapseItem title="根据关键词搜索名称信息">
        <ClientOnly>
            <el-popover ref="ElPopoverRef" :visible="visiblePopover" placement="bottom-start" title="根据关键词搜索名称信息"
                trigger="click" width="1100px" popper-class="bio-get-Name-by-key-word__popover">
                <template #reference>
                    <ElInput ref="ElInputRef" v-model="keyword" :prefix-icon="Search" clearable :validate-event="false"
                        @input="onInput" @focus="visiblePopover = true">
                    </ElInput>
                </template>
                <div class="max-h-160" v-loading="pending">
                    <ElScrollbar max-height="640px">
                        <div v-show="data?.data?.names?.length" class="grid grid-cols-2 gap-4 pr-4">
                            <ElCard v-for="item in data?.data?.names" :key="item.nameCode" shadow="hover">
                                <template #header>
                                    <div flex justify-between items-center>
                                        <h2>{{ item.name }}</h2>
                                    </div>
                                </template>
                                <ElRow :gutter="24">
                                    <ElCol :span="6">中文名：</ElCol>
                                    <ElCol :span="18">{{ item.name_c || '暂无' }}</ElCol>
                                </ElRow>
                                <ElRow :gutter="24">
                                    <ElCol :span="6">分类阶元等级: </ElCol>
                                    <ElCol :span="18">{{ item.rank }}</ElCol>
                                </ElRow>
                                <ElRow :gutter="24">
                                    <ElCol :span="6">类群: </ElCol>
                                    <ElCol :span="18">{{ item.taxongroup }}</ElCol>
                                </ElRow>
                                <ElRow :gutter="24">
                                    <ElCol :span="6">名称ID: </ElCol>
                                    <ElCol :span="18">
                                        <BioCopy :text="item.nameCode"></BioCopy>
                                    </ElCol>
                                </ElRow>
                                <ElRow :gutter="24">
                                    <ElCol :span="6">上级ID: </ElCol>
                                    <ElCol :span="18">
                                        <BioCopy :text="item.parentId"></BioCopy>
                                    </ElCol>
                                </ElRow>
                            </ElCard>
                        </div>
                        <ElEmpty v-show="!data?.data?.names?.length" description="查无数据"></ElEmpty>
                    </ElScrollbar>
                </div>
            </el-popover>
        </ClientOnly>
    </ElCollapseItem>
</template>

<style lang="scss">
.bio-get-Name-by-key-word__popover {
    .el-card__header {
        padding: 4px 20px;
    }
}
</style>