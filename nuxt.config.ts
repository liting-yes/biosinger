import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css:         [ '@unocss/reset/tailwind-compat.css' ],
  elementPlus: { importStyle: 'scss' },
  modules:     [
    '@unocss/nuxt',
    '@element-plus/nuxt',
    '@nuxt/image-edge',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
    '@nuxtjs/fontaine',
    'nuxt-lodash',
    '@nuxtjs/web-vitals'
  ],
  unocss: {
    attributify: true,
    icons:       true,
    uno:         true,
    typography: true
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Biosinger',
      description: '山东大学（威海）文侯毕业设计',
      lang: 'zh-CN'
    }
  },
  webVitals: {
    ga: {
      id: 'G-EGQYF8HB9S'
    }
  }
})
