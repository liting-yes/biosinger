<script lang="ts" setup>
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const dialogVisible = ref(false)

const bioSp2000 = useLocalStorage('bioSp2000', '')
</script>

<template>
  <div class="bio-header drop-shadow-md flex justify-between items-center h-full">
    <NuxtLink to="/search">
      <NuxtImg src="/logo.png" width="48" height="48" />
    </NuxtLink>
    <div class="flex items-center gap-4">
      <NuxtLink class="hover:text-orange-400" to="/search">
        搜索
      </NuxtLink>
      <div class="cursor-pointer hover:text-orange-400" @click="dialogVisible = true">
        个人设置
      </div>
    </div>
  </div>
  <ClientOnly>
    <ElDialog v-model="dialogVisible" append-to-body>
      <template #header>
        <div class="flex items-center gap-1">
          <span>API Key 管理 </span>
          <el-tooltip content="API Key 类似于账号密码，是调用很多公共接口都需要用到的特殊且唯一的一串字符" placement="right">
            <i class="i-ph:question inline-block" w-4 h-4 />
          </el-tooltip>
        </div>
      </template>
      <ElRow>
        <ElCol :span="6">
          <NuxtLink class="hover:text-lime-600 hover:underline" to="http://col.especies.cn/api/document" target="_blank">
            <span class="leading-8">
              中国生物物种名录
            </span>
          </NuxtLink>
        </ElCol>
        <ElCol :span="18">
          <ElInput v-model="bioSp2000" clearable show-password :validate-event="false" />
        </ElCol>
      </ElRow>
    </ElDialog>
  </ClientOnly>
</template>
