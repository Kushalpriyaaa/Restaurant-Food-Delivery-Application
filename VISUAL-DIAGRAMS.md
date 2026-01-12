# 🎨 Visual Architecture Diagrams

## The Problem: Boundary Violation

```
┌─────────────────────────────────────────────────────────────┐
│                        BEFORE (BROKEN)                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     Frontend (client/)                       │
│                                                              │
│  import { useQuery } from 'convex/react' ✅                 │
│  import { api } from '../../../../convex/_generated/api'    │
│                         │                                    │
│                         │ Relative path crosses boundary!   │
│                         ↓                                    │
└─────────────────────────┼────────────────────────────────────┘
                          │
                          │ ❌ VIOLATION
                          │
┌─────────────────────────▼────────────────────────────────────┐
│                    Backend (convex/)                          │
│                                                               │
│  convex/_generated/api.ts                                    │
│    ↓                                                         │
│  imports from: ../modules/auth/auth.ts                       │
│    ↓                                                         │
│  import { query } from "convex/server" ⚠️                    │
│                                                               │
│  ❌ This server code gets bundled into frontend!             │
└───────────────────────────────────────────────────────────────┘

Result: Build fails with "cannot resolve convex/server"
```

---

## The Solution: Proper Boundary Enforcement

```
┌─────────────────────────────────────────────────────────────┐
│                        AFTER (FIXED)                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     Frontend (client/)                       │
│                                                              │
│  import { useQuery } from 'convex/react' ✅                 │
│  import { api } from '../../../../convex/_generated/api' ✅ │
│                         │                                    │
│                         │ Still uses relative path BUT...   │
│                         ↓                                    │
└─────────────────────────┼────────────────────────────────────┘
                          │
                          │ ✅ PROTECTED BY VITE CONFIG
                          │
┌─────────────────────────▼────────────────────────────────────┐
│                  Vite Build Configuration                     │
│                                                               │
│  rollupOptions: {                                            │
│    external: [/^convex\/server$/]  ← BLOCKS server imports  │
│  }                                                           │
│                                                               │
│  Only imports:                                               │
│  • Type definitions (.d.ts) ✅                               │
│  • API surface (safe for frontend) ✅                        │
│                                                               │
│  Does NOT import:                                            │
│  • Server implementation ✅                                  │
│  • convex/server ✅                                          │
└───────────────────────────────────────────────────────────────┘
                          │
                          │ Safe API only
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                    Backend (convex/)                         │
│                                                              │
│  convex/_generated/api.ts (type definitions only)           │
│  convex/modules/*.ts (server code - NOT bundled)            │
│  import { query } from "convex/server" ✅ (stays in backend)│
└──────────────────────────────────────────────────────────────┘

Result: Build succeeds! Server code stays in backend ✅
```

---

## Import Flow: Before vs After

### BEFORE (Broken)

```
User Component (client/src/user/pages/Home.jsx)
    │
    │ import { api } from '../../../../convex/_generated/api'
    ↓
Vite tries to resolve: ../../../../convex/_generated/api
    │
    ↓ Follows import chain
    │
convex/_generated/api.ts
    │
    │ import from "../modules/auth/auth"
    ↓
convex/modules/auth/auth.ts
    │
    │ import { query } from "convex/server"
    ↓
convex/server (Server-only package)
    │
    ↓
❌ ERROR: Cannot bundle server-only code in browser!
```

### AFTER (Fixed)

```
User Component (client/src/user/pages/Home.jsx)
    │
    │ import { api } from '../../../../convex/_generated/api'
    ↓
Vite resolves: ../../../../convex/_generated/api
    │
    │ Vite config checks: "Is this importing convex/server?"
    │
    ├─ YES → ❌ Block it (external config)
    │
    └─ NO → ✅ Allow it
         │
         ↓
    Only type definitions imported (safe)
         │
         ↓
    ✅ Build succeeds! No server code in bundle!
```

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           React Application (client/)                  │ │
│  │                                                        │ │
│  │  useQuery(api.module.function)                        │ │
│  │         │                                              │ │
│  │         ↓                                              │ │
│  │  Convex Client (convex/react)                         │ │
│  │         │                                              │ │
│  │         │ WebSocket / HTTP                             │ │
│  └─────────┼────────────────────────────────────────────┘ │
└───────────┼──────────────────────────────────────────────────┘
            │
            │ Network Boundary
            │ (Never crosses build boundary!)
            │
┌───────────▼──────────────────────────────────────────────────┐
│                      Convex Cloud                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Convex Backend (convex/)                     │ │
│  │                                                        │ │
│  │  query/mutation functions                             │ │
│  │         │                                              │ │
│  │         ↓                                              │ │
│  │  import { query } from "convex/server" ✅             │ │
│  │         │                                              │ │
│  │         ↓                                              │ │
│  │  Database Operations                                  │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘

✅ Frontend and Backend never share code directly
✅ Communication only through generated API
✅ Build process keeps them separate
```

---

## File Organization: The Right Way

```
Project Root
│
├── client/ ─────────────────────► FRONTEND WORLD
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   │       import { useQuery } from 'convex/react' ✅
│   │   │       import { api } from '../../../../convex/_generated/api' ✅
│   │   │
│   │   ├── components/
│   │   └── context/
│   │
│   ├── vite.config.js ◄────────── BOUNDARY ENFORCER
│   │     {
│   │       external: [/^convex\/server$/] ✅
│   │     }
│   │
│   └── package.json
│       dependencies: {
│         "convex": "for convex/react only" ✅
│       }
│
└── convex/ ─────────────────────► BACKEND WORLD
    ├── modules/
    │   └── auth/
    │       └── auth.ts
    │           import { query } from "convex/server" ✅
    │
    ├── _generated/
    │   └── api.ts ◄─────────────── SAFE TO IMPORT
    │       (Type definitions only, no server code)
    │
    └── schema.ts

