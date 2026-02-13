
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     minify: 'esbuild', // Faster and safer standard
//     cssCodeSplit: true,
//     // REMOVE the rollupOptions/manualChunks block entirely. 
//     // Let Vite decide how to bundle files to prevent loading errors.
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      workbox: {
        // This block handles the image caching
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'app-image-cache',
              expiration: {
                maxEntries: 60,            // Cache up to 60 images
                maxAgeSeconds: 30 * 24 * 60 * 60, // Keep them for 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],        // Cache successful responses
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    minify: 'esbuild',
    cssCodeSplit: true,
  },
});