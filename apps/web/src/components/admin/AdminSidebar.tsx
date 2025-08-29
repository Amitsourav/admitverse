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
  Plus,
  Edit3,
  Trash2
} from 'lucide-react'

// Clean data structure
const sidebarData = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'colleges',
    name: 'Colleges',
    href: '/admin/colleges',
    icon: GraduationCap,
    badge: 15,
    hasActions: true
  },
  {
    id: 'courses',
    name: 'Courses', 
    href: '/admin/courses',
    icon: BookOpen,
    badge: 87,
    hasActions: true
  },
  {
    id: 'specializations',
    name: 'Specializations',
    href: '/admin/specializations', 
    icon: Activity,
    badge: 156,
    hasActions: true
  },
  {
    id: 'leads',
    name: 'Leads Analytics',
    href: '/admin/leads',
    icon: Users,
    badge: 342,
    hasActions: true
  },
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
  },
  {
    id: 'settings',
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState(null)

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-50">
        {/* Sidebar Container */}
        <div 
          className="flex flex-col flex-1 min-h-0"
          style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
            borderRight: '1px solid rgba(148, 163, 184, 0.1)'
          }}
        >
          {/* Header */}
          <div className="flex items-center h-16 px-6 border-b border-slate-700/50">
            <Link 
              href="/admin/dashboard"
              className="text-xl font-bold no-underline"
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              AdmitVerse
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <div className="space-y-1">
              {sidebarData.map((item) => {
                const isActive = pathname === item.href || (pathname === '/admin' && item.href === '/admin/dashboard')
                const Icon = item.icon

                return (
                  <div
                    key={item.id}
                    className="group"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {/* Main nav item */}
                    <Link
                      href={item.href}
                      className={`
                        flex items-center px-3 py-2.5 rounded-lg text-sm font-medium no-underline transition-colors
                        ${isActive 
                          ? 'bg-blue-600 text-white' 
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }
                      `}
                    >
                      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      <span className="flex-1 truncate">{item.name}</span>
                      {item.badge && (
                        <span 
                          className={`
                            ml-2 px-2 py-0.5 text-xs font-semibold rounded-full min-w-[20px] text-center
                            ${isActive ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-200'}
                          `}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>

                    {/* Action buttons */}
                    {item.hasActions && hoveredItem === item.id && (
                      <div className="flex items-center space-x-1 mt-1 ml-8 px-2">
                        <button
                          className="p-1.5 rounded bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                          onClick={(e) => {
                            e.preventDefault()
                            console.log('Add', item.name)
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          className="p-1.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                          onClick={(e) => {
                            e.preventDefault()
                            console.log('Edit', item.name)
                          }}
                        >
                          <Edit3 className="h-3 w-3" />
                        </button>
                        <button
                          className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                          onClick={(e) => {
                            e.preventDefault()
                            console.log('Delete', item.name)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="flex-shrink-0 border-t border-slate-700/50 p-4">
            <div className="flex items-center text-sm text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              System Online
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-slate-900 border-t border-slate-700 z-50">
        <div className="flex justify-around py-2">
          {sidebarData.slice(0, 5).map((item) => {
            const isActive = pathname === item.href || (pathname === '/admin' && item.href === '/admin/dashboard')
            const Icon = item.icon
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center py-1 px-2 text-xs no-underline ${
                  isActive ? 'text-blue-400' : 'text-slate-500'
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="truncate">{item.name.split(' ')[0]}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}