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
  ],
  unocss: {
    attributify: true,
    icons:       true,
    uno:         true,
  },
})
