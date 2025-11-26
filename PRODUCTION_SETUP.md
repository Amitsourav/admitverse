# Production Environment Setup

## 🚀 For Vercel Deployment

### Step 1: Add Environment Variables in Vercel Dashboard

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
NEXT_PUBLIC_GA_ID = G-FTE8M9L51R
```

### Step 2: Optional - Add Other Production Variables

```bash
# Application URLs
NEXT_PUBLIC_APP_URL = https://yourdomain.com

# OpenAI (if you want AI features)
OPENAI_API_KEY = sk-your-production-key

# Supabase (if using database features)
NEXT_PUBLIC_SUPABASE_URL = your-production-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY = your-production-service-role-key
```

### Step 3: Redeploy

After adding environment variables:
1. Go to **Deployments** tab in Vercel
2. Click **Redeploy** on your latest deployment
3. Or push a new commit to trigger automatic deployment

## 🔧 For Other Hosting Platforms

### Netlify
1. Go to Site Settings → Environment Variables
2. Add: `NEXT_PUBLIC_GA_ID = G-FTE8M9L51R`

### Railway
1. Go to Variables tab in your project
2. Add: `NEXT_PUBLIC_GA_ID = G-FTE8M9L51R`

### DigitalOcean App Platform
1. Go to Settings → Environment Variables
2. Add: `NEXT_PUBLIC_GA_ID = G-FTE8M9L51R`

## ✅ Verification

After deployment, verify GA is working:

1. **Check Network Tab**: Look for requests to `google-analytics.com`
2. **Google Analytics Dashboard**: Check Real-Time reports
3. **Browser Console**: No GA-related errors

## 📝 Important Notes

- **Never commit `.env` files** - they're in `.gitignore` for security
- **Use platform environment variables** for production secrets
- **Test in staging first** before production deployment
- **GA data appears within 24-48 hours** in full reports

## Current GA Configuration
- **Tracking ID**: G-FTE8M9L51R
- **Environment Variable**: NEXT_PUBLIC_GA_ID
- **Status**: Ready for production deployment