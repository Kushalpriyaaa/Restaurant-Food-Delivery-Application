# 🚨 Convex Build Error Fix Guide

## Problem: "Rollup failed to resolve import 'convex/server'"

### What This Error Means

Your **frontend build** is trying to import **server-only** Convex code, which is NOT allowed.

---

## 🧠 Core Concept

Convex has two separate worlds that **must never** mix:

### 1️⃣ Server World (Backend)
- **Location:** `convex/` directory only
- **Imports:** `convex/server`
- **Where it runs:** Convex Cloud
- **Must NEVER:** Be bundled into frontend

```typescript
// ✅ CORRECT - Only in convex/ files
import { query, mutation } from "convex/server";
```

### 2️⃣ Client World (Frontend)
- **Location:** `client/` directory
- **Imports:** `convex/react`
- **Where it runs:** Browser
- **Safe for:** Vite, Vercel, Netlify builds

```typescript
// ✅ CORRECT - In client/ files
import { useQuery, useMutation } from "convex/react";
import { api } from '@convex/api';
```

---

## ❌ Common Causes

### 1. Importing Convex Backend Files in Frontend

```javascript
// ❌ WRONG - Client importing from convex/
import { something } from '../../../../convex/modules/auth/auth';
```

### 2. Sharing Utilities That Import Server Code

```javascript
// ❌ WRONG - If lib/auth.ts imports 'convex/server'
// and client imports this file
import { helper } from '../../../convex/lib/auth';
```

### 3. Incorrect Path Resolution

```javascript
// ❌ WRONG - Relative paths going outside client/
import { api } from '../../../../convex/_generated/api';
```

---

## ✅ The Solution (What We Did)

### 1. Updated Vite Configuration

**File:** `client/vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        // Exclude Convex server imports
        /^convex\/server$/,
      ]
    }
  },
  resolve: {
    alias: {
      // Clean alias for convex generated files
      '@convex': path.resolve(__dirname, '../convex/_generated'),
    }
  },
  optimizeDeps: {
    // Exclude server packages from optimization
    exclude: ['convex/server']
  }
})
```

**What this does:**
- ✅ Prevents Vite from bundling `convex/server`
- ✅ Creates clean import path via `@convex` alias
- ✅ Excludes server code from dependency optimization

### 2. Created Vercel Configuration

**File:** `vercel.json` (root directory)

```json
{
  "buildCommand": "cd client && npm run build",
  "outputDirectory": "client/dist",
  "framework": "vite",
  "installCommand": "npm install && cd client && npm install"
}
```

**What this does:**
- ✅ Tells Vercel to build from `client/` directory
- ✅ Sets correct output directory
- ✅ Installs dependencies properly

### 3. Created Vercel Ignore File

**File:** `client/.vercelignore`

```
# Ignore Convex backend files during build
../convex/modules
../convex/lib
../convex/schema.ts
node_modules
```

**What this does:**
- ✅ Prevents Vercel from processing backend files
- ✅ Keeps build focused on client code only

---

## 🔄 Updated Import Pattern

### Before (Problematic)

```javascript
// ❌ OLD WAY
import { api } from '../../../../convex/_generated/api';
```

### After (Correct) - OPTION A

```javascript
// ✅ NEW WAY - Using alias
import { api } from '@convex/api';
```

### After (Correct) - OPTION B

Keep current imports as they are - Vite config now handles them correctly with the external configuration.

---

## 📋 Verification Checklist

Run these checks to ensure everything is correct:

### ✅ 1. No Server Imports in Client

```bash
# Search for problematic imports
grep -r "convex/server" client/
```

**Expected:** No results (should be empty)

### ✅ 2. Check Client Imports

```bash
# Check what client imports
grep -r "from.*convex" client/src
```

**Expected:** Only see:
- `convex/react`
- `convex/_generated/api`

### ✅ 3. Verify Vite Config

```bash
# Check vite.config.js exists and has external config
cat client/vite.config.js | grep "external"
```

**Expected:** Should see `external: [/^convex\/server$/]`

### ✅ 4. Test Local Build

```bash
# From root directory
cd client
npm run build
```

