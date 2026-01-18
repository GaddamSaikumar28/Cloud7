// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     // Minify output
//     minify: 'terser',
//     cssCodeSplit: true,
//     rollupOptions: {
//       output: {
//         // Force separate chunks for vendor libraries
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
//               return 'react-vendor';
//             }
//             // If you use heavy charting libs in admin, chunk them
//             if (id.includes('recharts')) {
//               return 'recharts'; 
//             }
//             return 'vendor'; // all other node_modules
//           }
//         },
//       },
//     },
//   },
// });

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