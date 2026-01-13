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
      // Create a deep proxy that returns function reference strings
      return `
        const createDeepProxy = (path = []) => {
          return new Proxy(() => {}, {
            get(target, prop) {
              if (prop === 'toString' || prop === Symbol.toStringTag) {
                return () => path.join(':');
              }
              return createDeepProxy([...path, prop]);
            },
            apply(target, thisArg, args) {
              return path.join(':');
            }
          });
        };
        
        export const componentsGeneric = () => ({});
        export const anyApi = createDeepProxy();
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
