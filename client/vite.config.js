import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [
        // Exclude Convex server imports from client bundle
        /^convex\/server$/,
      ]
    }
  },
  resolve: {
    alias: {
      // Create alias for convex generated files
      '@convex': path.resolve(__dirname, '../convex/_generated'),
    }
  },
  optimizeDeps: {
    // Exclude server-side packages from optimization
    exclude: ['convex/server']
  }
})
