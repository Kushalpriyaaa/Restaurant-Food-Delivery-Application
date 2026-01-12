# 🚀 Deployment Checklist

## Pre-Deployment

### ✅ Code Verification
- [ ] All changes committed to git
- [ ] Build succeeds locally: `cd client && npm run build`
- [ ] No console errors in development mode
- [ ] All environment variables documented

### ✅ Configuration Files
- [ ] `vercel.json` exists in root directory
- [ ] `client/.vercelignore` exists
- [ ] `client/vite.config.js` has external config for convex/server
- [ ] `.gitignore` properly excludes build artifacts

### ✅ Dependencies
- [ ] All dependencies in `package.json` are needed
- [ ] No security vulnerabilities: `npm audit`
- [ ] Convex is properly configured

## Vercel Deployment

### 1. Environment Variables (Set in Vercel Dashboard)

```bash
VITE_CONVEX_URL=https://your-project.convex.cloud
```

### 2. Build Settings (Auto-configured via vercel.json)

- **Framework Preset:** Vite
- **Build Command:** `cd client && npm run build` ✅ (automatic)
- **Output Directory:** `client/dist` ✅ (automatic)
- **Install Command:** `npm install && cd client && npm install` ✅ (automatic)

### 3. Deploy

```bash
# Option 1: Push to GitHub (auto-deploy)
git push origin main

# Option 2: Deploy manually
vercel --prod
```

### 4. Verify Deployment

- [ ] Site loads without errors
- [ ] Authentication works (Login/Signup)
- [ ] Menu items display correctly
- [ ] Orders can be placed
- [ ] Images load properly
- [ ] Real-time updates work

## Netlify Deployment

### 1. Build Settings

```bash
# In Netlify dashboard or netlify.toml

Build command: cd client && npm run build
Publish directory: client/dist
```

### 2. Environment Variables

```bash
VITE_CONVEX_URL=https://your-project.convex.cloud
```

### 3. netlify.toml (Optional)

Create `netlify.toml` in root:

```toml
[build]
  command = "cd client && npm run build"
  publish = "client/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Cloudflare Pages

### 1. Build Settings

```bash
Build command: cd client && npm run build
Build output directory: client/dist
Root directory: /
```

### 2. Environment Variables

```bash
VITE_CONVEX_URL=https://your-project.convex.cloud
```

## Post-Deployment

### ✅ Functional Testing

#### User Role
- [ ] Can register new account
- [ ] Can login
- [ ] Can browse menu
- [ ] Can add items to cart
- [ ] Can place order
- [ ] Can view order history
- [ ] Can update profile

#### Admin Role
- [ ] Can access admin dashboard
- [ ] Can add/edit/delete menu items
- [ ] Can manage orders
- [ ] Can create offers
- [ ] Can view reports
- [ ] Can configure serving hours

#### Delivery Role
- [ ] Can view assigned orders
- [ ] Can confirm pickup
- [ ] Can confirm delivery
- [ ] Can toggle availability

### ✅ Performance Checks

- [ ] Lighthouse score > 80
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] No console errors
- [ ] No console warnings (or documented)

### ✅ Security Checks

- [ ] Firebase rules configured
- [ ] Convex functions have proper auth
- [ ] No API keys in client code
- [ ] HTTPS enabled
- [ ] CORS properly configured

## Troubleshooting Deployment Issues

### Build Fails on Vercel

1. Check build logs for specific error
2. Verify `vercel.json` is correct
3. Ensure all dependencies are in `package.json`
4. Check node version compatibility

```bash
# Add to package.json if needed
"engines": {
  "node": ">=16.0.0"
}
```

### Build Succeeds but App Doesn't Work

1. Check browser console for errors
2. Verify environment variables are set
3. Check Convex deployment is active
4. Verify Firebase configuration

### "Rollup failed to resolve import 'convex/server'"

See [CONVEX-BUILD-FIX.md](CONVEX-BUILD-FIX.md) for detailed solution.

Quick fix:
```bash
# Ensure vite.config.js has external config
cat client/vite.config.js | grep external
```

## Rollback Plan

If deployment fails:

1. **Vercel:** Instant rollback via dashboard
   - Go to Deployments
   - Click on previous working deployment
   - Click "Promote to Production"

2. **Git:** Revert commit
   ```bash
   git revert HEAD
   git push
   ```

3. **Manual:** Restore from backup
   - Restore database if needed
   - Redeploy previous version

## Monitoring

### Setup Alerts

1. **Uptime monitoring:**
   - UptimeRobot
   - Pingdom
   - StatusCake

2. **Error tracking:**
   - Sentry
   - LogRocket
   - Rollbar

3. **Analytics:**
   - Google Analytics
   - Plausible
   - Mixpanel

## Maintenance

### Regular Tasks

- [ ] Weekly: Check error logs
- [ ] Weekly: Review performance metrics
- [ ] Monthly: Update dependencies
- [ ] Monthly: Security audit
- [ ] Quarterly: Load testing

## Success Criteria

✅ Deployment is successful when:

1. Build completes without errors
2. Site is accessible at production URL
3. All user roles can perform their functions
4. Real-time features work (order updates)
5. Images load correctly
6. Authentication works
7. No critical console errors
8. Performance metrics are acceptable

---

## Quick Commands Reference

```bash
# Local development
npm run dev

# Local build test
cd client && npm run build

# Preview production build
cd client && npm run preview

# Deploy to Vercel
vercel --prod

# Check for issues
npm audit
npm outdated

# Clear cache
rm -rf client/node_modules/.vite client/dist
npm install
```

---

**Last Updated:** January 12, 2026
**Status:** Ready for Production ✅
