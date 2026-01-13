import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin to stub out convex/server imports in client build
const stubConvexServer = () => ({
  name: 'stub-convex-server',
  resolveId(id) {
    if (id === 'convex/server') {
      return id
    }
  },
  load(id) {
    if (id === 'convex/server') {
      // Return empty stubs for server-only exports
      return `
        export const componentsGeneric = () => ({});
        export const anyApi = {};
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
  }
})