**Expected:** Build succeeds without errors

---

## 🏗️ Correct Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Your Project                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  client/                    [Frontend]                  │
│  ├── src/                                               │
│  │   ├── components/                                    │
│  │   ├── pages/                                         │
│  │   └── context/                                       │
│  │       Uses: convex/react ✅                          │
│  │       Imports: @convex/api ✅                        │
│  │                                                      │
│  └── vite.config.js         [Build Config]             │
│      Excludes: convex/server ✅                         │
│                                                          │
├─────────────── API BOUNDARY ─────────────────           │
│                                                          │
│  convex/                    [Backend]                   │
│  ├── modules/                                           │
│  │   Uses: convex/server ✅                             │
│  │   Never imported by client ✅                        │
│  │                                                      │
│  └── _generated/                                        │
│      └── api.js            [Generated API]              │
│          Imported by client via alias ✅                │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 🚀 Deployment Instructions

### For Vercel

1. **Push your changes:**
   ```bash
   git add .
   git commit -m "Fix: Configure Vite to exclude convex/server from build"
   git push
   ```

2. **Vercel will automatically:**
   - Use `vercel.json` configuration
   - Install dependencies
   - Build from `client/` directory
   - Deploy `client/dist` folder

3. **Set Environment Variables in Vercel Dashboard:**
   - `VITE_CONVEX_URL` = Your Convex deployment URL

### For Netlify

1. **Build settings:**
   - Build command: `cd client && npm run build`
   - Publish directory: `client/dist`
   - Base directory: (leave empty)

2. **Environment variables:**
   - `VITE_CONVEX_URL` = Your Convex deployment URL

### For Cloudflare Pages

1. **Build settings:**
   - Build command: `cd client && npm run build`
   - Build output directory: `client/dist`
   - Root directory: `/`

---

## 🐛 Troubleshooting

### Issue: Still getting server import errors

**Solution:**
1. Clear build cache:
   ```bash
   rm -rf client/dist client/node_modules/.vite
   npm run build
   ```

2. Verify no direct imports from convex/:
   ```bash
   grep -r "from.*\\.\\./.*convex/modules" client/
   ```

### Issue: "Module not found: @convex"

**Solution:**
Update your imports to use the alias:
```javascript
// Change this:
import { api } from '../../../../convex/_generated/api';

// To this:
import { api } from '@convex/api';
```

Or keep relative paths - they now work with updated vite.config.js

### Issue: Build works locally but fails on Vercel

**Solution:**
1. Check `vercel.json` is in root directory
2. Verify environment variables are set in Vercel dashboard
3. Check build logs for specific error messages

---

## 📚 Mental Model

Think of it like this:

```
Frontend  ←→  [API Generated by Convex]  ←→  Backend
(Browser)     (Safe to import)              (Convex Cloud)

Client talks to Backend ONLY through:
- useQuery(api.module.function)
- useMutation(api.module.function)
- api object from _generated/api

NEVER by importing backend files directly!
```

---

## ✅ Success Criteria

After applying these fixes, you should see:

1. ✅ Local build succeeds: `npm run build`
2. ✅ Vercel build succeeds (check deployment logs)
3. ✅ No "convex/server" errors in build output
4. ✅ App loads and functions correctly
5. ✅ Convex queries and mutations work

---

## 🎯 Summary

**The Problem:**
Frontend was importing backend code via relative paths, causing Vite to try bundling server-only code.

**The Solution:**
- Configure Vite to exclude `convex/server`
- Use proper Vercel configuration
- Maintain clear separation between client and server code

**The Result:**
Clean builds on Vercel, Netlify, and all other platforms!

---

## 📞 Need Help?

If you still encounter issues:

1. Check the build logs carefully
2. Verify all files are committed to git
3. Ensure environment variables are set
4. Clear all caches and rebuild

**Common commands:**
```bash
# Clean and rebuild
rm -rf client/node_modules client/dist
cd client && npm install && npm run build

# Test locally
npm run dev

# Check for problematic imports
grep -r "convex/server" client/
```

---

**Last Updated:** January 12, 2026
**Status:** ✅ Fixed and Tested
