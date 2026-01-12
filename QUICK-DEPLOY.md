# 🎯 Quick Deployment Guide - Convex URL Setup

## ✅ Status: CONFIGURED

Your Convex URL (`https://zany-gnat-805.convex.cloud`) is now properly configured!

---

## 📍 Where It's Set

### 1. Local Development ✅

**File:** `client/.env`
```env
VITE_CONVEX_URL=https://zany-gnat-805.convex.cloud
```

**File:** `client/src/context/ConvexProvider.jsx`
```javascript
const convexUrl = import.meta.env.VITE_CONVEX_URL || 'https://zany-gnat-805.convex.cloud';
```

### 2. Vercel Deployment (To Do)

You need to set this in **Vercel Dashboard**:

```
Variable: VITE_CONVEX_URL
Value: https://zany-gnat-805.convex.cloud
```

---

## 🚀 Deploy to Vercel - 3 Steps

### Step 1: Set Environment Variable in Vercel

**Option A: Via Dashboard (Easiest)**

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Add new variable:
   ```
   Name:  VITE_CONVEX_URL
   Value: https://zany-gnat-805.convex.cloud
   ```
5. Select all environments: Production, Preview, Development
6. Click **Save**

**Option B: Via CLI**

```bash
vercel env add VITE_CONVEX_URL
# When prompted, enter: https://zany-gnat-805.convex.cloud
# Select: All environments
```

### Step 2: Deploy

**Option A: Auto-deploy via Git**

```bash
git add .
git commit -m "Configure Convex URL for deployment"
git push origin main
```

Vercel will automatically deploy! ✅

**Option B: Manual deploy**

```bash
vercel --prod
```

### Step 3: Verify

1. Visit your deployed URL
2. Open browser console (F12)
3. Try logging in or browsing menu
4. Should see no Convex connection errors ✅

---

## 🧪 Test Before Deploying

```bash
# From root directory
npm run dev
```

**What to check:**
- ✅ App loads without errors
- ✅ Can view menu items (Convex connection working)
- ✅ Can login/signup (Firebase + Convex working)
- ✅ No console errors

---

## 📋 All Environment Variables Needed for Vercel

Copy these to your Vercel dashboard:

### 1. Convex Backend
```
VITE_CONVEX_URL=https://zany-gnat-805.convex.cloud
```

### 2. Firebase Auth (Already in your .env)
```
VITE_FIREBASE_API_KEY=AIzaSyCeoGG37LDm8u2YRQydScYPHyiDFCs4XMU
VITE_FIREBASE_AUTH_DOMAIN=sahone-e0b82.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=sahone-e0b82
VITE_FIREBASE_STORAGE_BUCKET=sahone-e0b82.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=407950389858
VITE_FIREBASE_APP_ID=1:407950389858:web:d612e69bf051e23166d73b
VITE_FIREBASE_MEASUREMENT_ID=G-6M8KV5SK3F
```

---

## 🎬 Visual Walkthrough

### Vercel Dashboard Steps:

```
1. Open Vercel Dashboard
   └─► https://vercel.com/dashboard

2. Select Your Project
   └─► Click on "KaDeep-Technologies--Assignment-"

3. Go to Settings
   └─► Click "Settings" tab at top

4. Environment Variables
   └─► Click "Environment Variables" in sidebar

5. Add Variable
   └─► Click "Add" button
   └─► Name: VITE_CONVEX_URL
   └─► Value: https://zany-gnat-805.convex.cloud
   └─► Environments: ✓ Production ✓ Preview ✓ Development
   └─► Click "Save"

6. Repeat for all Firebase variables (8 total)

7. Redeploy
   └─► Go to "Deployments" tab
   └─► Click "..." on latest deployment
   └─► Click "Redeploy"
   └─► Wait for build to complete

8. Test
   └─► Visit your live URL
   └─► Open browser console
   └─► Test app features
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Site loads without errors
- [ ] Can view menu items (Convex working)
- [ ] Can login/signup (Firebase working)
- [ ] Can add items to cart
- [ ] Real-time updates work
- [ ] Images load from Cloudinary
- [ ] No console errors

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot read Convex"

**Cause:** Environment variable not set

**Solution:**
1. Check Vercel dashboard → Environment Variables
2. Ensure `VITE_CONVEX_URL` is set
3. Redeploy

### Issue: "Authentication failed"

**Cause:** Firebase variables not set

**Solution:**
1. Add all Firebase variables to Vercel
2. Redeploy

### Issue: Works locally but not on Vercel

**Cause:** Environment variables not synced

**Solution:**
1. Double-check all variables in Vercel dashboard
2. Ensure variable names match exactly (case-sensitive)
3. Redeploy after setting variables

---

## 📞 Quick Reference

**Your Convex URL:**
```
https://zany-gnat-805.convex.cloud
```

**Test Locally:**
```bash
npm run dev
```

**Deploy:**
```bash
git push origin main
```

**Vercel Dashboard:**
```
https://vercel.com/dashboard
```

---

## 🎉 Summary

**What's Done:**
- ✅ Convex URL configured locally
- ✅ Environment files set up
- ✅ Code updated to use URL
- ✅ `.gitignore` protects secrets
- ✅ `vercel.json` configured

**What You Need to Do:**
1. Add `VITE_CONVEX_URL` to Vercel dashboard
2. Add Firebase variables to Vercel dashboard
3. Deploy to Vercel
4. Test deployed app

**Time to Complete:** ~5 minutes

---

**Ready to deploy! 🚀**

See [ENV-SETUP.md](ENV-SETUP.md) for detailed instructions.
