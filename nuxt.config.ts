import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  elementPlus: { importStyle: 'scss' },
  modules:     [
    '@unocss/nuxt',
    '@element-plus/nuxt',
  ],
  unocss: {
    attributify: true,
    icons:       true,
    uno:         true,
  },
})
