# 🔐 Environment Variables Setup Guide

## ✅ What We've Configured

Your Convex URL is now properly set up: `https://zany-gnat-805.convex.cloud`

---

## 📁 Local Development (Already Done ✅)

### Files Updated:

1. **`client/.env`** - Contains your actual Convex URL
   ```env
   VITE_CONVEX_URL=https://zany-gnat-805.convex.cloud
   ```

2. **`client/src/context/ConvexProvider.jsx`** - Updated to use your URL as default
   ```javascript
   const convexUrl = import.meta.env.VITE_CONVEX_URL || 'https://zany-gnat-805.convex.cloud';
   ```

3. **`client/.gitignore`** - Ensures `.env` is not committed

### Test Locally:

```bash
# From root directory
npm run dev
```

Your app should now connect to Convex successfully! ✅

---

## 🚀 Deployment Configuration

### For Vercel Deployment

#### Option 1: Using Vercel Dashboard (Recommended)

1. **Go to your Vercel project dashboard**
   - Visit: https://vercel.com/dashboard

2. **Select your project**
   - Click on your project name

3. **Go to Settings → Environment Variables**
   - Click "Settings" tab
   - Click "Environment Variables"

4. **Add the Convex URL**
   ```
   Name:  VITE_CONVEX_URL
   Value: https://zany-gnat-805.convex.cloud
   ```

5. **Select Environments**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

6. **Click "Save"**

7. **Redeploy**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

#### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Set environment variable
vercel env add VITE_CONVEX_URL

# When prompted, enter: https://zany-gnat-805.convex.cloud
# Select all environments: Production, Preview, Development

# Deploy
vercel --prod
```

#### Option 3: Using vercel.json (Not Recommended for Secrets)

We already have `vercel.json` configured for build settings. Environment variables should be set via dashboard for security.

---

### For Netlify Deployment

#### Using Netlify Dashboard:

1. **Go to Netlify dashboard**
   - Visit: https://app.netlify.com

2. **Select your site**

3. **Go to Site settings → Environment variables**

4. **Add variable**
   ```
   Key:   VITE_CONVEX_URL
   Value: https://zany-gnat-805.convex.cloud
   ```

5. **Select scope**
   - ✅ All deploy contexts

6. **Save and redeploy**

#### Using Netlify CLI:

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Set environment variable
netlify env:set VITE_CONVEX_URL "https://zany-gnat-805.convex.cloud"

# Deploy
netlify deploy --prod
```

---

### For Cloudflare Pages

1. **Go to Cloudflare Pages dashboard**

2. **Select your project**

3. **Go to Settings → Environment variables**

4. **Add variable**
   ```
   Variable name: VITE_CONVEX_URL
   Value: https://zany-gnat-805.convex.cloud
   ```

5. **Select environment**
   - Production

6. **Save and redeploy**

---

## 🧪 Verify Configuration

### Check if Environment Variable is Set:

Create a test file or add console.log temporarily:

```javascript
// Add this temporarily to any component
console.log('Convex URL:', import.meta.env.VITE_CONVEX_URL);
```

### Expected Output:

**Development:**
```
Convex URL: https://zany-gnat-805.convex.cloud
```

**Production (after deployment):**
```
Convex URL: https://zany-gnat-805.convex.cloud
```

### Test Convex Connection:

1. Open your deployed app
2. Open browser console (F12)
3. Look for Convex connection logs
4. Try using a feature that requires Convex (e.g., login)

If successful, you'll see:
- ✅ No connection errors
- ✅ Data loads properly
- ✅ Real-time updates work

---

## 📋 All Environment Variables (Complete List)

For your reference, here are all environment variables your app uses:

### Firebase (Authentication)
```env
VITE_FIREBASE_API_KEY=AIzaSyCeoGG37LDm8u2YRQydScYPHyiDFCs4XMU
VITE_FIREBASE_AUTH_DOMAIN=sahone-e0b82.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=sahone-e0b82
VITE_FIREBASE_STORAGE_BUCKET=sahone-e0b82.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=407950389858
VITE_FIREBASE_APP_ID=1:407950389858:web:d612e69bf051e23166d73b
VITE_FIREBASE_MEASUREMENT_ID=G-6M8KV5SK3F
```

