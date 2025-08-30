# Technical Architecture Implementation Guide
## AdmitVerse - Step-by-Step Development Guide

**Document Version:** 1.0  
**Date:** August 26, 2024  
**Purpose:** Complete technical implementation guide for developers

---

## Table of Contents

1. [Project Setup & Configuration](#1-project-setup--configuration)
2. [Database Implementation](#2-database-implementation)
3. [Authentication System](#3-authentication-system)
4. [Core API Development](#4-core-api-development)
5. [Frontend Foundation](#5-frontend-foundation)
6. [Feature Implementation](#6-feature-implementation)
7. [Testing & Quality Assurance](#7-testing--quality-assurance)
8. [Deployment & Production](#8-deployment--production)

---

## 1. Project Setup & Configuration

### Step 1.1: Initialize Next.js Project

```bash
# Create new Next.js project with TypeScript
npx create-next-app@latest admitverse-platform --typescript --tailwind --app

# Navigate to project
cd admitverse-platform

# Install additional dependencies
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install @trpc/server @trpc/client @trpc/react-query @trpc/next
npm install @tanstack/react-query
npm install zustand
npm install zod
npm install @radix-ui/themes
npm install lucide-react
npm install react-hook-form @hookform/resolvers
```

### Step 1.2: Project Structure Setup

Create the following directory structure:

```bash
mkdir -p src/{app,components,lib,hooks,stores,server,styles,types,utils}
mkdir -p src/app/{(auth),(marketing),(dashboard),api}
mkdir -p src/components/{ui,features,layout}
mkdir -p src/server/{api,db}
mkdir -p public/{images,fonts}
mkdir -p prisma
```

### Step 1.3: Configure TypeScript

Replace `tsconfig.json` with:

```json
{
  "compilerOptions": {
    "target": "es2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 1.4: Environment Variables Setup

Create `.env.local` from `.env.example`:

```bash
# Copy the example file
cp .env.example .env.local

# Generate secrets
openssl rand -base64 32  # For NEXTAUTH_SECRET
```

### Step 1.5: Configure Tailwind CSS

Update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#667eea",
          50: '#eef2ff',
          // ... (see full config in tailwind.config.ts)
        },
        secondary: {
          DEFAULT: "#764ba2",
          // ... (see full config)
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

### Step 1.6: Global Styles

Create `src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }
}
```

---

## 2. Database Implementation

### Step 2.1: Supabase Client Setup

Create `src/lib/supabase/client.ts`:

```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/database.types'

export const createClient = () => {
  return createClientComponentClient<Database>()
}
```

Create `src/lib/supabase/server.ts`:

```typescript
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database.types'

export const createServerClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ 
    cookies: () => cookieStore 
  })
}
```

### Step 2.2: Database Schema Implementation

Create `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model College {
  id                String   @id @default(uuid())
  name              String
  shortName         String?  @map("short_name")
  slug              String   @unique
  description       String?
  establishedYear   Int?     @map("established_year")
  type              String?
  accreditation     String?
  ranking           Json?
  location          Json
  contactInfo       Json     @map("contact_info")
  admissionInfo     Json     @map("admission_info")
  facilitiesInfo    Json     @map("facilities_info")
  images            Json
  videos            Json?
  virtualTourUrl    String?  @map("virtual_tour_url")
  brochureUrl       String?  @map("brochure_url")
  status            String   @default("draft")
  featured          Boolean  @default(false)
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")

  courses           Course[]
  savedByUsers      SavedCollege[]
  leads             Lead[]

  @@map("colleges")
}

model Course {
  id                String   @id @default(uuid())
  collegeId         String   @map("college_id")
  name              String
  slug              String
  level             String
  duration          Int
  durationUnit      String   @map("duration_unit")
  description       String?
  curriculum        Json?
  eligibility       Json?
  admissionProcess  Json?    @map("admission_process")
  fees              Json
  scholarships      Json?
  careerProspects   Json?    @map("career_prospects")
  status            String   @default("draft")
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")

  college           College  @relation(fields: [collegeId], references: [id])
  specializations   CourseSpecialization[]

  @@unique([collegeId, slug])
  @@map("courses")
}

model Specialization {
  id                String   @id @default(uuid())
  name              String
  slug              String   @unique
  description       String?
  careerPaths       Json?    @map("career_paths")
  skills            Json?
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")

  courses           CourseSpecialization[]

  @@map("specializations")
}

model CourseSpecialization {
  courseId          String   @map("course_id")
  specializationId  String   @map("specialization_id")
  additionalInfo    Json?    @map("additional_info")

  course            Course   @relation(fields: [courseId], references: [id])
  specialization    Specialization @relation(fields: [specializationId], references: [id])

  @@id([courseId, specializationId])
  @@map("course_specializations")
}

model User {
  id                String   @id @default(uuid())
  email             String   @unique
  name              String?
  avatar            String?
  role              String   @default("user")
  preferences       Json?
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")

  savedColleges     SavedCollege[]
  leads             Lead[]
  blogPosts         BlogPost[]

  @@map("users")
}

model SavedCollege {
  userId            String   @map("user_id")
  collegeId         String   @map("college_id")
  savedAt           DateTime @default(now()) @map("saved_at")

  user              User     @relation(fields: [userId], references: [id])
  college           College  @relation(fields: [collegeId], references: [id])

  @@id([userId, collegeId])
  @@map("saved_colleges")
}

model Lead {
  id                String   @id @default(uuid())
  userId            String?  @map("user_id")
  collegeId         String?  @map("college_id")
  name              String
  email             String
  phone             String?
  source            String
  status            String   @default("new")
  notes             String?
  metadata          Json?
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")

  user              User?    @relation(fields: [userId], references: [id])
  college           College? @relation(fields: [collegeId], references: [id])

  @@map("leads")
}

model BlogPost {
  id                String   @id @default(uuid())
  authorId          String   @map("author_id")
  title             String
  slug              String   @unique
  excerpt           String?
  content           Json
  featuredImage     String?  @map("featured_image")
  category          String
  tags              String[]
  status            String   @default("draft")
  publishedAt       DateTime? @map("published_at")
  seoMeta           Json?    @map("seo_meta")
  viewCount         Int      @default(0) @map("view_count")
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")

  author            User     @relation(fields: [authorId], references: [id])

  @@map("blog_posts")
}
```

### Step 2.3: Database Migration

Run database migrations:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Create migration (for production)
npx prisma migrate dev --name init
```

### Step 2.4: Seed Data Script

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample colleges
  const mit = await prisma.college.create({
    data: {
      name: 'Massachusetts Institute of Technology',
      shortName: 'MIT',
      slug: 'mit',
      description: 'Leading research university...',
      establishedYear: 1861,
      type: 'Private',
      location: {
        country: 'USA',
        state: 'Massachusetts',
        city: 'Cambridge',
        address: '77 Massachusetts Avenue',
        coordinates: { lat: 42.3601, lng: -71.0942 }
      },
      ranking: {
        world: 1,
        country: 1,
        subject: { 'Computer Science': 1, 'Engineering': 1 }
      },
      contactInfo: {
        website: 'https://mit.edu',
        email: 'admissions@mit.edu',
        phone: '+1-617-253-1000'
      },
      admissionInfo: {
        acceptanceRate: 6.7,
        requirements: ['SAT/ACT', 'TOEFL/IELTS', 'Essays'],
        deadlines: {
          fall: '2024-01-15',
          spring: '2024-09-15'
        }
      },
      fees: {
        tuition: 55878,
        housing: 17800,
        total: 77878,
        currency: 'USD'
      },
      images: {
        logo: '/images/colleges/mit-logo.png',
        cover: '/images/colleges/mit-cover.jpg',
        gallery: ['/images/colleges/mit-1.jpg']
      },
      status: 'published',
      featured: true
    }
  })

  // Create courses for MIT
  const csCourse = await prisma.course.create({
    data: {
      collegeId: mit.id,
      name: 'Master of Science in Computer Science',
      slug: 'ms-computer-science',
      level: 'Masters',
      duration: 2,
      durationUnit: 'years',
      description: 'Advanced computer science program...',
      fees: {
        tuition: 55878,
        currency: 'USD',
        perYear: true
      },
      eligibility: {
        minGPA: 3.5,
        requiredDegree: 'Bachelor in CS or related',
        englishRequirements: ['TOEFL 100+', 'IELTS 7.0+']
      },
      status: 'published'
    }
  })

  // Create specializations
  const aiSpec = await prisma.specialization.create({
    data: {
      name: 'Artificial Intelligence',
      slug: 'artificial-intelligence',
      description: 'Focus on AI and Machine Learning',
      careerPaths: ['AI Engineer', 'ML Researcher', 'Data Scientist'],
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning']
    }
  })

  // Link course with specialization
  await prisma.courseSpecialization.create({
    data: {
      courseId: csourse.id,
      specializationId: aiSpec.id
    }
  })

  // Create admin user
  await prisma.user.create({
    data: {
      email: 'admin@admitverse.com',
      name: 'Admin User',
      role: 'admin'
    }
  })

  console.log('✅ Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Add seed script to `package.json`:

```json
{
  "scripts": {
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

---

## 3. Authentication System

### Step 3.1: NextAuth Configuration

Create `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

Create `src/lib/auth.ts`:

```typescript
import { NextAuthOptions } from 'next-auth'
import { SupabaseAdapter } from '@auth/supabase-adapter'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!
  }),
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    }
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error'
  }
}
```

### Step 3.2: Auth Provider Component

Create `src/components/providers/auth-provider.tsx`:

```typescript
'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
```

### Step 3.3: Auth Pages

Create `src/app/auth/signin/page.tsx`:

```typescript
'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const result = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: '/dashboard'
      })
      
      if (result?.ok) {
        router.push('/auth/verify-request')
      }
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-6">Sign In to AdmitVerse</h1>
        
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Continue with Email'}
          </Button>
        </form>
        
        <div className="my-4 text-center text-sm text-gray-500">OR</div>
        
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </Button>
      </Card>
    </div>
  )
}
```

### Step 3.4: Protected Routes Middleware

Create `src/middleware.ts`:

```typescript
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Custom middleware logic here
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // Admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'admin'
        }
        
        // Dashboard routes
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token
        }
        
        return true
      }
    }
  }
)

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*']
}
```

---

## 4. Core API Development

### Step 4.1: tRPC Setup

Create `src/server/api/trpc.ts`:

```typescript
import { initTRPC, TRPCError } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import superjson from 'superjson'
import { ZodError } from 'zod'

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts
  const session = await getServerSession(req, res, authOptions)
  
  return {
    prisma,
    session,
    req,
    res
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    }
  }
})

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user }
    }
  })
})

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)

const enforceUserIsAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.session || ctx.session.user.role !== 'admin') {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user }
    }
  })
})

export const adminProcedure = t.procedure.use(enforceUserIsAdmin)
```

### Step 4.2: College API Router

Create `src/server/api/routers/college.ts`:

```typescript
import { z } from 'zod'
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  adminProcedure
} from '@/server/api/trpc'

export const collegeRouter = createTRPCRouter({
  // Get all colleges with filters
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
        filters: z.object({
          country: z.string().optional(),
          city: z.string().optional(),
          type: z.string().optional(),
          minFees: z.number().optional(),
          maxFees: z.number().optional(),
          search: z.string().optional()
        }).optional()
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, filters } = input
      
      const where: any = {
        status: 'published'
      }
      
      if (filters?.country) {
        where.location = { path: ['country'], equals: filters.country }
      }
      
      if (filters?.search) {
        where.OR = [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } }
        ]
      }
      
      const colleges = await ctx.prisma.college.findMany({
        take: limit + 1,
        where,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { courses: true }
          }
        }
      })
      
      let nextCursor: typeof cursor | undefined = undefined
      if (colleges.length > limit) {
        const nextItem = colleges.pop()
        nextCursor = nextItem!.id
      }
      
      return {
        items: colleges,
        nextCursor
      }
    }),
    
  // Get single college by slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const college = await ctx.prisma.college.findUnique({
        where: { slug: input.slug },
        include: {
          courses: {
            include: {
              specializations: {
                include: {
                  specialization: true
                }
              }
            }
          }
        }
      })
      
      if (!college || college.status !== 'published') {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'College not found'
        })
      }
      
      return college
    }),
    
  // Save/unsave college
  toggleSave: protectedProcedure
    .input(z.object({ collegeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id
      
      const existing = await ctx.prisma.savedCollege.findUnique({
        where: {
          userId_collegeId: {
            userId,
            collegeId: input.collegeId
          }
        }
      })
      
      if (existing) {
        await ctx.prisma.savedCollege.delete({
          where: {
            userId_collegeId: {
              userId,
              collegeId: input.collegeId
            }
          }
        })
        return { saved: false }
      } else {
        await ctx.prisma.savedCollege.create({
          data: {
            userId,
            collegeId: input.collegeId
          }
        })
        return { saved: true }
      }
    }),
    
  // Admin: Create college
  create: adminProcedure
    .input(
      z.object({
        name: z.string(),
        shortName: z.string().optional(),
        slug: z.string(),
        description: z.string().optional(),
        establishedYear: z.number().optional(),
        type: z.string().optional(),
        location: z.object({
          country: z.string(),
          state: z.string().optional(),
          city: z.string(),
          address: z.string().optional(),
          coordinates: z.object({
            lat: z.number(),
            lng: z.number()
          }).optional()
        }),
        ranking: z.any().optional(),
        contactInfo: z.object({
          website: z.string().optional(),
          email: z.string().optional(),
          phone: z.string().optional()
        }),
        fees: z.object({
          tuition: z.number(),
          housing: z.number().optional(),
          total: z.number(),
          currency: z.string()
        }),
        images: z.object({
          logo: z.string().optional(),
          cover: z.string().optional(),
          gallery: z.array(z.string()).optional()
        })
      })
    )
    .mutation(async ({ ctx, input }) => {
      const college = await ctx.prisma.college.create({
        data: {
          ...input,
          status: 'draft'
        }
      })
      
      return college
    }),
    
  // Admin: Update college
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.any() // Use the same schema as create
      })
    )
    .mutation(async ({ ctx, input }) => {
      const college = await ctx.prisma.college.update({
        where: { id: input.id },
        data: input.data
      })
      
      return college
    }),
    
  // Get featured colleges
  getFeatured: publicProcedure
    .query(async ({ ctx }) => {
      const colleges = await ctx.prisma.college.findMany({
        where: {
          featured: true,
          status: 'published'
        },
        take: 6,
        orderBy: { createdAt: 'desc' }
      })
      
      return colleges
    })
})
```

### Step 4.3: Search API Router

Create `src/server/api/routers/search.ts`:

```typescript
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

export const searchRouter = createTRPCRouter({
  // Global search
  global: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        types: z.array(z.enum(['colleges', 'courses', 'cities', 'blogs'])).optional()
      })
    )
    .query(async ({ ctx, input }) => {
      const { query, types = ['colleges', 'courses', 'cities', 'blogs'] } = input
      
      const results: any = {}
      
      // Search colleges
      if (types.includes('colleges')) {
        results.colleges = await ctx.prisma.college.findMany({
          where: {
            status: 'published',
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { shortName: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } }
            ]
          },
          take: 5,
          select: {
            id: true,
            name: true,
            slug: true,
            location: true,
            images: true
          }
        })
      }
      
      // Search courses
      if (types.includes('courses')) {
        results.courses = await ctx.prisma.course.findMany({
          where: {
            status: 'published',
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } }
            ]
          },
          take: 5,
          include: {
            college: {
              select: {
                name: true,
                slug: true
              }
            }
          }
        })
      }
      
      return results
    }),
    
  // Search suggestions
  suggestions: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.query.length < 2) return []
      
      const [colleges, courses] = await Promise.all([
        ctx.prisma.college.findMany({
          where: {
            status: 'published',
            name: { contains: input.query, mode: 'insensitive' }
          },
          take: 3,
          select: { name: true, slug: true }
        }),
        ctx.prisma.course.findMany({
          where: {
            status: 'published',
            name: { contains: input.query, mode: 'insensitive' }
          },
          take: 3,
          select: { name: true, slug: true }
        })
      ])
      
      return {
        colleges: colleges.map(c => ({ label: c.name, value: c.slug, type: 'college' })),
        courses: courses.map(c => ({ label: c.name, value: c.slug, type: 'course' }))
      }
    })
})
```

### Step 4.4: Root API Router

Create `src/server/api/root.ts`:

```typescript
import { createTRPCRouter } from '@/server/api/trpc'
import { collegeRouter } from './routers/college'
import { courseRouter } from './routers/course'
import { searchRouter } from './routers/search'
import { leadRouter } from './routers/lead'
import { blogRouter } from './routers/blog'
import { userRouter } from './routers/user'
import { aiRouter } from './routers/ai'

export const appRouter = createTRPCRouter({
  college: collegeRouter,
  course: courseRouter,
  search: searchRouter,
  lead: leadRouter,
  blog: blogRouter,
  user: userRouter,
  ai: aiRouter
})

export type AppRouter = typeof appRouter
```

### Step 4.5: tRPC API Route

Create `src/app/api/trpc/[trpc]/route.ts`:

```typescript
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { type NextRequest } from 'next/server'
import { env } from '@/env.mjs'
import { appRouter } from '@/server/api/root'
import { createTRPCContext } from '@/server/api/trpc'

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
    onError:
      env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
            )
          }
        : undefined
  })

export { handler as GET, handler as POST }
```

---

## 5. Frontend Foundation

### Step 5.1: tRPC Client Setup

Create `src/lib/trpc/client.ts`:

```typescript
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@/server/api/root'

export const api = createTRPCReact<AppRouter>()
```

Create `src/lib/trpc/provider.tsx`:

```typescript
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { useState } from 'react'
import { api } from './client'
import superjson from 'superjson'

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      })
  )

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </api.Provider>
    </QueryClientProvider>
  )
}

function getBaseUrl() {
  if (typeof window !== 'undefined') return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}
```

### Step 5.2: Layout Structure

Update `src/app/layout.tsx`:

```typescript
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { AuthProvider } from '@/components/providers/auth-provider'
import { TRPCProvider } from '@/lib/trpc/provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AdmitVerse - Your Gateway to International Education',
  description: 'Discover top international colleges and universities. Get personalized recommendations for your study abroad journey.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TRPCProvider>
            {children}
            <Toaster />
          </TRPCProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
```

### Step 5.3: Homepage Component

Create `src/app/page.tsx`:

```typescript
import { HeroSection } from '@/components/sections/hero'
import { SearchSection } from '@/components/sections/search'
import { FeaturedColleges } from '@/components/sections/featured-colleges'
import { PopularDestinations } from '@/components/sections/popular-destinations'
import { RecentBlogs } from '@/components/sections/recent-blogs'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SearchSection />
        <FeaturedColleges />
        <PopularDestinations />
        <RecentBlogs />
      </main>
      <Footer />
    </>
  )
}
```

### Step 5.4: Header Component

Create `src/components/layout/header.tsx`:

```typescript
'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { NavigationMenu } from '@/components/ui/navigation-menu'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AdmitVerse
          </span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <Link href="/colleges" className="px-4 py-2 hover:text-primary">
            Colleges
          </Link>
          <Link href="/courses" className="px-4 py-2 hover:text-primary">
            Courses
          </Link>
          <Link href="/destinations" className="px-4 py-2 hover:text-primary">
            Destinations
          </Link>
          <Link href="/blog" className="px-4 py-2 hover:text-primary">
            Resources
          </Link>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-4">
          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/saved">
                <Button variant="ghost">Saved</Button>
              </Link>
            </>
          ) : (
            <Link href="/auth/signin">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
```

### Step 5.5: Search Component

Create `src/components/features/search/global-search.tsx`:

```typescript
'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/trpc/client'
import { cn } from '@/lib/utils'

export function GlobalSearch({ className }: { className?: string }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: suggestions } = api.search.suggestions.useQuery(
    { query },
    { enabled: query.length >= 2 }
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'college') {
      router.push(`/colleges/${suggestion.value}`)
    } else if (suggestion.type === 'course') {
      router.push(`/courses/${suggestion.value}`)
    }
    setShowSuggestions(false)
    setQuery('')
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <form onSubmit={handleSearch} className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search colleges, courses, cities..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          className="pl-10 pr-24"
        />
        <Button type="submit" className="absolute right-1 top-1 h-8">
          Search
        </Button>
      </div>

      {showSuggestions && suggestions && (suggestions.colleges.length > 0 || suggestions.courses.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-lg z-50">
          {suggestions.colleges.length > 0 && (
            <div className="p-2">
              <p className="text-xs font-semibold text-muted-foreground px-2 py-1">Colleges</p>
              {suggestions.colleges.map((college) => (
                <button
                  key={college.value}
                  type="button"
                  onClick={() => handleSuggestionClick(college)}
                  className="w-full text-left px-2 py-1.5 hover:bg-accent rounded-md"
                >
                  {college.label}
                </button>
              ))}
            </div>
          )}
          
          {suggestions.courses.length > 0 && (
            <div className="p-2 border-t">
              <p className="text-xs font-semibold text-muted-foreground px-2 py-1">Courses</p>
              {suggestions.courses.map((course) => (
                <button
                  key={course.value}
                  type="button"
                  onClick={() => handleSuggestionClick(course)}
                  className="w-full text-left px-2 py-1.5 hover:bg-accent rounded-md"
                >
                  {course.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </form>
  )
}
```

---

## 6. Feature Implementation

### Step 6.1: College Listing Page

Create `src/app/colleges/page.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { CollegeCard } from '@/components/features/colleges/college-card'
import { CollegeFilters } from '@/components/features/colleges/college-filters'
import { api } from '@/lib/trpc/client'
import { Skeleton } from '@/components/ui/skeleton'

export default function CollegesPage() {
  const [filters, setFilters] = useState({
    country: '',
    city: '',
    type: '',
    minFees: undefined as number | undefined,
    maxFees: undefined as number | undefined
  })

  const { data, isLoading, fetchNextPage, hasNextPage } = 
    api.college.getAll.useInfiniteQuery(
      { 
        limit: 12,
        filters 
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor
      }
    )

  const colleges = data?.pages.flatMap((page) => page.items) ?? []

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore International Colleges</h1>
        <p className="text-muted-foreground">
          Discover your dream university from our curated list of top institutions worldwide
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <CollegeFilters filters={filters} onChange={setFilters} />
        </aside>

        <main className="lg:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>

              {hasNextPage && (
                <div className="mt-8 text-center">
                  <Button onClick={() => fetchNextPage()}>
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
```

### Step 6.2: College Detail Page

Create `src/app/colleges/[slug]/page.tsx`:

```typescript
import { notFound } from 'next/navigation'
import { api } from '@/lib/trpc/server'
import { CollegeHero } from '@/components/features/colleges/college-hero'
import { CollegeInfo } from '@/components/features/colleges/college-info'
import { CoursesSection } from '@/components/features/colleges/courses-section'
import { LeadCaptureForm } from '@/components/features/leads/lead-capture-form'

interface Props {
  params: { slug: string }
}

export default async function CollegePage({ params }: Props) {
  const college = await api.college.getBySlug.query({ slug: params.slug })

  if (!college) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <CollegeHero college={college} />
      
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CollegeInfo college={college} />
            <CoursesSection courses={college.courses} />
          </div>
          
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <LeadCaptureForm 
                source="college_page"
                collegeId={college.id}
                collegeName={college.name}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
```

### Step 6.3: Blog System

Create `src/app/blog/page.tsx`:

```typescript
import { BlogCard } from '@/components/features/blog/blog-card'
import { BlogCategories } from '@/components/features/blog/blog-categories'
import { api } from '@/lib/trpc/server'

export default async function BlogPage() {
  const posts = await api.blog.getAll.query({ limit: 12 })

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Resources & Insights</h1>
        <p className="text-muted-foreground">
          Expert guidance for your international education journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <BlogCategories />
        </aside>

        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.items.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
```

### Step 6.4: Admin Panel

Create `src/app/admin/layout.tsx`:

```typescript
import { AdminSidebar } from '@/components/admin/sidebar'
import { AdminHeader } from '@/components/admin/header'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

Create `src/app/admin/colleges/page.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { api } from '@/lib/trpc/client'
import { CollegeCreateDialog } from '@/components/admin/college-create-dialog'

export default function AdminCollegesPage() {
  const [open, setOpen] = useState(false)
  
  const { data: colleges, refetch } = api.college.getAll.useQuery({
    limit: 100,
    includeUnpublished: true
  })

  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'location.country', header: 'Country' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'createdAt', header: 'Created' },
    {
      id: 'actions',
      cell: ({ row }) => (
        <Button variant="outline" size="sm">
          Edit
        </Button>
      )
    }
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Colleges</h1>
        <Button onClick={() => setOpen(true)}>Add College</Button>
      </div>

      <DataTable columns={columns} data={colleges?.items ?? []} />
      
      <CollegeCreateDialog 
        open={open} 
        onClose={() => setOpen(false)}
        onSuccess={refetch}
      />
    </div>
  )
}
```

### Step 6.5: AI Recommendations

Create `src/server/api/routers/ai.ts`:

```typescript
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { openai } from '@/lib/openai'

export const aiRouter = createTRPCRouter({
  getRecommendations: protectedProcedure
    .input(
      z.object({
        preferences: z.object({
          studyLevel: z.string(),
          fieldOfStudy: z.string(),
          budget: z.object({
            min: z.number(),
            max: z.number(),
            currency: z.string()
          }),
          preferredCountries: z.array(z.string()),
          careerGoals: z.string().optional()
        })
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get user's saved colleges for context
      const savedColleges = await ctx.prisma.savedCollege.findMany({
        where: { userId: ctx.session.user.id },
        include: {
          college: {
            select: { name: true, location: true }
          }
        }
      })

      // Create AI prompt
      const prompt = `
        Based on the following student preferences, recommend 5 international colleges:
        
        Study Level: ${input.preferences.studyLevel}
        Field of Study: ${input.preferences.fieldOfStudy}
        Budget: ${input.preferences.budget.min}-${input.preferences.budget.max} ${input.preferences.budget.currency}
        Preferred Countries: ${input.preferences.preferredCountries.join(', ')}
        Career Goals: ${input.preferences.careerGoals || 'Not specified'}
        
        Previously saved colleges: ${savedColleges.map(s => s.college.name).join(', ')}
        
        Please provide recommendations in JSON format with reasoning for each.
      `

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert education counselor helping students find the best international colleges.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })

      const recommendations = JSON.parse(
        completion.choices[0]?.message?.content || '[]'
      )

      // Match recommendations with database colleges
      const collegeNames = recommendations.map((r: any) => r.name)
      const matchedColleges = await ctx.prisma.college.findMany({
        where: {
          name: { in: collegeNames },
          status: 'published'
        }
      })

      return {
        recommendations: matchedColleges.map((college) => {
          const aiRec = recommendations.find((r: any) => r.name === college.name)
          return {
            college,
            reasoning: aiRec?.reasoning || ''
          }
        })
      }
    })
})
```

---

## 7. Testing & Quality Assurance

### Step 7.1: Unit Tests Setup

Create `jest.config.js`:

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

Create `jest.setup.js`:

```javascript
import '@testing-library/jest-dom'
```

### Step 7.2: Component Tests

Create `src/components/ui/button.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('applies variant classes', () => {
    render(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('border')
  })
})
```

### Step 7.3: API Tests

Create `src/server/api/routers/college.test.ts`:

```typescript
import { createInnerTRPCContext } from '@/server/api/trpc'
import { appRouter } from '@/server/api/root'
import { prisma } from '@/lib/prisma'

