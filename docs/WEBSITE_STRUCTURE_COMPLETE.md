# Complete Website Structure for AdmitVerse
## File and Folder Organization Guide

**Document Version:** 1.0  
**Date:** August 26, 2024  
**Purpose:** Complete directory structure and file organization for AdmitVerse

---

## 📁 Complete Project Structure

```
admitverse-platform/
├── .github/                      # GitHub specific files
│   └── workflows/                # GitHub Actions CI/CD
│       ├── ci.yml                # Main CI/CD pipeline
│       └── preview.yml           # Preview deployment workflow
│
├── prisma/                       # Database schema and migrations
│   ├── schema.prisma             # Main database schema
│   ├── seed.ts                   # Database seed script
│   └── migrations/               # Database migrations (auto-generated)
│
├── public/                       # Static assets
│   ├── favicon.ico               # Website favicon
│   ├── robots.txt                # SEO robots file
│   ├── sitemap.xml               # SEO sitemap
│   ├── images/                   # Static images
│   │   ├── logo.png              # AdmitVerse logo
│   │   ├── hero-bg.jpg           # Homepage hero background
│   │   ├── colleges/             # College images
│   │   │   ├── mit-logo.png
│   │   │   ├── mit-cover.jpg
│   │   │   └── ...
│   │   ├── icons/                # UI icons
│   │   └── illustrations/        # Marketing illustrations
│   └── fonts/                    # Custom fonts (if any)
│
├── scripts/                      # Utility scripts
│   ├── setup.sh                  # Initial setup script
│   ├── test-services.js          # Service connection tests
│   ├── backup-db.sh              # Database backup script
│   └── pre-deploy.sh             # Pre-deployment checks
│
├── src/                          # Source code (main application)
│   ├── app/                      # Next.js 14 App Router
│   │   ├── (auth)/               # Authentication group
│   │   │   ├── layout.tsx        # Auth layout wrapper
│   │   │   ├── signin/           # Sign in page
│   │   │   │   └── page.tsx
│   │   │   ├── signup/           # Sign up page
│   │   │   │   └── page.tsx
│   │   │   ├── verify-request/   # Email verification
│   │   │   │   └── page.tsx
│   │   │   └── forgot-password/  # Password reset
│   │   │       └── page.tsx
│   │   │
│   │   ├── (marketing)/          # Marketing pages group
│   │   │   ├── layout.tsx        # Marketing layout
│   │   │   ├── about/            # About us page
│   │   │   │   └── page.tsx
│   │   │   ├── contact/          # Contact page
│   │   │   │   └── page.tsx
│   │   │   ├── privacy/          # Privacy policy
│   │   │   │   └── page.tsx
│   │   │   └── terms/            # Terms of service
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/          # User dashboard group
│   │   │   ├── layout.tsx        # Dashboard layout
│   │   │   ├── dashboard/        # Main dashboard
│   │   │   │   └── page.tsx
│   │   │   ├── saved/            # Saved colleges
│   │   │   │   └── page.tsx
│   │   │   ├── profile/          # User profile
│   │   │   │   └── page.tsx
│   │   │   └── settings/         # User settings
│   │   │       └── page.tsx
│   │   │
│   │   ├── admin/                # Admin panel
│   │   │   ├── layout.tsx        # Admin layout
│   │   │   ├── page.tsx          # Admin dashboard
│   │   │   ├── colleges/         # College management
│   │   │   │   ├── page.tsx      # List colleges
│   │   │   │   ├── new/          # Create college
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/         # Edit college
│   │   │   │       └── page.tsx
│   │   │   ├── courses/          # Course management
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── blogs/            # Blog management
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── leads/            # Lead management
│   │   │   │   └── page.tsx
│   │   │   └── users/            # User management
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/                  # API routes
│   │   │   ├── auth/             # NextAuth API
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── trpc/             # tRPC API
│   │   │   │   └── [trpc]/
│   │   │   │       └── route.ts
│   │   │   ├── webhooks/         # External webhooks
│   │   │   │   ├── stripe/
│   │   │   │   │   └── route.ts
│   │   │   │   └── resend/
│   │   │   │       └── route.ts
│   │   │   └── health/           # Health check endpoint
│   │   │       └── route.ts
│   │   │
│   │   ├── colleges/             # College pages
│   │   │   ├── page.tsx          # College listing
│   │   │   └── [slug]/           # College detail
│   │   │       ├── page.tsx
│   │   │       └── courses/      # College courses
│   │   │           └── page.tsx
│   │   │
│   │   ├── courses/              # Course pages
│   │   │   ├── page.tsx          # Course listing
│   │   │   └── [slug]/           # Course detail
│   │   │       └── page.tsx
│   │   │
│   │   ├── destinations/         # Country/city pages
│   │   │   ├── page.tsx          # Destinations list
│   │   │   └── [country]/        # Country detail
│   │   │       ├── page.tsx
│   │   │       └── [city]/       # City detail
│   │   │           └── page.tsx
│   │   │
│   │   ├── blog/                 # Blog section
│   │   │   ├── page.tsx          # Blog listing
│   │   │   ├── categories/       # Category pages
│   │   │   │   └── [category]/
│   │   │   │       └── page.tsx
│   │   │   └── [slug]/           # Blog post detail
│   │   │       └── page.tsx
│   │   │
│   │   ├── search/               # Search results
│   │   │   └── page.tsx
│   │   │
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   ├── globals.css           # Global styles
│   │   ├── not-found.tsx         # 404 page
│   │   ├── error.tsx             # Error boundary
│   │   └── loading.tsx           # Loading state
│   │
│   ├── components/               # Reusable components
│   │   ├── ui/                   # Base UI components
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── toggle.tsx
│   │   │   └── tooltip.tsx
│   │   │
│   │   ├── layout/               # Layout components
│   │   │   ├── header/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── nav-menu.tsx
│   │   │   │   ├── user-menu.tsx
│   │   │   │   └── mobile-menu.tsx
│   │   │   ├── footer/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── footer-links.tsx
│   │   │   │   └── newsletter.tsx
│   │   │   ├── sidebar/
│   │   │   │   ├── index.tsx
│   │   │   │   └── nav-items.tsx
│   │   │   └── container.tsx
│   │   │
│   │   ├── features/             # Feature-specific components
│   │   │   ├── search/
│   │   │   │   ├── global-search.tsx
│   │   │   │   ├── search-filters.tsx
│   │   │   │   ├── search-results.tsx
│   │   │   │   └── search-suggestions.tsx
│   │   │   ├── colleges/
│   │   │   │   ├── college-card.tsx
│   │   │   │   ├── college-grid.tsx
│   │   │   │   ├── college-hero.tsx
│   │   │   │   ├── college-info.tsx
│   │   │   │   ├── college-filters.tsx
│   │   │   │   └── college-comparison.tsx
│   │   │   ├── courses/
│   │   │   │   ├── course-card.tsx
│   │   │   │   ├── course-list.tsx
│   │   │   │   ├── course-details.tsx
│   │   │   │   └── specialization-badge.tsx
│   │   │   ├── blog/
│   │   │   │   ├── blog-card.tsx
│   │   │   │   ├── blog-grid.tsx
│   │   │   │   ├── blog-content.tsx
│   │   │   │   ├── blog-categories.tsx
│   │   │   │   └── blog-author.tsx
│   │   │   ├── leads/
│   │   │   │   ├── lead-capture-form.tsx
│   │   │   │   ├── contact-form.tsx
│   │   │   │   └── cta-banner.tsx
│   │   │   └── ai/
│   │   │       ├── ai-recommendations.tsx
│   │   │       ├── preference-form.tsx
│   │   │       └── chat-assistant.tsx
│   │   │
│   │   ├── admin/                # Admin components
│   │   │   ├── admin-header.tsx
│   │   │   ├── admin-sidebar.tsx
│   │   │   ├── data-table.tsx
│   │   │   ├── stats-card.tsx
│   │   │   └── forms/
│   │   │       ├── college-form.tsx
│   │   │       ├── course-form.tsx
│   │   │       └── blog-form.tsx
│   │   │
│   │   ├── sections/             # Homepage sections
│   │   │   ├── hero.tsx
│   │   │   ├── search-section.tsx
│   │   │   ├── featured-colleges.tsx
│   │   │   ├── popular-destinations.tsx
│   │   │   ├── recent-blogs.tsx
│   │   │   ├── testimonials.tsx
│   │   │   ├── how-it-works.tsx
│   │   │   └── cta-section.tsx
│   │   │
│   │   └── providers/            # Context providers
│   │       ├── auth-provider.tsx
│   │       ├── theme-provider.tsx
│   │       └── trpc-provider.tsx
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-search.ts
│   │   ├── use-saved-colleges.ts
│   │   ├── use-recommendations.ts
│   │   ├── use-debounce.ts
│   │   ├── use-intersection-observer.ts
│   │   └── use-local-storage.ts
│   │
│   ├── lib/                      # Utility libraries
│   │   ├── auth.ts               # NextAuth configuration
│   │   ├── prisma.ts             # Prisma client singleton
│   │   ├── utils.ts              # General utilities
│   │   ├── constants.ts          # App constants
│   │   ├── validations.ts        # Zod schemas
│   │   ├── supabase/
│   │   │   ├── client.ts         # Supabase client
│   │   │   └── server.ts         # Supabase server
│   │   ├── trpc/
│   │   │   ├── client.ts         # tRPC client
│   │   │   └── provider.tsx      # tRPC provider
│   │   ├── openai/
│   │   │   └── client.ts         # OpenAI client
│   │   └── email/
│   │       ├── client.ts         # Resend client
│   │       └── templates/        # Email templates
│   │           ├── welcome.tsx
│   │           ├── lead-notification.tsx
│   │           └── password-reset.tsx
│   │
│   ├── server/                   # Server-side code
│   │   ├── api/
│   │   │   ├── root.ts           # Root tRPC router
│   │   │   ├── trpc.ts           # tRPC context/setup
│   │   │   └── routers/          # API routers
│   │   │       ├── college.ts
│   │   │       ├── course.ts
│   │   │       ├── search.ts
│   │   │       ├── user.ts
│   │   │       ├── lead.ts
│   │   │       ├── blog.ts
│   │   │       ├── ai.ts
│   │   │       └── admin.ts
│   │   └── db/
│   │       ├── queries.ts        # Database queries
│   │       └── migrations.ts     # Migration helpers
│   │
│   ├── stores/                   # Zustand state stores
│   │   ├── auth-store.ts
│   │   ├── search-store.ts
│   │   ├── ui-store.ts
│   │   └── admin-store.ts
│   │
│   ├── styles/                   # Additional styles
│   │   ├── globals.css           # Global styles
│   │   └── prose.css             # Blog content styles
│   │
│   ├── types/                    # TypeScript types
│   │   ├── index.ts              # General types
│   │   ├── database.types.ts     # Database types
│   │   ├── api.types.ts          # API types
│   │   └── ui.types.ts           # UI component types
│   │
│   └── utils/                    # Utility functions
│       ├── format.ts             # Formatting utilities
│       ├── seo.ts                # SEO utilities
│       ├── analytics.ts          # Analytics helpers
│       └── errors.ts             # Error handling
│
├── tests/                        # Test files
│   ├── unit/                     # Unit tests
│   │   ├── components/
│   │   └── utils/
│   ├── integration/              # Integration tests
│   │   └── api/
│   └── e2e/                      # End-to-end tests
│       ├── auth.spec.ts
│       ├── search.spec.ts
│       └── admin.spec.ts
│
├── .env.example                  # Example environment variables
├── .env.local                    # Local environment variables (git ignored)
├── .eslintrc.json               # ESLint configuration
├── .gitignore                   # Git ignore file
├── .prettierrc                  # Prettier configuration
├── docker-compose.yml           # Docker configuration (optional)
├── jest.config.js               # Jest configuration
├── next-env.d.ts                # Next.js types
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── playwright.config.ts         # Playwright configuration
├── postcss.config.js            # PostCSS configuration
├── README.md                    # Project documentation
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── vercel.json                  # Vercel deployment configuration
```

