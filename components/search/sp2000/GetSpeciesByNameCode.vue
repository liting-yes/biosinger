<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'

const nameCode = ref('')
const { data, pending, refresh } = await getSpeciesByNameCodeSp2000API({ nameCode })
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
    <ElCollapseItem title="根据种或种下ID查询返回详细信息">
        <ClientOnly>
            <el-popover ref="ElPopoverRef" :visible="visiblePopover" placement="bottom-start" title="根据种或种下ID查询返回详细信息"
                trigger="click" width="1100px" popper-class="bio-get-families-by-name-code__popover">
                <template #reference>
                    <ElInput ref="ElInputRef" v-model="nameCode" :prefix-icon="Search" clearable :validate-event="false"
                        @input="onInput" @focus="visiblePopover = true">
                    </ElInput>
                </template>
                <div class="max-h-136" v-loading="pending">
                    <ElScrollbar max-height="544px">
                        <div v-show="data?.data" class="grid grid-cols-2 gap-4 pr-4">
                            <ElCard shadow="hover">
                                <template #header>
                                    <div flex justify-between items-center>
                                        <h2>{{ data?.data?.scientificName }}</h2>
                                    </div>
                                </template>
                                <ElRow :gutter="24">
                                    <ElCol :span="6">中文名：</ElCol>
                                    <ElCol :span="18">{{ data?.data?.chineseName || '暂无' }}</ElCol>
                                </ElRow>
                                <ElRow :gutter="24">
                                    <ElCol :span="6">来源数据库: </ElCol>
                                    <ElCol :span="18">{{ data?.data?.databases }}</ElCol>
                                </ElRow>
                                <ElRow :gutter="24">
                                    <ElCol :span="6">学名ID: </ElCol>
                                    <ElCol :span="18">
                                        <BioCopy :text="data?.data?.namecode"></BioCopy>
                                    </ElCol>
                                </ElRow>
                            </ElCard>
                        </div>
                        <ElEmpty v-show="!data?.data" description="查无数据"></ElEmpty>
                    </ElScrollbar>
                </div>
            </el-popover>
        </ClientOnly>
    </ElCollapseItem>
</template>

<style lang="scss">
.bio-get-families-by-name-code__popover {
    .el-card__header {
        padding: 4px 20px;
    }
}
</style>