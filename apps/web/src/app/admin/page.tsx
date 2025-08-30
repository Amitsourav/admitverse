'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to dashboard - user is already authenticated if they reach here
    router.push('/admin/dashboard')
  }, [router])
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  )
}