---

## 📂 Key Directory Explanations

### `/src/app` - Next.js App Router
This is where all your pages and API routes live. Each folder with a `page.tsx` becomes a route.

**Route Groups** (folders in parentheses):
- `(auth)` - Authentication related pages with specific layout
- `(marketing)` - Public marketing pages
- `(dashboard)` - Protected user dashboard pages

### `/src/components` - React Components
Organized by purpose:
- `ui/` - Base reusable UI components (buttons, cards, etc.)
- `features/` - Feature-specific components (search, colleges, etc.)
- `layout/` - Layout components (header, footer, sidebar)
- `sections/` - Homepage and landing page sections
- `admin/` - Admin panel specific components
- `providers/` - React context providers

### `/src/lib` - Core Libraries
- Authentication setup
- Database clients
- API clients
- Email templates
- Utility functions

### `/src/server` - Server-side Code
- tRPC API routers
- Database queries
- Server-only utilities

### `/prisma` - Database
- Schema definition
- Migrations
- Seed data

### `/public` - Static Assets
- Images, fonts, and other static files
- Directly accessible via URL

---

## 🎯 Implementation Priority

### Phase 1: Core Structure (Week 1)
```
✅ /src/app/layout.tsx
✅ /src/app/page.tsx
✅ /src/app/globals.css
✅ /src/lib/supabase/client.ts
✅ /prisma/schema.prisma
✅ Basic UI components
```

