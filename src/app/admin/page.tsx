'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminRedirectPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to homepage login
    router.push('/')
  }, [router])
  
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '64px',
          height: '64px',
          border: '4px solid #f3f4f6',
          borderTop: '4px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}></div>
        <p style={{
          marginTop: '16px',
          color: '#6b7280',
          fontSize: '16px'
        }}>
          Redirecting to login...
        </p>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}