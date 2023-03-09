import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [ '@unocss/nuxt' ],
  unocss:  {
    attributify: true,
    icons:       true,
    uno:         true,
  },
})