describe('College Router', () => {
  it('returns published colleges', async () => {
    const ctx = createInnerTRPCContext({
      session: null,
    })

    const caller = appRouter.createCaller(ctx)
    const result = await caller.college.getAll({ limit: 10 })

    expect(result.items).toBeInstanceOf(Array)
    expect(result.items.every(c => c.status === 'published')).toBe(true)
  })
})
```

### Step 7.4: E2E Tests

Create `tests/e2e/search.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test.describe('Search functionality', () => {
  test('should search for colleges', async ({ page }) => {
    await page.goto('/')
    
    const searchInput = page.getByPlaceholder('Search colleges')
    await searchInput.fill('MIT')
    await searchInput.press('Enter')
    
    await expect(page).toHaveURL('/search?q=MIT')
    await expect(page.getByText('Massachusetts Institute')).toBeVisible()
  })

  test('should show search suggestions', async ({ page }) => {
    await page.goto('/')
    
    const searchInput = page.getByPlaceholder('Search colleges')
    await searchInput.fill('Comp')
    
    await expect(page.getByText('Computer Science')).toBeVisible()
  })
})
```

---

## 8. Deployment & Production

### Step 8.1: Pre-deployment Checklist

Create `scripts/pre-deploy.sh`:

```bash
#!/bin/bash

