# Services Requirements & Setup Guide
## AdmitVerse - Complete Service Subscription Guide

**Document Version:** 1.0  
**Date:** August 26, 2024  
**Purpose:** Step-by-step guide to acquire all required services and credentials

---

## Table of Contents

1. [Required Services Overview](#required-services-overview)
2. [Service Setup Instructions](#service-setup-instructions)
3. [Environment Variables Configuration](#environment-variables-configuration)
4. [Cost Summary](#cost-summary)
5. [Setup Verification Checklist](#setup-verification-checklist)

---

## 1. Required Services Overview

### 🎯 Essential Services (Must Have)

| Service | Purpose | Cost | Priority |
|---------|---------|------|----------|
| **Supabase** | Database, Auth, Storage | $0-25/month | Critical |
| **Vercel** | Hosting & Deployment | $0-20/month | Critical |
| **GitHub** | Code Repository & CI/CD | $0-4/user | Critical |
| **OpenAI API** | AI Recommendations | Pay-as-you-go | Critical |
| **Resend** | Email Service | $0-20/month | Critical |
| **Google Analytics 4** | Analytics | Free | Critical |
| **Domain (Namecheap/GoDaddy)** | Website Domain | $10-20/year | Critical |

### 🚀 Recommended Services (Nice to Have)

| Service | Purpose | Cost | Priority |
|---------|---------|------|----------|
| **Cloudflare** | CDN & Security | $0-20/month | High |
| **Sentry** | Error Tracking | $0-26/month | High |
| **Hotjar** | User Analytics | $0-39/month | Medium |
| **Algolia** | Advanced Search | $0-50/month | Medium |
| **Datadog** | Monitoring | $0-31/month | Medium |

---

## 2. Service Setup Instructions

### 📊 Supabase Setup

**Purpose:** Database, Authentication, File Storage  
**URL:** https://supabase.com

#### Step-by-Step Setup:
1. **Create Account**
   - Go to https://supabase.com
   - Click "Start your project"
   - Sign up with GitHub (recommended) or email

2. **Create New Project**
   - Click "New Project"
   - Project name: `admitverse-prod`
   - Database password: Generate strong password (save it!)
   - Region: Select closest to your users (e.g., `Singapore` for India)
   - Pricing plan: Start with Free, upgrade to Pro when needed

3. **Get Credentials**
   ```
   Project URL: https://[YOUR_PROJECT_REF].supabase.co
   Anon Key: Found in Settings > API
   Service Role Key: Found in Settings > API (keep secret!)
   Database URL: Found in Settings > Database
   ```

4. **Configure Database**
   - Go to SQL Editor
   - Run the database schema from `Database_Schema_AdmitVerse.md`
   - Enable Row Level Security (RLS)
   - Set up authentication providers

#### Required Environment Variables:
```env
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJ...your_service_role_key
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[YOUR_PROJECT_REF].supabase.co:5432/postgres
```

---

### 🚀 Vercel Setup

**Purpose:** Frontend Hosting, Serverless Functions  
**URL:** https://vercel.com

#### Step-by-Step Setup:
1. **Create Account**
   - Go to https://vercel.com
   - Sign up with GitHub (required for auto-deploy)
   
2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Connect GitHub Repository**
   - Click "New Project"
   - Import from GitHub
   - Select your AdmitVerse repository
   - Configure build settings:
     ```
     Framework Preset: Next.js
     Root Directory: ./
     Build Command: npm run build
     Output Directory: .next
     ```

4. **Get Credentials**
   - Go to Account Settings > Tokens
   - Create new token with name "admitverse-deploy"
   - Copy token (shown only once!)

#### Required Environment Variables:
```env
VERCEL_TOKEN=YOUR_VERCEL_TOKEN
VERCEL_ORG_ID=team_...
VERCEL_PROJECT_ID=prj_...
```

---

### 🐙 GitHub Setup

**Purpose:** Code Repository, CI/CD, Version Control  
**URL:** https://github.com

#### Step-by-Step Setup:
1. **Create Organization** (Recommended)
   - Go to https://github.com/organizations/new
   - Organization name: `admitverse` or similar
   - Email: admin@admitverse.com
   - Choose Free plan initially

2.rongly recommendereate Repository**
   - Click "New repository"
   - Name: `admitverse-platform`
   - Private repository (stroed)
   - Initialize with README
   - Add `.gitignore` for Node

3. **Set up Secrets**
   - Go to Settings > Secrets and variables > Actions
   - Add all environment variables as secrets
   - Enable Actions for CI/CD

4. **Create Personal Access Token**
   - Profile > Settings > Developer settings > Personal access tokens
   - Generate new token (classic)
   - Permissions: repo, workflow
   - Copy token

#### Required Environment Variables:
```env
GITHUB_TOKEN=ghp_...your_token
GITHUB_OWNER=admitverse
GITHUB_REPO=admitverse-platform
```

---

### 🤖 OpenAI API Setup

**Purpose:** AI-Powered Recommendations  
**URL:** https://platform.openai.com

#### Step-by-Step Setup:
1. **Create Account**
   - Go to https://platform.openai.com
   - Sign up with email
   - Verify phone number (required)

2. **Add Payment Method**
   - Go to Billing > Payment methods
   - Add credit card
   - Set monthly budget limit ($100 recommended)

3. **Create API Key**
   - Go to API keys
   - Click "Create new secret key"
   - Name: "admitverse-prod"
   - Copy key immediately (shown only once!)

4. **Configure Usage Limits**
   - Set soft limit: $50/month
   - Set hard limit: $100/month
   - Enable email alerts

#### Required Environment Variables:
```env
OPENAI_API_KEY=sk-...your_api_key
OPENAI_ORG_ID=org-...your_org_id
OPENAI_MODEL=gpt-3.5-turbo  # or gpt-4 for better quality
```

---

### 📧 Resend Email Service Setup

**Purpose:** Transactional Emails  
**URL:** https://resend.com

#### Step-by-Step Setup:
1. **Create Account**
   - Go to https://resend.com
   - Sign up with email
   - Verify email address

2. **Add Domain**
   - Go to Domains
   - Add domain: admitverse.com
   - Add DNS records as shown
   - Wait for verification (up to 48 hours)

3. **Create API Key**
   - Go to API Keys
   - Create new key: "admitverse-prod"
   - Copy key

4. **Create Email Templates**
   - Set up templates for:
     - Welcome emails
     - Lead notifications
     - Password reset
     - Contact confirmations

#### Required Environment Variables:
```env
RESEND_API_KEY=re_...your_api_key
RESEND_FROM_EMAIL=noreply@admitverse.com
RESEND_REPLY_TO=support@admitverse.com
```

---

### 📊 Google Analytics 4 Setup

**Purpose:** Website Analytics  
**URL:** https://analytics.google.com

#### Step-by-Step Setup:
1. **Create Account**
   - Go to https://analytics.google.com
   - Sign in with Google account
   - Click "Start measuring"

2. **Set Up Property**
   - Account name: AdmitVerse
   - Property name: AdmitVerse Website
   - Time zone: India Standard Time
   - Currency: USD or INR

3. **Create Web Stream**
   - Platform: Web
   - Website URL: https://admitverse.com
   - Stream name: Main Website

4. **Get Measurement ID**
   - Copy Measurement ID (G-XXXXXXXXXX)

#### Required Environment Variables:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

### 🌐 Domain Registration

**Purpose:** Website Domain  
**Recommended Providers:** Namecheap, GoDaddy, Google Domains

#### Step-by-Step Setup:
1. **Search & Register Domain**
   - Go to provider website
   - Search for: admitverse.com
   - If taken, try: admitverse.io, getadmitverse.com
   - Purchase for 1+ years

2. **Configure DNS**
   - Point to Vercel:
     ```
     A Record: @ -> 76.76.21.21
     CNAME: www -> cname.vercel-dns.com
     ```

3. **SSL Certificate**
   - Vercel provides free SSL
   - Will auto-configure after DNS propagation

---

### 🛡️ Cloudflare Setup (Recommended)

**Purpose:** CDN, DDoS Protection, Performance  
**URL:** https://cloudflare.com

#### Step-by-Step Setup:
1. **Create Account**
   - Sign up at cloudflare.com
   - Choose Free plan initially

2. **Add Site**
   - Enter domain: admitverse.com
   - Cloudflare will scan DNS records
   - Update nameservers at domain registrar

3. **Configure Settings**
   - SSL/TLS: Full (strict)
   - Always Use HTTPS: On
   - Auto Minify: HTML, CSS, JS
   - Brotli: On

4. **Get API Token**
   - My Profile > API Tokens
   - Create Custom Token
   - Permissions: Zone:Read, DNS:Edit

#### Required Environment Variables:
```env
CLOUDFLARE_API_TOKEN=...your_token
CLOUDFLARE_ZONE_ID=...your_zone_id
```

---

### 🐛 Sentry Error Tracking Setup

**Purpose:** Error Tracking & Monitoring  
**URL:** https://sentry.io

#### Step-by-Step Setup:
1. **Create Account**
   - Sign up at sentry.io
   - Choose Developer plan (free)

2. **Create Project**
   - Platform: Next.js
   - Project name: admitverse-web
   - Team: admitverse

3. **Install & Configure**
   ```bash
   npm install @sentry/nextjs
   npx @sentry/wizard -i nextjs
   ```

4. **Get DSN**
   - Settings > Projects > admitverse-web > Client Keys
   - Copy DSN

#### Required Environment Variables:
```env
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_ORG=admitverse
SENTRY_PROJECT=admitverse-web
SENTRY_AUTH_TOKEN=...your_token
```

---

## 3. Environment Variables Configuration

### 📁 Development Environment (.env.local)

Create a file named `.env.local` in your project root:

```env
# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:password@db.xyzcompany.supabase.co:5432/postgres

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here-generate-using-openssl

# OpenAI
OPENAI_API_KEY=sk-...your_api_key_here
OPENAI_ORG_ID=org-...your_org_id
OPENAI_MODEL=gpt-3.5-turbo

# Email (Resend)
RESEND_API_KEY=re_...your_api_key
RESEND_FROM_EMAIL=noreply@admitverse.com
RESEND_REPLY_TO=support@admitverse.com

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=XXXXXXX

# Sentry Error Tracking
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_ORG=admitverse
SENTRY_PROJECT=admitverse-web
SENTRY_AUTH_TOKEN=...

# Vercel
VERCEL_TOKEN=...
VERCEL_ORG_ID=team_...
VERCEL_PROJECT_ID=prj_...

# Feature Flags
FEATURE_AI_RECOMMENDATIONS=true
FEATURE_BLOG=true
FEATURE_ADMIN_PANEL=true

# Environment
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 📁 Production Environment (.env.production)

For production, use Vercel's environment variables UI:

```env
# Same as above but with production values
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
NEXTAUTH_URL=https://admitverse.com
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://admitverse.com
# ... etc
```

### 🔐 Generate Secure Secrets

Run these commands to generate secure secrets:

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate secure passwords
openssl rand -base64 24

# Generate API keys format
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 4. Cost Summary

### 💰 Initial Setup Costs

| Service | Setup Cost | Monthly Cost | Annual Cost |
|---------|------------|--------------|-------------|
| Domain Registration | $15 | - | $15 |
| Supabase (Free → Pro) | $0 | $0-25 | $0-300 |
| Vercel (Free → Pro) | $0 | $0-20 | $0-240 |
| GitHub (Free → Team) | $0 | $0-4 | $0-48 |
| OpenAI API | $5 credit | $20-200 | $240-2400 |
| Resend Email | $0 | $0-20 | $0-240 |
| **Total** | **$20** | **$20-269** | **$495-3243** |

### 📈 Scaling Costs (20K+ users/month)

| Service | Monthly Cost | Notes |
|---------|--------------|-------|
| Supabase Pro | $25 | + $0.125/GB storage |
| Vercel Pro | $20 | + bandwidth overages |
| OpenAI API | $100-200 | Based on usage |
| Resend | $20 | 10K emails/month |
| Cloudflare Pro | $20 | Recommended |
| Sentry | $26 | Error tracking |
| **Total** | **~$200-300** | Scales with usage |

---

## 5. Setup Verification Checklist

### ✅ Service Setup Verification

Run these checks to verify all services are configured correctly:

#### 1. Supabase Connection Test
```javascript
// test-supabase.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function testConnection() {
  const { data, error } = await supabase.from('colleges').select('count')
  if (error) {
    console.error('❌ Supabase connection failed:', error)
  } else {
    console.log('✅ Supabase connected successfully')
  }
}

testConnection()
```

#### 2. OpenAI API Test
```javascript
// test-openai.js
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function testOpenAI() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say hello" }],
      max_tokens: 10
    })
    console.log('✅ OpenAI connected:', completion.choices[0].message)
  } catch (error) {
    console.error('❌ OpenAI connection failed:', error)
  }
}

