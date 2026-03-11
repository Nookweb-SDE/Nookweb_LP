import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// SPA fallback: /monosphera-dashboard/* (exceto /assets/) → index.html do dashboard
function monospheraDashboardFallback() {
    return {
        name: 'monosphera-dashboard-fallback',
        configureServer: function (server) {
            var middleware = function (req, res, next) {
                var _a, _b;
                var url = (_b = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split('?')[0]) !== null && _b !== void 0 ? _b : '';
                if (url.startsWith('/monosphera-dashboard') && !url.includes('/assets/') && !url.includes('.')) {
                    req.url = '/monosphera-dashboard/index.html';
                }
                next();
            };
            server.middlewares.stack.unshift({ route: '', handle: middleware });
        },
    };
}
export default defineConfig({
    plugins: [react(), monospheraDashboardFallback()],
    resolve: { alias: { '@': path.resolve(__dirname, './src') } },
    server: {
        port: 5174,
        open: true,
    },
});
