import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for API routes and static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next()
  }

  // Handle auth routes
  if (pathname.startsWith('/auth')) {
    const token = request.cookies.get('admitverse_session')?.value
    
    // If trying to access login page
    if (pathname === '/auth/login') {
      // If already authenticated, redirect to dashboard
      if (token) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
      // Not authenticated, show login page
      return NextResponse.next()
    }
    
    return NextResponse.next()
  }

  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admitverse_session')?.value

    // Redirect /admin to /auth/login
    if (pathname === '/admin' || pathname === '/admin/') {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // For all admin routes, check authentication
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // Token exists, allow access
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}