### Convex (Backend)
```env
VITE_CONVEX_URL=https://zany-gnat-805.convex.cloud
```

### Cloudinary (Image Upload)
```env
# These are set in code, not via environment variables
# See: client/src/utils/cloudinary.js
```

---

## 🔒 Security Best Practices

### ✅ Do's:

1. **Always use environment variables for URLs**
   ```javascript
   const url = import.meta.env.VITE_CONVEX_URL; // ✅ Good
   ```

2. **Add `.env` to `.gitignore`**
   ```gitignore
   .env
   .env.local
   .env.production
   ```

3. **Use `.env.example` as template**
   ```env
   VITE_CONVEX_URL=https://your-deployment.convex.cloud
   ```

4. **Set environment variables in deployment platform**
   - Use Vercel/Netlify dashboard
   - Never commit actual values

### ❌ Don'ts:

1. **Never hardcode URLs in components**
   ```javascript
   const url = "https://..."; // ❌ Bad
   ```

2. **Never commit `.env` file**
   ```bash
   git add .env  # ❌ Never do this!
   ```

3. **Never expose secret keys**
   - API keys, private keys should be server-side only
   - VITE_ prefix makes them public in client bundle

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to Convex"

**Check:**
1. Environment variable is set
2. URL is correct (no trailing slash)
3. Convex deployment is active

**Solution:**
```bash
# Check local environment
echo $VITE_CONVEX_URL

# Restart dev server
npm run dev
```

### Issue: "undefined" Convex URL

**Check:**
1. Variable name starts with `VITE_`
2. Restart dev server after adding variable
3. Check browser console for actual value

**Solution:**
```javascript
// Add debug logging
console.log('Env:', import.meta.env.VITE_CONVEX_URL);
```

### Issue: Works locally but not in production

**Check:**
1. Environment variable set in deployment platform
2. Variable name matches exactly (case-sensitive)
3. Redeployed after setting variable

**Solution:**
- Set variable in platform dashboard
- Trigger new deployment

---

## 📦 Quick Deployment Checklist

Before deploying, ensure:

- [ ] `client/.env` has correct Convex URL ✅ (Done)
- [ ] `client/.gitignore` excludes `.env` ✅ (Done)
- [ ] `ConvexProvider.jsx` uses environment variable ✅ (Done)
- [ ] Local dev works with Convex ✅ (Test this)
- [ ] Set `VITE_CONVEX_URL` in deployment platform
- [ ] Set all Firebase variables in deployment platform
- [ ] Deploy and test

---

## 🎯 Next Steps

1. **Test Locally:**
   ```bash
   npm run dev
   ```
   - Check if Convex connects
   - Try login/signup
   - Browse menu

2. **Deploy to Vercel:**
   ```bash
   # Push to GitHub (triggers auto-deploy)
   git add .
   git commit -m "Configure Convex URL for deployment"
   git push origin main
   ```

3. **Set Environment Variables in Vercel Dashboard:**
   - Go to project settings
   - Add `VITE_CONVEX_URL`
   - Add all Firebase variables
   - Redeploy

4. **Verify Deployment:**
   - Visit deployed URL
   - Check browser console
   - Test all features

---

## ✅ Summary

**What was configured:**
- ✅ Local `.env` file with Convex URL
- ✅ Updated `ConvexProvider.jsx` with fallback
- ✅ Created `.gitignore` to protect secrets
- ✅ Updated `.env.example` as template

**What you need to do:**
1. Test locally (should work now)
2. Set environment variable in Vercel dashboard
3. Deploy

**Your Convex URL:**
```
https://zany-gnat-805.convex.cloud
```

---

**You're all set! Deploy and enjoy! 🚀**

*Last Updated: January 12, 2026*