═══════════════════════════════════════════════════════════
COMMUNICATION LAYER (Generated by Convex)
═══════════════════════════════════════════════════════════

convex/_generated/api.ts
│
├── Type definitions ✅ (Safe for frontend)
├── API surface ✅ (Safe for frontend)
└── NO server implementation ✅ (Stays in backend)
```

---

## Build Process Flow

### Development Mode (Local)

```
npm run dev
    │
    ├─► Terminal 1: Frontend Dev Server
    │   └─► Vite dev server (permissive mode)
    │       └─► Serves client/ without strict bundling
    │           └─► Hot reload enabled ✅
    │
    └─► Terminal 2: Backend Dev Server
        └─► npx convex dev
            └─► Watches convex/ for changes
                └─► Auto-deploys to Convex Cloud ✅
```

### Production Build (Vercel/Netlify)

```
git push origin main
    │
    ↓
Deployment Platform (e.g., Vercel)
    │
    ├─► Install Dependencies
    │   └─► npm install (root)
    │   └─► npm install (client)
    │
    ├─► Build Frontend
    │   └─► cd client && npm run build
    │       └─► Vite production build
    │           │
    │           ├─► Apply external config ✅
    │           │   (Block convex/server)
    │           │
    │           ├─► Bundle client code only ✅
    │           │
    │           ├─► Optimize & minify ✅
    │           │
    │           └─► Output: client/dist/
    │
    ├─► Deploy Static Files
    │   └─► Upload client/dist/ to CDN ✅
    │
    └─► Success! 🎉
        └─► Site live at: https://your-app.vercel.app
```

---

## The Three Rules (Visual)

```
┌─────────────────────────────────────────────────────────────┐
│                   RULE #1: Separation                        │
└─────────────────────────────────────────────────────────────┘

Frontend (client/)           Backend (convex/)
      │                            │
      │   NEVER DIRECTLY           │
      │   IMPORT FROM              │
      │   EACH OTHER               │
      │                            │
      └─────────┬──────────────────┘
                │
                ↓
        Generated API Only
        (convex/_generated/api)


┌─────────────────────────────────────────────────────────────┐
│                   RULE #2: Import Types                      │
└─────────────────────────────────────────────────────────────┘

✅ Frontend CAN Import:
   • convex/react
   • convex/_generated/api (types & surface)

❌ Frontend CANNOT Import:
   • convex/server
   • convex/modules/* (implementation)
   • Any server-side code


┌─────────────────────────────────────────────────────────────┐
│                   RULE #3: Configuration                     │
└─────────────────────────────────────────────────────────────┘

vite.config.js MUST have:

  external: [/^convex\/server$/]
     │
     └─► Enforces Rules #1 and #2 at build time ✅
```

---

## Mental Model: Think of it Like This

```
┌─────────────────────────────────────────────────────────────┐
│                      RESTAURANT ANALOGY                      │
└─────────────────────────────────────────────────────────────┘

Frontend (client/)        =  Dining Room
  • Customers sit here
  • Can see the menu
  • Place orders
  • Can't enter kitchen
  ✅ Uses: Menu API

Backend (convex/)        =  Kitchen
  • Chefs work here
  • Prepare food
  • Access ingredients
  • Customers can't enter
  ✅ Uses: Kitchen equipment (convex/server)

Generated API            =  Menu & Waiter
  • Menu shows available dishes
  • Waiter takes orders
  • Brings food to table
  • Bridge between worlds
  ✅ Safe interface between frontend & backend

Build Configuration      =  Restaurant Rules
  • No customers in kitchen!
  • Kitchen tools stay in kitchen!
  • Communication through waiter only!
  ✅ Enforced by: vite.config.js
```

---

## Success Indicators

```
┌─────────────────────────────────────────────────────────────┐
│                    ✅ BUILD SUCCESSFUL                       │
└─────────────────────────────────────────────────────────────┘

Terminal Output:
  ✓ 841 modules transformed
  ✓ built in 5.30s

Browser Console:
  No errors ✅
  Convex connected ✅
  App running ✅

Vercel Dashboard:
  Build Status: Success ✅
  Deployment: Live ✅

User Experience:
  App loads ✅
  Features work ✅
  Real-time updates ✅


┌─────────────────────────────────────────────────────────────┐
│                    ❌ BUILD FAILED (Before)                  │
└─────────────────────────────────────────────────────────────┘

Terminal Output:
  ❌ [vite]: Rollup failed to resolve import "convex/server"
  ❌ Build failed

Vercel Dashboard:
  Build Status: Failed ❌
  Deployment: None ❌

User Experience:
  App not deployed ❌
  Site down ❌
```

---

This visual guide helps understand:
1. What the problem was
2. How the fix works
3. Why it's important to maintain boundaries
4. How to verify everything is correct

**Key Takeaway:** Keep frontend and backend separate, communicate through APIs only! ✅
