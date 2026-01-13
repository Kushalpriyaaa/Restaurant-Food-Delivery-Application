import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Minimal stub to prevent build errors from convex/server imports
const stubConvexServer = () => ({
  name: 'stub-convex-server',
  resolveId(id) {
    if (id === 'convex/server') {
      return id
    }
  },
  load(id) {
    if (id === 'convex/server') {
      // Minimal stub - let Convex runtime handle the real implementation
      return `
        export const anyApi = undefined;
        export const componentsGeneric = () => ({});
      `
    }
  }
})

export default defineConfig({
  plugins: [react(), stubConvexServer()],
  publicDir: 'public',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist'
  },
  optimizeDeps: {
    exclude: ['convex']
  }
})
