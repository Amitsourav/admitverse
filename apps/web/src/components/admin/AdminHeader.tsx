'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Search, Menu, LogOut, User, Settings, ChevronDown } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface AdminHeaderProps {
  user: {
    id: string
    username: string
    role: string
  }
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST',
      })

      if (response.ok) {
        router.push('/admin')
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
    }
  }

  const getUserInitials = (username: string) => {
    return username.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      display: 'flex',
      height: '64px',
      alignItems: 'center',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#ffffff',
      padding: '0 32px',
      gap: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Mobile menu button - Hidden on desktop */}
      <button
        type="button"
        style={{
          display: 'none',
          padding: '8px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <Menu style={{ height: '20px', width: '20px', color: '#6b7280' }} />
      </button>

      {/* Search Bar */}
      <form 
        style={{
          flex: 1,
          maxWidth: '600px',
          position: 'relative'
        }}
        onSubmit={handleSearch}
      >
        <Search style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          height: '18px',
          width: '18px',
          color: '#9ca3af',
          pointerEvents: 'none'
        }} />
        <input
          style={{
            width: '100%',
            padding: '10px 16px 10px 48px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            backgroundColor: '#f9fafb',
            color: '#111827',
            outline: 'none',
            transition: 'all 0.2s'
          }}
          placeholder="Search colleges, courses, or students..."
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={(e) => {
            e.target.style.backgroundColor = '#ffffff'
            e.target.style.borderColor = '#6366f1'
            e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)'
          }}
          onBlur={(e) => {
            e.target.style.backgroundColor = '#f9fafb'
            e.target.style.borderColor = '#e5e7eb'
            e.target.style.boxShadow = 'none'
          }}
        />
      </form>

      {/* Right section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Notifications */}
        <div style={{ position: 'relative' }}
             onMouseEnter={() => setShowNotifications(true)}
             onMouseLeave={() => setShowNotifications(false)}>
          <button
            style={{
              position: 'relative',
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#f9fafb',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb'
            }}
          >
            <Bell style={{ height: '18px', width: '18px', color: '#6b7280' }} />
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              border: '2px solid white'
            }} />
          </button>
          
          {/* Notifications dropdown */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '320px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
              zIndex: 50
            }}>
              <div style={{
                padding: '16px',
                borderBottom: '1px solid #f3f4f6'
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111827',
                  margin: 0
                }}>Notifications</h3>
              </div>
              <div style={{ padding: '16px' }}>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  margin: 0,
                  textAlign: 'center'
                }}>No new notifications</p>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div style={{ position: 'relative' }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => setShowDropdown(!showDropdown)}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb'
              e.currentTarget.style.borderColor = '#d1d5db'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff'
              e.currentTarget.style.borderColor = '#e5e7eb'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {getUserInitials(user.username)}
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#111827',
                margin: 0,
                lineHeight: '1.2'
              }}>{user.username}</p>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                margin: 0,
                lineHeight: '1.2'
              }}>{user.role || 'Admin'}</p>
            </div>
            <ChevronDown style={{
              height: '16px',
              width: '16px',
              color: '#6b7280',
              transition: 'transform 0.2s',
              transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
            }} />
          </button>

          {/* Dropdown menu */}
          {showDropdown && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '56px',
              width: '240px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
              zIndex: 50,
              overflow: 'hidden'
            }}>
              <div style={{ padding: '8px' }}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '10px 12px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#374151',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <User style={{ height: '16px', width: '16px', color: '#6b7280' }} />
                  <span>Profile</span>
                </button>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '10px 12px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#374151',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Settings style={{ height: '16px', width: '16px', color: '#6b7280' }} />
                  <span>Settings</span>
                </button>
              </div>
              <div style={{
                borderTop: '1px solid #f3f4f6',
                padding: '8px'
              }}>
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '10px 12px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#dc2626',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <LogOut style={{ height: '16px', width: '16px' }} />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showDropdown || showNotifications) && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 30
          }}
          onClick={() => {
            setShowDropdown(false)
            setShowNotifications(false)
          }}
        />
      )}
    </div>
  )
}