testOpenAI()
```

#### 3. Email Service Test
```javascript
// test-resend.js
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function testEmail() {
  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: 'test@example.com',
      subject: 'Test Email',
      html: '<p>AdmitVerse email service is working!</p>'
    })
    console.log('✅ Email service connected:', data)
  } catch (error) {
    console.error('❌ Email service failed:', error)
  }
}

testEmail()
```

### 📋 Final Checklist

Before starting development, ensure:

- [ ] All services are registered and active
- [ ] Environment variables are set correctly
- [ ] Test connections are successful
- [ ] Payment methods are configured
- [ ] Usage limits are set to prevent overages
- [ ] Team members have appropriate access
- [ ] Backup payment methods are added
- [ ] DNS is properly configured
- [ ] SSL certificates are active
- [ ] Analytics tracking is verified

---

## 🚨 Security Best Practices

1. **Never commit `.env` files to Git**
   ```bash
   # .gitignore
   .env
   .env.local
   .env.production
   ```

2. **Use different credentials for each environment**
   - Development: Separate Supabase project
   - Staging: Limited access credentials
   - Production: Secure, rotated credentials

3. **Rotate API keys regularly**
   - Set calendar reminders every 90 days
   - Keep previous key active during transition

4. **Monitor usage and set alerts**
   - Set up billing alerts for all services
   - Monitor API usage dashboards
   - Review security logs weekly

---

## 📞 Support Contacts

| Service | Support Link | Response Time |
|---------|-------------|---------------|
| Supabase | support.supabase.com | 24-48 hours |
| Vercel | vercel.com/support | 24 hours |
| OpenAI | help.openai.com | 48-72 hours |
| Resend | resend.com/support | 24 hours |
| Cloudflare | support.cloudflare.com | 24 hours |

---

*This document contains all the information needed to set up the required services for AdmitVerse. Keep this document updated as services are added or credentials change.*