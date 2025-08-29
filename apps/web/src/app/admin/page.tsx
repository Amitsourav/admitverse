'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Globe, Lock } from 'lucide-react'

export default function AdminPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        alert('Login successful! Redirecting to dashboard...')
        router.push('/admin/dashboard')
      } else {
        alert(result.error || 'Login failed')
      }
    } catch (error) {
      alert('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '48px',
        width: '100%',
        maxWidth: '400px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '24px'
          }}>
            <div style={{
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              borderRadius: '8px',
              padding: '8px'
            }}>
              <Globe style={{ height: '24px', width: '24px', color: 'white' }} />
            </div>
            <span style={{
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              AdmitVerse
            </span>
          </div>
          
          <div style={{
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <Lock style={{ height: '20px', width: '20px', color: '#3b82f6' }} />
            <span style={{ 
              color: '#1e40af', 
              fontWeight: '600',
              fontSize: '16px'
            }}>
              Admin Panel Access
            </span>
          </div>
          
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '8px'
          }}>
            Welcome Back
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '16px'
          }}>
            Sign in to access the administration dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#9ca3af' : 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              color: 'white',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-1px)'
                e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            {loading ? 'Signing in...' : 'Sign In to Dashboard'}
          </button>
        </form>
        
        {/* Demo Credentials */}
        <div style={{
          marginTop: '32px',
          padding: '16px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <h4 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Demo Credentials:
          </h4>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
            Username: <span style={{ fontWeight: '500', color: '#111827' }}>admin</span><br/>
            Password: <span style={{ fontWeight: '500', color: '#111827' }}>admin123456</span>
          </p>
        </div>
      </div>
    </div>
  )
}