### Phase 2: Authentication (Week 2)
```
✅ /src/app/(auth)/*
✅ /src/app/api/auth/*
✅ /src/lib/auth.ts
✅ Auth components
```

### Phase 3: Core Features (Week 3-4)
```
✅ /src/app/colleges/*
✅ /src/app/courses/*
✅ /src/server/api/routers/*
✅ Search functionality
✅ College/Course components
```

### Phase 4: User Features (Week 5)
```
✅ /src/app/(dashboard)/*
✅ Lead capture forms
✅ AI recommendations
✅ User profile
```

### Phase 5: Admin Panel (Week 6)
```
✅ /src/app/admin/*
✅ Admin components
✅ Content management
```

### Phase 6: Polish (Week 7-8)
```
✅ Blog system
✅ SEO optimization
✅ Performance tuning
✅ Testing
```

---

## 🚀 Getting Started

1. **Create the directory structure:**
```bash
# Run this in your project root
mkdir -p src/{app,components,lib,hooks,server,stores,types,utils}
mkdir -p src/app/{api,auth,admin,colleges,courses,blog}
# ... (create all directories as shown above)
```

2. **Start with core files:**
- `src/app/layout.tsx` - Root layout
- `src/app/page.tsx` - Homepage
- `src/lib/supabase/client.ts` - Database connection
- `prisma/schema.prisma` - Database schema

