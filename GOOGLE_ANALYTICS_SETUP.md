# Google Analytics Setup for AdmitVerse

## Quick Setup Guide

### 1. Get Your Google Analytics ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property for your website
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Add to Environment Variables

1. Copy `.env.example` to `.env.local` (for local development)
2. Add your GA ID:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### 3. For Production (Vercel)

1. Go to your Vercel dashboard
2. Add environment variable:
   - Name: `NEXT_PUBLIC_GA_ID`
   - Value: `G-XXXXXXXXXX`
3. Redeploy your application

## What's Already Implemented

✅ **Google Analytics Component** (`src/components/GoogleAnalytics.tsx`)
- Automatic page view tracking
- Custom event tracking functions
- Route change detection

✅ **Integrated in Layout** (`src/app/layout.tsx`)
- GA script loads on all pages
- Respects user's environment variable

✅ **Event Tracking Added**
- Search queries (homepage)
- Tool usage (EMI Calculator clicks)
- More tracking can be easily added

## Available Tracking Functions

```typescript
import { trackSearch, trackButtonClick, trackToolUse } from '@/components/GoogleAnalytics'

// Track search queries
trackSearch('Harvard University')

// Track button clicks
trackButtonClick('Apply Now', 'university-detail')

// Track tool usage
trackToolUse('EMI Calculator')

// Track form submissions
trackFormSubmit('contact-form', 'contact-page')

// Track university views
trackUniversityView('Harvard University', 1)
```

## Testing

1. Add your GA ID to `.env.local`
2. Open browser dev tools → Network tab
3. Navigate around your site
4. Look for requests to `google-analytics.com/g/collect`
5. Check your GA dashboard for real-time data

## Common Issues

**GA not showing data?**
- Check if `NEXT_PUBLIC_GA_ID` is set correctly
- Ensure the ID starts with `G-`
- Wait 24-48 hours for data to appear in GA dashboard
- Check browser dev tools for any script errors

**Development vs Production**
- GA works in both environments
- Use different GA properties for dev/staging/production if needed