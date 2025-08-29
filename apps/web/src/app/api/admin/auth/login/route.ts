import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Simple hardcoded authentication for now
    const defaultUsername = process.env.DEFAULT_ADMIN_USERNAME || 'admin'
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123456'

    if (username !== defaultUsername || password !== defaultPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create user object
    const user = {
      id: '1',
      username: defaultUsername,
      role: 'admin'
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        id: user.id,
        username: user.username,
        role: user.role 
      },
      process.env.JWT_SECRET!,
      { 
        expiresIn: `${process.env.SESSION_TIMEOUT_HOURS || 24}h` 
      }
    )

    // Create response with httpOnly cookie
    const response = NextResponse.json(
      { 
        success: true, 
        user: { 
          id: user.id, 
          username: user.username,
          role: user.role 
        } 
      },
      { status: 200 }
    )

    // Set secure httpOnly cookie
    response.cookies.set({
      name: process.env.SESSION_COOKIE_NAME || 'admitverse_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: (parseInt(process.env.SESSION_TIMEOUT_HOURS || '24') * 60 * 60) // Convert to seconds
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}