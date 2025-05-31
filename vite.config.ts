import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),

    viteStaticCopy({
      targets: [
        {
          src: 'dist/index.html',
          dest: '.', // copiar como 404.html en la raíz
          rename: '404.html',
        },
      ],
      watch: {
        reloadPageOnChange: true,
      },
    }),
  ],
  base: ' https://santiago305.github.io/CSJA-2025/',
  server: {
    proxy: {
      '/api': {
        target: 'http://www.desarrolloaqp.somee.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
