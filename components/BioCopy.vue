<script lang="ts" setup>
interface Props {
    text: string
}
const props = withDefaults(defineProps<Props>(), {
    text: ''
})

const { isSupported, copy, copied } = useClipboard({
    source: props.text,
    legacy: true
})
// const BioCopyRef = ref()
// const isHover = useElementHover(BioCopyRef)
const onClick = () => {
    copy(props.text)
    ElMessage({
        message: `复制成功：${props.text}`,
        type: 'success'
    })
}
</script>

<template>
    <div v-show="text" ref="BioCopyRef" class="bio-copy inline-flex items-center gap-4">
        <span>{{ text }}</span>
        <template v-if="isSupported">
            <i v-show="!copied" class="inline-block w-4 h-4 cursor-pointer i-material-symbols:content-copy-outline"
                @click="onClick"></i>
            <i v-show="copied" class="inline-block w-4 h-4 i-material-symbols:content-copy"></i>
        </template>
    </div>
</template>