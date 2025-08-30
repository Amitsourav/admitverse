'use client'

import { useState } from 'react'
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
  Calendar
} from 'lucide-react'

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedDegree, setSelectedDegree] = useState('all')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')

  // Enhanced mock data for courses
  const courses = [
    {
      id: '1',
      name: 'Computer Science',
      college: 'Massachusetts Institute of Technology',
      collegeAbbr: 'MIT',
      duration: '4 years',
      degree: 'Bachelor of Science',
      category: 'Technology',
      students: 1200,
      capacity: 1500,
      tuitionFee: '$58,240',
      ranking: 1,
      acceptance: '7%',
      status: 'Active',
      description: 'Comprehensive computer science program covering algorithms, software engineering, AI, and machine learning.',
      startDate: 'September 2024',
      applicationDeadline: 'January 15, 2024'
    },
    {
      id: '2',
      name: 'Business Administration',
      college: 'Harvard Business School',
      collegeAbbr: 'HBS',
      duration: '2 years',
      degree: 'Master of Business Administration',
      category: 'Business',
      students: 800,
      capacity: 900,
      tuitionFee: '$73,440',
      ranking: 2,
      acceptance: '9%',
      status: 'Active',
      description: 'World-renowned MBA program developing global leaders in business and management.',
      startDate: 'September 2024',
      applicationDeadline: 'April 15, 2024'
    },
    {
      id: '3',
      name: 'Medicine',
      college: 'University of Oxford',
      collegeAbbr: 'Oxford',
      duration: '6 years',
      degree: 'Bachelor of Medicine, Bachelor of Surgery',
      category: 'Medicine',
      students: 500,
      capacity: 550,
      tuitionFee: '£37,510',
      ranking: 3,
      acceptance: '5%',
      status: 'Active',
      description: 'Rigorous medical program combining theoretical knowledge with practical clinical experience.',
      startDate: 'October 2024',
      applicationDeadline: 'October 15, 2023'
    },
    {
      id: '4',
      name: 'Engineering',
      college: 'Stanford University',
      collegeAbbr: 'Stanford',
      duration: '4 years',
      degree: 'Bachelor of Engineering',
      category: 'Technology',
      students: 1500,
      capacity: 1800,
      tuitionFee: '$61,731',
      ranking: 2,
      acceptance: '4%',
      status: 'Active',
      description: 'Innovative engineering program focusing on cutting-edge technology and sustainable solutions.',
      startDate: 'September 2024',
      applicationDeadline: 'January 2, 2024'
    },
    {
      id: '5',
      name: 'Law',
      college: 'Yale Law School',
      collegeAbbr: 'Yale',
      duration: '3 years',
      degree: 'Juris Doctor',
      category: 'Law',
      students: 600,
      capacity: 650,
      tuitionFee: '$69,916',
      ranking: 1,
      acceptance: '6%',
      status: 'Active',
      description: 'Premier law program training future legal leaders and constitutional scholars.',
      startDate: 'August 2024',
      applicationDeadline: 'February 28, 2024'
    },
    {
      id: '6',
      name: 'Psychology',
      college: 'University of California, Berkeley',
      collegeAbbr: 'UC Berkeley',
      duration: '4 years',
      degree: 'Bachelor of Arts',
      category: 'Social Sciences',
      students: 950,
      capacity: 1000,
      tuitionFee: '$45,196',
      ranking: 4,
      acceptance: '17%',
      status: 'Draft',
      description: 'Comprehensive psychology program exploring human behavior, cognition, and mental processes.',
      startDate: 'August 2024',
      applicationDeadline: 'November 30, 2023'
    },
    {
      id: '7',
      name: 'Fine Arts',
      college: 'Rhode Island School of Design',
      collegeAbbr: 'RISD',
      duration: '4 years',
      degree: 'Bachelor of Fine Arts',
      category: 'Arts',
      students: 350,
      capacity: 400,
      tuitionFee: '$56,435',
      ranking: 1,
      acceptance: '19%',
      status: 'Inactive',
      description: 'Leading fine arts program fostering creative expression across multiple artistic disciplines.',
      startDate: 'September 2024',
      applicationDeadline: 'February 1, 2024'
    }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || course.status.toLowerCase() === selectedStatus.toLowerCase()
    const matchesDegree = selectedDegree === 'all' || course.degree.toLowerCase().includes(selectedDegree.toLowerCase())
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
            onClick={() => alert('Add New Course functionality coming soon!')}
          >
            <Plus style={{ width: '18px', height: '18px' }} />
            Add New Course
          </button>
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
              value: courses.reduce((sum, c) => sum + c.students, 0).toLocaleString(), 
              subtitle: 'Enrolled across all courses',
              icon: Users,
              color: '#8b5cf6',
              bgColor: '#faf5ff'
            },
            { 
              title: 'Institutions', 
              value: new Set(courses.map(c => c.college)).size.toString(), 
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
        {filteredCourses.length === 0 ? (
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
                                {course.degree} • {course.duration}
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
                              {course.collegeAbbr}
                            </p>
                            <p style={{
                              fontSize: '13px',
                              color: '#6b7280',
                              margin: 0
                            }}>
                              Ranking #{course.ranking}
                            </p>
                          </div>
                        </td>
                        <td style={{ padding: '20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Users style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                            <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                              {course.students.toLocaleString()}
                            </span>
                            <span style={{ fontSize: '13px', color: '#6b7280' }}>
                              / {course.capacity.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: '20px' }}>
                          <span style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#111827'
                          }}>
                            {course.tuitionFee}
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
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <button
                              style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb',
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f9fafb'
                                e.currentTarget.style.borderColor = '#6b7280'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'white'
                                e.currentTarget.style.borderColor = '#e5e7eb'
                              }}
                            >
                              <MoreHorizontal style={{ width: '16px', height: '16px', color: '#6b7280' }} />
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
                            {course.collegeAbbr}
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
                      {course.description}
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
                          <p style={{ fontSize: '13px', fontWeight: '500', color: '#111827', margin: 0 }}>{course.degree}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                        <div>
                          <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Duration</p>
                          <p style={{ fontSize: '13px', fontWeight: '500', color: '#111827', margin: 0 }}>{course.duration}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Users style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                        <div>
                          <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Students</p>
                          <p style={{ fontSize: '13px', fontWeight: '500', color: '#111827', margin: 0 }}>{course.students.toLocaleString()}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                        <div>
                          <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tuition</p>
                          <p style={{ fontSize: '13px', fontWeight: '500', color: '#111827', margin: 0 }}>{course.tuitionFee}</p>
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 14px',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            backgroundColor: 'white',
                            color: '#374151',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f9fafb'
                            e.currentTarget.style.borderColor = '#d1d5db'
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
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 14px',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            backgroundColor: 'white',
                            color: '#374151',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f9fafb'
                            e.currentTarget.style.borderColor = '#d1d5db'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white'
                            e.currentTarget.style.borderColor = '#e5e7eb'
                          }}
                        >
                          <Edit3 style={{ width: '14px', height: '14px' }} />
                          Edit
                        </button>
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        Ranking #{course.ranking}
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