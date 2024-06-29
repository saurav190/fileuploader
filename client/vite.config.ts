import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import type { VitePWAOptions } from 'vite-plugin-pwa';
import { VitePWA } from 'vite-plugin-pwa';
import viteSvgr from 'vite-plugin-svgr';

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: ['**/*'],
  manifest: {
    short_name: 'Vite-React-TS-RTK-RRD',
    name: 'Vite-React-TS-RTK-RRD',
    lang: 'en',
    start_url: '/',
    background_color: '#FFFFFF',
    theme_color: '#FFFFFF',
    dir: 'ltr',
    display: 'standalone',
    prefer_related_applications: false,
    icons: [
      {
        src: '/assets/favicon.svg',
        purpose: 'any',
        sizes: '48x48 72x72 96x96 128x128 256x256'
      }
    ]
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    cssCodeSplit: true,
    modulePreload: true,
    manifest: true
  },
  plugins: [react(), viteSvgr(), splitVendorChunkPlugin(), VitePWA(pwaOptions)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@images': path.resolve(__dirname, './src/assets/img'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services')
    }
  },
  server: {
    port: 3000,
    open: false,
    host: '0.0.0.0'
  }
});
