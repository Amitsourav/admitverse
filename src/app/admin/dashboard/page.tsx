'use client'

import { useEffect, useState } from 'react'
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  TrendingUp,
  Calendar,
  Activity
} from 'lucide-react'

interface DashboardStats {
  totalColleges: number
  totalCourses: number
  totalSpecializations: number
  totalLeads: number
  todaysLeads: number
  weeklyLeads: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalColleges: 0,
    totalCourses: 0,
    totalSpecializations: 0,
    totalLeads: 0,
    todaysLeads: 0,
    weeklyLeads: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        console.log('📊 Fetching dashboard stats from API...')
        setLoading(true)
        setError(null)

        const response = await fetch('/api/admin/stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const result = await response.json()
        console.log('📊 API Response:', result)

        if (result.success) {
          setStats({
            totalColleges: result.data.totalColleges || 0,
            totalCourses: result.data.totalCourses || 0, 
            totalSpecializations: result.data.totalSpecializations || 0,
            totalLeads: result.data.totalLeads || 0,
            todaysLeads: result.data.todaysLeads || 0,
            weeklyLeads: result.data.weeklyLeads || 0
          })
          console.log('✅ Dashboard stats updated successfully')
        } else {
          throw new Error(result.error || 'Failed to fetch stats')
        }
      } catch (error) {
        console.error('❌ Dashboard stats error:', error)
        setError(error instanceof Error ? error.message : 'Unknown error')
        
        // Fallback to mock data if API fails
        setStats({
          totalColleges: 15,
          totalCourses: 87,
          totalSpecializations: 156,
          totalLeads: 342,
          todaysLeads: 12,
          weeklyLeads: 67
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardStats()
  }, [])

  const statsCards = [
    {
      title: 'Total Colleges',
      value: stats.totalColleges,
      icon: GraduationCap,
      color: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      description: 'Universities in database'
    },
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: BookOpen,
      color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      description: 'Available courses'
    },
    {
      title: 'Specializations',
      value: stats.totalSpecializations,
      icon: Activity,
      color: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      description: 'Course specializations'
    },
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: Users,
      color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      description: 'All student inquiries'
    },
    {
      title: 'Today\'s Leads',
      value: stats.todaysLeads,
      icon: Calendar,
      color: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      bgColor: 'rgba(239, 68, 68, 0.1)',
      description: 'New leads today'
    },
    {
      title: 'This Week',
      value: stats.weeklyLeads,
      icon: TrendingUp,
      color: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
      bgColor: 'rgba(99, 102, 241, 0.1)',
      description: 'Leads this week'
    }
  ]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '8px'
          }}>
            Dashboard
          </h1>
          {loading && (
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid #f3f4f6',
              borderTop: '2px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          )}
        </div>
        <p style={{
          fontSize: '16px',
          color: '#6b7280'
        }}>
          Welcome to AdmitVerse Admin Panel. Here's your overview.
        </p>
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '8px',
            marginTop: '12px',
            fontSize: '14px',
            border: '1px solid #fecaca'
          }}>
            ⚠️ Error loading dashboard: {error}
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        {statsCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} style={{
              background: stat.bgColor,
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6b7280'
                }}>
                  {stat.title}
                </h3>
                <div style={{
                  background: stat.color,
                  borderRadius: '8px',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon style={{ height: '16px', width: '16px', color: 'white' }} />
                </div>
              </div>
              
              {/* Content */}
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '4px'
              }}>
                {stat.value}
              </div>
              <p style={{
                fontSize: '12px',
                color: '#6b7280'
              }}>
                {stat.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '16px'
        }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {[
            {
              icon: GraduationCap,
              title: 'Add New College',
              description: 'Add a new university to the database',
              color: '#3b82f6'
            },
            {
              icon: BookOpen,
              title: 'Add New Course',
              description: 'Create a new course offering',
              color: '#10b981'
            },
            {
              icon: Users,
              title: 'View Leads',
              description: 'Check recent student inquiries',
              color: '#f59e0b'
            }
          ].map((action, index) => {
            const ActionIcon = action.icon
            return (
              <div key={index} style={{
                padding: '16px',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb'
                e.currentTarget.style.borderColor = action.color
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.borderColor = '#e5e7eb'
              }}>
                <ActionIcon style={{ 
                  height: '32px', 
                  width: '32px', 
                  color: action.color,
                  marginBottom: '8px'
                }} />
                <h3 style={{
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '4px'
                }}>
                  {action.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {action.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '16px'
        }}>
          Recent Activity
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {[
            { type: 'College', text: 'Harvard University updated', time: '2 hours ago', color: '#3b82f6' },
            { type: 'Course', text: 'Computer Science course added to MIT', time: '4 hours ago', color: '#10b981' },
            { type: 'Lead', text: 'New lead from John Doe', time: '6 hours ago', color: '#f59e0b' }
          ].map((activity, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                backgroundColor: activity.color,
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {activity.type}
              </div>
              <span style={{
                fontSize: '14px',
                color: '#111827',
                flex: 1
              }}>
                {activity.text}
              </span>
              <span style={{
                fontSize: '12px',
                color: '#6b7280'
              }}>
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}