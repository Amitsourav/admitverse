'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  Grid3X3,
  List,
  GraduationCap,
  Clock,
  Users,
  Award,
  MoreHorizontal,
  Edit3,
  Trash2,
  Eye,
  TrendingUp,
  Calendar,
  Upload,
  Download
} from 'lucide-react'

interface Course {
  id: number
  name: string
  short_name?: string
  college_id: number
  degree_type?: string
  duration?: string
  total_seats?: number
  fees?: number
  description?: string
  eligibility?: string
  admission_process?: string
  status: string
  featured: boolean
  category?: string
  intake_dates?: string[]
  application_deadline?: string
  acceptance_rate?: number
  ranking?: number
  students_enrolled: number
  max_capacity?: number
  course_code?: string
  credits?: number
  mode?: string
  specializations?: string[]
  colleges?: {
    name: string
    location?: string
    country?: string
  }
  created_at: string
  updated_at?: string
}

export default function CoursesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedDegree, setSelectedDegree] = useState('all')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/courses')
      const result = await response.json()
      
      if (result.success) {
        setCourses(result.data)
      } else {
        console.error('Failed to fetch courses:', result.error)
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        const response = await fetch(`/api/admin/courses?id=${id}`, {
          method: 'DELETE'
        })
        
        const result = await response.json()
        
        if (result.success) {
          fetchCourses()
        } else {
          alert('Failed to delete course')
        }
      } catch (error) {
        console.error('Error deleting course:', error)
        alert('Failed to delete course')
      }
    }
  }

  const filteredCourses = courses.filter(course => {
    const collegeName = course.colleges?.name || ''
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collegeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (course.degree_type || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (course.category || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || course.status.toLowerCase() === selectedStatus.toLowerCase()
    const matchesDegree = selectedDegree === 'all' || (course.degree_type || '').toLowerCase().includes(selectedDegree.toLowerCase())
    return matchesSearch && matchesStatus && matchesDegree
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return { bg: '#dcfce7', color: '#166534', border: '#bbf7d0' }
      case 'draft':
        return { bg: '#fef3c7', color: '#92400e', border: '#fde68a' }
      case 'inactive':
        return { bg: '#fee2e2', color: '#dc2626', border: '#fecaca' }
      default:
        return { bg: '#f3f4f6', color: '#374151', border: '#d1d5db' }
    }
  }

  return (
    <div style={{
      padding: '32px'
    }}>
        {/* Header Section */}
        <div style={{
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}>
              <BookOpen style={{ width: '28px', height: '28px', color: 'white' }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#111827',
                margin: 0,
                letterSpacing: '-0.5px'
              }}>
                Courses Management
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: '4px 0 0 0'
              }}>
                Manage academic programs and course offerings across institutions
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                background: 'white',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb'
                e.currentTarget.style.borderColor = '#d1d5db'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              onClick={() => alert('Import functionality coming soon!')}
            >
              <Upload style={{ width: '16px', height: '16px' }} />
              Import
            </button>
            
            <button 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                background: 'white',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb'
                e.currentTarget.style.borderColor = '#d1d5db'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              onClick={() => {
                if (courses.length === 0) {
                  alert('No courses to export')
                  return
                }
                const csvData = courses.map(course => ({
                  Name: course.name,
                  'Short Name': course.short_name || '',
                  College: course.colleges?.name || '',
                  'Degree Type': course.degree_type || '',
                  Duration: course.duration || '',
                  'Total Seats': course.total_seats || '',
                  Fees: course.fees || '',
                  Category: course.category || '',
                  Mode: course.mode || '',
                  Credits: course.credits || '',
                  'Students Enrolled': course.students_enrolled || 0,
                  'Max Capacity': course.max_capacity || '',
                  'Acceptance Rate': course.acceptance_rate || '',
                  Ranking: course.ranking || '',
                  Status: course.status
                }))
                const csvContent = 'data:text/csv;charset=utf-8,' + 
                  Object.keys(csvData[0] || {}).join(',') + '\n' +
                  csvData.map(row => Object.values(row).join(',')).join('\n')
                const link = document.createElement('a')
                link.href = encodeURI(csvContent)
                link.download = `courses_${new Date().toISOString().split('T')[0]}.csv`
                link.click()
              }}
            >
              <Download style={{ width: '16px', height: '16px' }} />
              Export
            </button>

            <button 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 24px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              onClick={() => router.push('/admin/courses/new')}
            >
              <Plus style={{ width: '18px', height: '18px' }} />
              Add New Course
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {[
            { 
              title: 'Total Courses', 
              value: courses.length.toString(), 
              subtitle: 'All academic programs',
              icon: BookOpen,
              color: '#3b82f6',
              bgColor: '#eff6ff'
            },
            { 
              title: 'Active Courses', 
              value: courses.filter(c => c.status === 'Active').length.toString(), 
              subtitle: 'Currently enrolling',
              icon: TrendingUp,
              color: '#10b981',
              bgColor: '#f0fdf4'
            },
            { 
              title: 'Total Students', 
              value: courses.reduce((sum, c) => sum + (c.students_enrolled || 0), 0).toLocaleString(), 
              subtitle: 'Enrolled across all courses',
              icon: Users,
              color: '#8b5cf6',
              bgColor: '#faf5ff'
            },
            { 
              title: 'Institutions', 
              value: new Set(courses.map(c => c.colleges?.name || 'Unknown')).size.toString(), 
              subtitle: 'Partner universities',
              icon: GraduationCap,
              color: '#f59e0b',
              bgColor: '#fffbeb'
            }
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <div 
                key={index} 
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#6b7280',
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {stat.title}
                  </h3>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: stat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon style={{ width: '20px', height: '20px', color: stat.color }} />
                  </div>
                </div>
                <p style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#111827',
                  margin: '0 0 4px 0',
                  lineHeight: '1'
                }}>
                  {stat.value}
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  {stat.subtitle}
                </p>
              </div>
            )
          })}
        </div>

        {/* Search and Filters */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1', minWidth: '300px' }}>
              <div style={{ position: 'relative', flex: '1', maxWidth: '400px' }}>
                <Search style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '18px',
                  height: '18px',
                  color: '#6b7280'
                }} />
                <input
                  type="text"
                  placeholder="Search courses, institutions, or programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 46px',
                    border: '2px solid #f3f4f6',
                    borderRadius: '10px',
                    fontSize: '14px',
                    backgroundColor: '#f9fafb',
                    color: '#111827',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.backgroundColor = 'white'
                    e.target.style.borderColor = '#667eea'
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = '#f9fafb'
                    e.target.style.borderColor = '#f3f4f6'
                  }}
                />
              </div>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '2px solid #f3f4f6',
                  borderRadius: '10px',
                  fontSize: '14px',
                  backgroundColor: '#f9fafb',
                  color: '#111827',
                  cursor: 'pointer',
                  minWidth: '120px'
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <select
                value={selectedDegree}
                onChange={(e) => setSelectedDegree(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '2px solid #f3f4f6',
                  borderRadius: '10px',
                  fontSize: '14px',
                  backgroundColor: '#f9fafb',
                  color: '#111827',
                  cursor: 'pointer',
                  minWidth: '140px'
                }}
              >
                <option value="all">All Degrees</option>
                <option value="bachelor">Bachelor's</option>
                <option value="master">Master's</option>
                <option value="doctor">Doctoral</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                display: 'flex',
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                padding: '4px'
              }}>
                <button
                  onClick={() => setViewMode('table')}
                  style={{
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: viewMode === 'table' ? 'white' : 'transparent',
                    color: viewMode === 'table' ? '#111827' : '#6b7280',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <List style={{ width: '14px', height: '14px' }} />
                  Table
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: viewMode === 'grid' ? 'white' : 'transparent',
                    color: viewMode === 'grid' ? '#111827' : '#6b7280',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Grid3X3 style={{ width: '14px', height: '14px' }} />
                  Grid
                </button>
              </div>
            </div>
          </div>

          <div style={{
            fontSize: '13px',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            Showing <strong>{filteredCourses.length}</strong> of <strong>{courses.length}</strong> courses
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '64px 32px',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid #e5e7eb',
              borderTop: '2px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px'
            }} />
            <p style={{ color: '#6b7280', margin: 0 }}>Loading courses...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '64px 32px',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '32px',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto'
            }}>
              <Search style={{ width: '28px', height: '28px', color: '#9ca3af' }} />
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827',
              margin: '0 0 8px 0'
            }}>
              No courses found
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0
            }}>
              Try adjusting your search criteria or filters
            </p>
          </div>
        ) : viewMode === 'table' ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#374151',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      Course
                    </th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#374151',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      Institution
                    </th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#374151',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      Students
                    </th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#374151',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      Fee
                    </th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#374151',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      Status
                    </th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#374151',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '1px solid #e5e7eb',
                      width: '120px'
                    }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course, index) => {
                    const statusStyle = getStatusColor(course.status)
                    return (
                      <tr 
                        key={course.id}
                        style={{
                          borderBottom: index < filteredCourses.length - 1 ? '1px solid #f3f4f6' : 'none',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafbfc'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '12px',
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              <BookOpen style={{ width: '20px', height: '20px', color: 'white' }} />
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <p style={{
                                fontSize: '15px',
                                fontWeight: '600',
                                color: '#111827',
                                margin: '0 0 2px 0',
                                lineHeight: '1.2'
                              }}>
                                {course.name}
                              </p>
                              <p style={{
                                fontSize: '13px',
                                color: '#6b7280',
                                margin: 0,
                                lineHeight: '1.2'
                              }}>
                                {course.degree_type || 'N/A'} • {course.duration || 'N/A'}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '20px' }}>
                          <div>
                            <p style={{
                              fontSize: '14px',
                              fontWeight: '500',
                              color: '#111827',
                              margin: '0 0 2px 0'
                            }}>
                              {course.colleges?.name || 'Unknown'}
                            </p>
                            <p style={{
                              fontSize: '13px',
                              color: '#6b7280',
                              margin: 0
                            }}>
                              {course.ranking ? `Ranking #${course.ranking}` : 'Unranked'}
                            </p>
                          </div>
                        </td>
                        <td style={{ padding: '20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Users style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                            <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                              {(course.students_enrolled || 0).toLocaleString()}
                            </span>
                            <span style={{ fontSize: '13px', color: '#6b7280' }}>
                              / {(course.max_capacity || course.total_seats || 0).toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: '20px' }}>
                          <span style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#111827'
                          }}>
                            {course.fees ? `$${course.fees.toLocaleString()}` : 'N/A'}
                          </span>
                        </td>
                        <td style={{ padding: '20px' }}>
                          <span style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color,
                            border: `1px solid ${statusStyle.border}`,
                            textTransform: 'capitalize'
                          }}>
                            {course.status}
                          </span>
                        </td>
                        <td style={{ padding: '20px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                            <button
                              onClick={() => router.push(`/admin/courses/${course.id}`)}
                              style={{
                                padding: '6px 10px',
                                borderRadius: '6px',
                                border: '1px solid #e5e7eb',
                                backgroundColor: 'white',
                                color: '#3b82f6',
                                fontSize: '12px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#eff6ff'
                                e.currentTarget.style.borderColor = '#3b82f6'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'white'
                                e.currentTarget.style.borderColor = '#e5e7eb'
                              }}
                            >
                              <Eye style={{ width: '12px', height: '12px' }} />
                              View
                            </button>
                            <button
                              onClick={() => router.push(`/admin/courses/${course.id}/edit`)}
                              style={{
                                padding: '6px 10px',
                                borderRadius: '6px',
                                border: '1px solid #e5e7eb',
                                backgroundColor: 'white',
                                color: '#f59e0b',
                                fontSize: '12px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#fffbeb'
                                e.currentTarget.style.borderColor = '#f59e0b'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'white'
                                e.currentTarget.style.borderColor = '#e5e7eb'
                              }}
                            >
                              <Edit3 style={{ width: '12px', height: '12px' }} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(course.id, course.name)}
                              style={{
                                padding: '6px 10px',
                                borderRadius: '6px',
                                border: '1px solid #e5e7eb',
                                backgroundColor: 'white',
                                color: '#ef4444',
                                fontSize: '12px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#fef2f2'
                                e.currentTarget.style.borderColor = '#ef4444'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'white'
                                e.currentTarget.style.borderColor = '#e5e7eb'
                              }}
                            >
                              <Trash2 style={{ width: '12px', height: '12px' }} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '24px'
          }}>
            {filteredCourses.map((course) => {
              const statusStyle = getStatusColor(course.status)
              return (
                <div 
                  key={course.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <BookOpen style={{ width: '20px', height: '20px', color: 'white' }} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <h3 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#111827',
                            margin: '0 0 4px 0',
                            lineHeight: '1.2'
                          }}>
                            {course.name}
                          </h3>
                          <p style={{
                            fontSize: '13px',
                            color: '#6b7280',
                            margin: 0
                          }}>
                            {course.colleges?.name || 'Unknown'}
                          </p>
                        </div>
                      </div>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '16px',
                        fontSize: '11px',
                        fontWeight: '600',
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                        border: `1px solid ${statusStyle.border}`,
                        textTransform: 'capitalize',
                        flexShrink: 0
                      }}>
                        {course.status}
                      </span>
                    </div>

                    <p style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      margin: '0 0 16px 0',
                      lineHeight: '1.4'
                    }}>
                      {course.description || 'No description available'}
                    </p>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px',
                      marginBottom: '20px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Award style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                        <div>
                          <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Degree</p>
                          <p style={{ fontSize: '13px', fontWeight: '500', color: '#111827', margin: 0 }}>{course.degree_type || 'N/A'}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                        <div>
                          <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Duration</p>
                          <p style={{ fontSize: '13px', fontWeight: '500', color: '#111827', margin: 0 }}>{course.duration || 'N/A'}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Users style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                        <div>
                          <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Students</p>
                          <p style={{ fontSize: '13px', fontWeight: '500', color: '#111827', margin: 0 }}>{(course.students_enrolled || 0).toLocaleString()}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                        <div>
                          <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fees</p>
                          <p style={{ fontSize: '13px', fontWeight: '500', color: '#111827', margin: 0 }}>{course.fees ? `$${course.fees.toLocaleString()}` : 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '16px',
                      borderTop: '1px solid #f3f4f6'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => router.push(`/admin/courses/${course.id}`)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 14px',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            backgroundColor: 'white',
                            color: '#3b82f6',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#eff6ff'
                            e.currentTarget.style.borderColor = '#3b82f6'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white'
                            e.currentTarget.style.borderColor = '#e5e7eb'
                          }}
                        >
                          <Eye style={{ width: '14px', height: '14px' }} />
                          View
                        </button>
                        <button
                          onClick={() => router.push(`/admin/courses/${course.id}/edit`)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 14px',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            backgroundColor: 'white',
                            color: '#f59e0b',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#fffbeb'
                            e.currentTarget.style.borderColor = '#f59e0b'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white'
                            e.currentTarget.style.borderColor = '#e5e7eb'
                          }}
                        >
                          <Edit3 style={{ width: '14px', height: '14px' }} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(course.id, course.name)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 14px',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            backgroundColor: 'white',
                            color: '#ef4444',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#fef2f2'
                            e.currentTarget.style.borderColor = '#ef4444'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white'
                            e.currentTarget.style.borderColor = '#e5e7eb'
                          }}
                        >
                          <Trash2 style={{ width: '14px', height: '14px' }} />
                          Delete
                        </button>
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        {course.ranking ? `Ranking #${course.ranking}` : 'Unranked'}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
}