3. **Build incrementally:**
- Get homepage working first
- Add authentication
- Build one feature at a time
- Test as you go

---

## 📝 File Naming Conventions

### Pages and Layouts
- `page.tsx` - Page component
- `layout.tsx` - Layout wrapper
- `loading.tsx` - Loading state
- `error.tsx` - Error boundary
- `not-found.tsx` - 404 page

### Components
- `kebab-case.tsx` - Component files
- `PascalCase` - Component names
- `index.tsx` - Main component in folder

### Utilities and Hooks
- `kebab-case.ts` - Utility files
- `use-*.ts` - Custom hooks
- `camelCase` - Function names

### API Routes
- `route.ts` - API route handler
- `[param]/` - Dynamic routes

---

## 🔧 Configuration Files

### Essential Config Files to Create

**1. `/src/lib/utils.ts`**
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**2. `/src/lib/constants.ts`**
```typescript
export const APP_NAME = 'AdmitVerse'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100
```

**3. `/src/types/index.ts`**
```typescript
export interface User {
  id: string
  email: string
  name?: string
  role: 'user' | 'admin'
}

export interface College {
  id: string
  name: string
  slug: string
  location: Location
  // ... other fields
}
```

---

This structure provides a solid foundation for the AdmitVerse platform. Start with the core directories and build incrementally, adding files as you implement features. The modular organization makes it easy for teams to work on different parts simultaneously.