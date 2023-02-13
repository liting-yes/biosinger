import { defineConfig } from 'unocss/vite'
import { presetIcons, presetUno, transformerDirectives } from 'unocss'
import presetDaisy from 'unocss-preset-daisy'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetDaisy(),
  ],
  transformers: [transformerDirectives()],
})
