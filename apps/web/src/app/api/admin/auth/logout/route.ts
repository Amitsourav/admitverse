import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function POST() {
  try {
    // Get current session info for logging
    const cookieStore = cookies()
    const token = cookieStore.get('admitverse_session')?.value
    
    let loggedOutUser = 'unknown'
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
        loggedOutUser = decoded.username || decoded.id
      } catch (error) {
        // Token might be invalid, but we still want to clear it
      }
    }

    const response = NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    )

    // Clear the session cookie with secure settings
    response.cookies.set({
      name: process.env.SESSION_COOKIE_NAME || 'admitverse_session',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
      path: '/' // Ensure cookie is cleared across all paths
    })

    // Log successful logout for security monitoring
    console.log(`[SECURITY] User logout: ${loggedOutUser} at ${new Date().toISOString()}`)

    return response

  } catch (error) {
    console.error('[SECURITY] Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}