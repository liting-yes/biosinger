<script lang="ts" setup>

// eslint-disable-next-line no-undef
const defaultActive = ref('')

// eslint-disable-next-line no-undef
const dialogVisible = ref(false)

// eslint-disable-next-line no-undef
const bioSp2000 = useLocalStorage('bioSp2000', '')
</script>

<template>
  <div class="bio-header drop-shadow-md flex justify-between items-center h-full">
    <NuxtLink to="/">
      <NuxtImg
        src="/logo.svg"
        width="48"
        height="48"
      />
    </NuxtLink>
    <ElMenu :default-active="defaultActive">
      <ElMenuItem
        @click="dialogVisible = true"
      >
        个人设置
      </ElMenuItem>
    </ElMenu>
  </div>
  <ClientOnly>
    <ElDialog
      v-model="dialogVisible"
      append-to-body
      @close="() => (defaultActive += 'bio')"
    >
      <template #header>
        <div class="flex items-center gap-1">
          <span>API Key 管理 </span>
          <el-tooltip
            content="API Key 类似于账号密码，是调用很多公共接口都需要用到的特殊且唯一的一串字符"
            placement="right"
          >
            <i
              class="i-ph:question inline-block"
              w-4
              h-4
            />
          </el-tooltip>
        </div>
      </template>
      <ElRow>
        <ElCol :span="6">
          <NuxtLink
            class="hover:text-lime-600 hover:underline"
            to="http://col.especies.cn/api/document"
            target="_blank"
          >
            <span class="leading-8">
              中国生物物种名录
            </span>
          </NuxtLink>
        </ElCol>
        <ElCol :span="18">
          <ElInput
            v-model="bioSp2000"
            clearable
            show-password
            :validate-event="false"
          />
        </ElCol>
      </ElRow>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.bio-header {
  --el-menu-bg-color: transparent;
  --el-menu-border-color: transparent;
  --el-menu-hover-bg-color: rgb(239, 233, 245);
  --el-menu-item-height: 32px;
}
</style>
