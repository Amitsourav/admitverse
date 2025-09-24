'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Activity,
  Users,
  Upload,
  BarChart3,
  Settings,
  ChevronRight,
  Circle
} from 'lucide-react'

const sidebarSections = [
  {
    title: 'Overview',
    items: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
      }
    ]
  },
  {
    title: 'Content Management',
    items: [
      {
        id: 'colleges',
        name: 'Colleges',
        href: '/admin/colleges',
        icon: GraduationCap,
        badge: 15,
      },
      {
        id: 'courses',
        name: 'Courses', 
        href: '/admin/courses',
        icon: BookOpen,
        badge: 87,
      },
      {
        id: 'specializations',
        name: 'Specializations',
        href: '/admin/specializations', 
        icon: Activity,
        badge: 156,
      },
      {
        id: 'leads',
        name: 'Leads',
        href: '/admin/leads',
        icon: Users,
        badge: 342,
      }
    ]
  },
  {
    title: 'Tools',
    items: [
      {
        id: 'bulk-import',
        name: 'Bulk Import',
        href: '/admin/bulk-import',
        icon: Upload
      },
      {
        id: 'analytics', 
        name: 'Analytics',
        href: '/admin/analytics',
        icon: BarChart3
      }
    ]
  },
  {
    title: 'System',
    items: [
      {
        id: 'settings',
        name: 'Settings',
        href: '/admin/settings',
        icon: Settings
      }
    ]
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e5e7eb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Logo Section */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid #f3f4f6'
      }}>
        <Link 
          href="/admin/dashboard"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            gap: '12px'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
          }}>
            A
          </div>
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#111827',
              margin: 0,
              letterSpacing: '-0.5px'
            }}>
              AdmitVerse
            </h2>
            <p style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: 0
            }}>
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav style={{
        flex: 1,
        padding: '20px 16px',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {sidebarSections.map((section, sectionIndex) => (
            <div key={section.title} style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Section Title */}
              <h4 style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#9ca3af',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                margin: '0 0 12px 16px'
              }}>
                {section.title}
              </h4>
              
              {/* Section Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  const isHovered = hoveredItem === item.id

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '14px 16px',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '500',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        backgroundColor: isActive 
                          ? 'rgba(99, 102, 241, 0.1)' 
                          : isHovered 
                            ? '#f9fafb' 
                            : 'transparent',
                        color: isActive ? '#6366f1' : '#374151',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {isActive && (
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '3px',
                          height: '60%',
                          backgroundColor: '#6366f1',
                          borderRadius: '0 2px 2px 0'
                        }} />
                      )}
                      <Icon style={{ 
                        marginRight: '14px',
                        marginLeft: isActive ? '6px' : '0',
                        height: '18px', 
                        width: '18px',
                        color: isActive ? '#6366f1' : '#6b7280',
                        transition: 'all 0.2s ease'
                      }} />
                      <span style={{ 
                        flex: 1,
                        fontWeight: isActive ? '600' : '500'
                      }}>
                        {item.name}
                      </span>
                      {'badge' in item && item.badge && (
                        <span style={{
                          padding: '4px 10px',
                          fontSize: '12px',
                          fontWeight: '600',
                          borderRadius: '14px',
                          backgroundColor: isActive 
                            ? '#6366f1' 
                            : '#f3f4f6',
                          color: isActive ? 'white' : '#6b7280',
                          minWidth: '32px',
                          textAlign: 'center',
                          transition: 'all 0.2s ease'
                        }}>
                          {'badge' in item ? item.badge : 0}
                        </span>
                      )}
                      {isHovered && !isActive && (
                        <ChevronRight style={{
                          width: '16px',
                          height: '16px',
                          color: '#9ca3af',
                          marginLeft: '8px',
                          opacity: 0.5
                        }} />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #f3f4f6',
        padding: '20px'
      }}>
        <div style={{
          padding: '12px',
          backgroundColor: '#f0fdf4',
          borderRadius: '8px',
          border: '1px solid #bbf7d0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '4px'
          }}>
            <Circle style={{
              width: '8px',
              height: '8px',
              color: '#10b981',
              fill: '#10b981'
            }} />
            <span style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#059669'
            }}>
              System Status
            </span>
          </div>
          <p style={{
            fontSize: '12px',
            color: '#047857',
            margin: 0
          }}>
            All services operational
          </p>
        </div>
      </div>
    </div>
  )
}