import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { fileURLToPath, URL  } from 'node:url'

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }},
    build: {
      rollupOptions: {
        input: {
          main: 'index.html', // o tu entrada principal
          content: './src/pages/web-extension/content.ts', // ajusta la ruta según corresponda
        },
        output: {
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'content') {
              return 'assets/content.js'; // archivo de salida separado
            }
            return 'assets/[name].js';
          },
        },
      },
    },
})
