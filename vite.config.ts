import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from 'unocss/vite'
import legacy from '@vitejs/plugin-legacy'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    UnoCSS(),
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    VitePWA({ registerType: 'autoUpdate' }),
  ],
  css: {
    devSourcemap: true,
  },
  server: {
    port: 9000,
  },
})
