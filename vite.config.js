
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild', // Faster and safer standard
    cssCodeSplit: true,
    // REMOVE the rollupOptions/manualChunks block entirely. 
    // Let Vite decide how to bundle files to prevent loading errors.
  },
});