echo "🚀 Running pre-deployment checks..."

# Run type checking
echo "Running TypeScript checks..."
npm run type-check

# Run linting
echo "Running ESLint..."
npm run lint

# Run tests
echo "Running tests..."
npm test

# Build the application
echo "Building application..."
npm run build

# Check bundle size
echo "Analyzing bundle size..."
npm run analyze

echo "✅ Pre-deployment checks completed!"
```

### Step 8.2: Vercel Configuration

Create `vercel.json`:

```json
{
  "version": 2,
  "env": {
    "NODE_ENV": "production"
  },
  "build": {
    "env": {
      "NEXT_PUBLIC_APP_URL": "https://admitverse.com"
    }
  },
  "functions": {
    "src/app/api/trpc/[trpc]/route.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Step 8.3: GitHub Actions CI/CD

Create `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run type checking
        run: npm run type-check
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prod'
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Step 8.4: Production Environment Variables

Set these in Vercel dashboard:

```bash
# Production Database
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Authentication
NEXTAUTH_URL=https://admitverse.com
NEXTAUTH_SECRET=...

# APIs
OPENAI_API_KEY=...
RESEND_API_KEY=...

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=...
NEXT_PUBLIC_SENTRY_DSN=...

# Feature Flags
FEATURE_AI_RECOMMENDATIONS=true
FEATURE_BLOG=true
FEATURE_ADMIN_PANEL=true
```

### Step 8.5: Post-deployment Verification

Create `scripts/post-deploy.sh`:

```bash
#!/bin/bash

PRODUCTION_URL="https://admitverse.com"

echo "🔍 Running post-deployment verification..."

# Check homepage
curl -s -o /dev/null -w "%{http_code}" $PRODUCTION_URL

# Check API health
curl -s "$PRODUCTION_URL/api/health"

# Run Lighthouse
npx lighthouse $PRODUCTION_URL --output=json --output-path=./lighthouse-report.json

echo "✅ Post-deployment verification completed!"
```

---

## Summary

This step-by-step guide covers the complete technical implementation of AdmitVerse:

1. **Project Setup**: TypeScript, Tailwind CSS, and Next.js 14 configuration
2. **Database**: Supabase integration with Prisma ORM
3. **Authentication**: NextAuth.js with multiple providers
4. **API Development**: tRPC for type-safe APIs
5. **Frontend**: React components with shadcn/ui
6. **Features**: Search, colleges, courses, blog, admin panel
7. **Testing**: Unit, integration, and E2E tests
8. **Deployment**: Vercel deployment with CI/CD

Follow each step sequentially to build the complete AdmitVerse platform. The modular architecture allows for parallel development once the foundation is set up.

**Estimated Development Time**: 6-8 weeks with a team of 3-5 developers