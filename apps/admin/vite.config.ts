import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  optimizeDeps: {
    esbuildOptions: {
      // Polyfill for Node.js crypto
      define: {
        global: 'globalThis',
      },
      plugins: [
        {
          name: 'fix-crypto',
          setup(build) {
            build.onLoad({ filter: /dep-optimizer\.js/ }, () => ({
              contents: `
                import { createHash } from 'crypto';
                export const getHash = (data) => createHash('sha256').update(data).digest('hex')
              `
            }))
          }
        }
      ]
    }
  }
})