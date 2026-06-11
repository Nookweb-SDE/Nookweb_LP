import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import viteImagemin from 'vite-plugin-imagemin'

// SPA fallback: /monosphera-dashboard/* (exceto /assets/) → index.html do dashboard
function monospheraDashboardFallback() {
  return {
    name: 'monosphera-dashboard-fallback',
    configureServer(server) {
      const middleware = (req: any, res: any, next: () => void) => {
        const url = req.url?.split('?')[0] ?? ''
        if (url.startsWith('/monosphera-dashboard') && !url.includes('/assets/') && !url.includes('.')) {
          req.url = '/monosphera-dashboard/index.html'
        }
        next()
      }
      server.middlewares.stack.unshift({ route: '', handle: middleware })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    monospheraDashboardFallback(),
    viteImagemin({
      webp: { quality: 85 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 82 },
      svgo: {
        plugins: [{ name: 'removeViewBox', active: false }],
      },
    }),
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: {
    port: 5174,
    open: true,
  },
})
