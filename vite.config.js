import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.js'],
      refresh: true,
    }),
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'images/dadivas.png'],
      manifest: {
        name: 'Arjay Dadivas Portfolio',
        short_name: 'Arjay',
        description: 'UI/UX Designer & Frontend Developer Portfolio',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/images/dadivas.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/dadivas.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/images/dadivas.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
    },
  },
})