# 📝 Quick Start Guide

Welcome to the Restaurant Food Delivery Application! This guide will help you get started quickly.

## 🎯 What We Fixed

### The "convex/server" Build Error ✅

**Problem:** Build was failing with "Rollup failed to resolve import 'convex/server'"

**Root Cause:** Frontend was importing backend Convex code through relative paths

**Solution Applied:**
1. ✅ Updated `client/vite.config.js` to exclude server imports
2. ✅ Created `vercel.json` for proper deployment configuration
3. ✅ Created `.vercelignore` to prevent building backend files
4. ✅ Build now succeeds both locally and on Vercel

**Verification:** Build tested successfully ✅

---

## 📚 Documentation Overview

We've created comprehensive documentation:

| Document | Purpose | Use When |
|----------|---------|----------|
| [README.md](README.md) | Main project documentation | First time setup |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System architecture details | Understanding the system |
| [WORKFLOW.md](WORKFLOW.md) | User workflows & processes | Understanding features |
| [CONVEX-BUILD-FIX.md](CONVEX-BUILD-FIX.md) | Build error troubleshooting | Fixing build issues |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Deployment checklist | Deploying to production |

---

## 🚀 Quick Start (3 Steps)

### 1. Install Dependencies

```bash
# From root directory
npm install
cd client
npm install
cd ..
```

### 2. Configure Environment

Create necessary configuration files:

**Firebase:** `client/src/config/firebase.js`
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

**Convex:** Initialize with
```bash
npx convex dev
```

**Cloudinary:** Update `client/src/utils/cloudinary.js`
```javascript
export const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset';
export const CLOUDINARY_CLOUD_NAME = 'your_cloud_name';
```

### 3. Run the Application

```bash
# From root directory
npm run dev
```

This starts:
- Frontend: http://localhost:3000
- Convex Backend: Connected automatically

---

## 🎭 User Roles & Login

### Test Accounts (After Setup)

1. **Customer Account**
   - Register via signup page
   - Role: `user`
   - Access: Menu, Cart, Orders, Profile

2. **Admin Account**
   - Create in Convex dashboard
   - Role: `admin`
   - Access: Dashboard, Menu Management, Orders, Reports

3. **Delivery Account**
   - Create in Convex dashboard
   - Role: `delivery`
   - Access: Assigned Orders, Delivery Management

---

## 📁 Project Structure (Simplified)

```
Root/
│
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── admin/         # Admin pages
│   │   ├── user/          # User pages
│   │   ├── delivery/      # Delivery pages
│   │   └── auth/          # Login/Signup
│   ├── vite.config.js     # ✅ Fixed build config
│   └── package.json
│
├── convex/                # Backend (Convex)
│   ├── modules/          # Business logic
│   ├── lib/              # Shared utilities
│   └── schema.ts         # Database schema
│
├── vercel.json           # ✅ Deployment config
├── README.md             # Main documentation
├── ARCHITECTURE.md       # System design
├── WORKFLOW.md           # Feature workflows
├── CONVEX-BUILD-FIX.md   # ✅ Build fix guide
└── DEPLOYMENT.md         # Deployment checklist
```

---

## 🔧 Common Commands

### Development

```bash
# Run everything (recommended)
npm run dev

# Run frontend only
npm run client

# Run backend only
npm run convex
```

### Building

```bash
# Test production build
cd client
npm run build

# Preview production build
npm run preview
```

### Deployment

```bash
# Deploy to Vercel
vercel --prod

# Or push to GitHub (auto-deploy)
git push origin main
```

---

## ⚠️ Important Notes

### ✅ Do's

- ✅ Keep `convex/` and `client/` code separate
- ✅ Use `convex/react` in client code
- ✅ Use `convex/server` in backend code only
- ✅ Import from `convex/_generated/api` for API calls
- ✅ Run `npx convex dev` before starting frontend

### ❌ Don'ts

- ❌ Don't import from `convex/server` in client code
- ❌ Don't import `convex/modules` directly in client
- ❌ Don't share files between backend and frontend
- ❌ Don't commit `.env` files with secrets

---

## 🐛 Troubleshooting Quick Reference

| Issue | Solution |
|-------|----------|
| "convex/server" error | See [CONVEX-BUILD-FIX.md](CONVEX-BUILD-FIX.md) |
| Build fails locally | Clear cache: `rm -rf client/node_modules/.vite client/dist` |
| Firebase auth error | Check Firebase console settings |
| Image upload fails | Verify Cloudinary credentials |
| Convex connection error | Ensure `npx convex dev` is running |
| Vercel build fails | Check `vercel.json` and environment variables |

---

## 📊 Features Overview

### For Customers
- 🍕 Browse menu by category
- 🛒 Add items to cart (half/full portions)
- 📦 Place orders
- 📍 Manage delivery addresses
- 🎟️ Apply discount codes
- 📱 Track order status in real-time

### For Admins
- 📊 View dashboard analytics
- 🍽️ Manage menu items
- 📂 Organize categories
- 📋 Process orders
- 🏷️ Create offers
- ⏰ Set serving hours
- 📈 Generate reports

### For Delivery Personnel
- 📋 View assigned orders
- 📍 Confirm pickup
- ✅ Complete delivery
- 🚗 Toggle availability

---

## 🎯 Next Steps

1. **For Development:**
   - Read [ARCHITECTURE.md](ARCHITECTURE.md) to understand the system
   - Read [WORKFLOW.md](WORKFLOW.md) to understand features
   - Start coding!

2. **For Deployment:**
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md) checklist
   - Set environment variables
   - Deploy to Vercel/Netlify

3. **For Troubleshooting:**
   - Check [CONVEX-BUILD-FIX.md](CONVEX-BUILD-FIX.md) for build issues
   - Check [README.md](README.md) for common issues
   - Check console logs for errors

---

## 💡 Pro Tips

1. **Development:**
   - Use React DevTools for debugging
   - Keep Convex dev console open
   - Check browser console for errors

2. **Performance:**
   - Images are auto-optimized via Cloudinary
   - Convex provides real-time updates (no polling)
   - PWA caching improves load times

3. **Security:**
   - Never commit Firebase config with real keys
   - Use environment variables for secrets
   - Keep Convex functions secured with auth

---

## 📞 Support

### Documentation
- 📖 Main: [README.md](README.md)
- 🏗️ Architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
- 🔄 Workflows: [WORKFLOW.md](WORKFLOW.md)
- 🔧 Build Fix: [CONVEX-BUILD-FIX.md](CONVEX-BUILD-FIX.md)
- 🚀 Deploy: [DEPLOYMENT.md](DEPLOYMENT.md)

### External Resources
- [Convex Docs](https://docs.convex.dev)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Firebase Docs](https://firebase.google.com/docs)

---

## ✅ Status

- ✅ Documentation Complete
- ✅ Build Error Fixed
- ✅ Local Build Tested
- ✅ Ready for Deployment

---

**Happy Coding! 🚀**

*Last Updated: January 12, 2026*
