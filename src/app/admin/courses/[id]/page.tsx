'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Edit, 
  BookOpen,
  Building,
  Users,
  TrendingUp,
  Calendar,
  Award,
  GraduationCap,
  Trash2,
  Info,
  Eye,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Hash,
  Settings
} from 'lucide-react'
import { toast } from 'react-hot-toast'

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

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch('/api/admin/courses')
        const result = await response.json()
        
        if (result.success) {
          const foundCourse = result.data.find((c: Course) => c.id.toString() === params.id)
          if (foundCourse) {
            setCourse(foundCourse)
          } else {
            toast.error('Course not found')
          }
        }
      } catch (error) {
        console.error('Error fetching course:', error)
        toast.error('Failed to load course')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourse()
  }, [params.id])

  const handleDelete = async () => {
    if (!course) return
    
    if (window.confirm(`Are you sure you want to delete "${course.name}"?`)) {
      try {
        const response = await fetch(`/api/admin/courses?id=${course.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        })
        
        const result = await response.json()
        
        if (result.success) {
          toast.success('Course deleted successfully')
          router.push('/admin/courses')
        } else {
          toast.error(result.error || 'Failed to delete course')
        }
      } catch (error) {
        console.error('Error deleting course:', error)
        toast.error('Failed to delete course')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-muted-foreground">Loading course details...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
            <h2 className="text-lg font-medium mb-2">Course not found</h2>
            <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
            <Link href="/admin/courses">
              <Button>Back to Courses</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusBadgeVariant = (status: string) => {
    switch ((status || '').toLowerCase()) {
      case 'active': return 'default'
      case 'inactive': return 'secondary'
      case 'draft': return 'outline'
      default: return 'secondary'
    }
  }

  return (
    <div style={{
      padding: '32px',
      maxWidth: '100%'
    }}>
      
      {/* Header with gradient background */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <Link href="/admin/courses">
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
            }}>
              <ArrowLeft style={{ height: '16px', width: '16px' }} />
              Back to Courses
            </button>
          </Link>
          <Link href={`/admin/courses/${course.id}/edit`}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              color: '#667eea',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <Edit className="w-4 h-4" />
              Edit Course
            </button>
          </Link>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            padding: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px'
          }}>
            <BookOpen style={{
              height: '28px',
              width: '28px',
              color: 'white'
            }} />
          </div>
          <div>
            <h1 style={{ 
              fontSize: '36px', 
              fontWeight: '800', 
              margin: '0 0 8px 0',
              letterSpacing: '-1px'
            }}>
              {course.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building style={{ height: '16px', width: '16px' }} />
                <span style={{ fontSize: '16px', opacity: 0.9 }}>{course.colleges?.name}</span>
              </div>
              {course.featured && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  backgroundColor: 'rgba(251, 191, 36, 0.9)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  <Award style={{ height: '12px', width: '12px' }} />
                  Featured
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        
        {/* Left Column - Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Course Stats Overview */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.1)',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(99, 102, 241, 0.15)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}>
            <div style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  padding: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px'
                }}>
                  <Info style={{ height: '20px', width: '20px' }} />
                </div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: 0
                }}>
                  Course Information
                </h2>
              </div>
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                
                {/* Course Name */}
                <div style={{
                  padding: '20px',
                  backgroundColor: '#eff6ff',
                  borderRadius: '12px',
                  border: '1px solid #3b82f6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <BookOpen style={{ height: '18px', width: '18px', color: '#2563eb' }} />
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#1e40af' }}>Course Name</span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#1e3a8a', margin: 0, fontWeight: '500' }}>
                    {course.name}
                  </p>
                </div>

                {/* College */}
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '12px',
                  border: '1px solid #10b981'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <Building style={{ height: '18px', width: '18px', color: '#059669' }} />
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#065f46' }}>College</span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#064e3b', margin: 0, fontWeight: '500' }}>
                    {course.colleges?.name}
                  </p>
                </div>

                {course.degree_type && (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '12px',
                    border: '1px solid #f59e0b'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <GraduationCap style={{ height: '18px', width: '18px', color: '#d97706' }} />
                      <span style={{ fontSize: '16px', fontWeight: '600', color: '#92400e' }}>Degree Type</span>
                    </div>
                    <p style={{ fontSize: '15px', color: '#78350f', margin: 0, fontWeight: '500' }}>
                      {course.degree_type}
                    </p>
                  </div>
                )}

                {course.duration && (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f3e8ff',
                    borderRadius: '12px',
                    border: '1px solid #9333ea'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Clock style={{ height: '18px', width: '18px', color: '#7c3aed' }} />
                      <span style={{ fontSize: '16px', fontWeight: '600', color: '#6b21a8' }}>Duration</span>
                    </div>
                    <p style={{ fontSize: '15px', color: '#581c87', margin: 0, fontWeight: '500' }}>
                      {course.duration}
                    </p>
                  </div>
                )}

                {course.course_code && (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#ecfdf5',
                    borderRadius: '12px',
                    border: '1px solid #10b981'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Hash style={{ height: '18px', width: '18px', color: '#059669' }} />
                      <span style={{ fontSize: '16px', fontWeight: '600', color: '#065f46' }}>Course Code</span>
                    </div>
                    <p style={{ fontSize: '15px', color: '#064e3b', margin: 0, fontWeight: '500' }}>
                      {course.course_code}
                    </p>
                  </div>
                )}

                {course.credits && (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fce7f3',
                    borderRadius: '12px',
                    border: '1px solid #ec4899'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Award style={{ height: '18px', width: '18px', color: '#be185d' }} />
                      <span style={{ fontSize: '16px', fontWeight: '600', color: '#9d174d' }}>Credits</span>
                    </div>
                    <p style={{ fontSize: '15px', color: '#831843', margin: 0, fontWeight: '500' }}>
                      {course.credits}
                    </p>
                  </div>
                )}
              </div>
              
              {course.description && (
                <div style={{ marginTop: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>
                    Description
                  </h3>
                  <div 
                    className="rich-text-content"
                    style={{ 
                      lineHeight: 1.7, 
                      color: '#374151',
                      fontSize: '15px'
                    }}
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Admission Information */}
          {(course.eligibility || course.admission_process) && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(34, 197, 94, 0.1)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(34, 197, 94, 0.15)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}>
              <div style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    padding: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px'
                  }}>
                    <GraduationCap style={{ height: '20px', width: '20px' }} />
                  </div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Admission Information
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px' }}>
                {course.eligibility && (
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                      Eligibility Criteria
                    </h3>
                    <div 
                      className="rich-text-content"
                      style={{ 
                        lineHeight: 1.7, 
                        color: '#374151',
                        fontSize: '15px'
                      }}
                      dangerouslySetInnerHTML={{ __html: course.eligibility }}
                    />
                  </div>
                )}
                {course.admission_process && (
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                      Admission Process
                    </h3>
                    <div 
                      className="rich-text-content"
                      style={{ 
                        lineHeight: 1.7, 
                        color: '#374151',
                        fontSize: '15px'
                      }}
                      dangerouslySetInnerHTML={{ __html: course.admission_process }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Course Statistics */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(168, 85, 247, 0.1)',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(168, 85, 247, 0.15)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}>
            <div style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
              color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  padding: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px'
                }}>
                  <TrendingUp style={{ height: '20px', width: '20px' }} />
                </div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: 0
                }}>
                  Course Statistics
                </h2>
              </div>
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                {course.total_seats && (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#eff6ff',
                    borderRadius: '12px',
                    border: '1px solid #3b82f6',
                    textAlign: 'center'
                  }}>
                    <Users style={{ height: '32px', width: '32px', color: '#2563eb', margin: '0 auto 8px' }} />
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#1e40af', marginBottom: '4px' }}>{course.total_seats}</div>
                    <div style={{ fontSize: '13px', color: '#1e3a8a' }}>Total Seats</div>
                  </div>
                )}
                {course.students_enrolled && (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '12px',
                    border: '1px solid #10b981',
                    textAlign: 'center'
                  }}>
                    <GraduationCap style={{ height: '32px', width: '32px', color: '#059669', margin: '0 auto 8px' }} />
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#047857', marginBottom: '4px' }}>{course.students_enrolled}</div>
                    <div style={{ fontSize: '13px', color: '#064e3b' }}>Students Enrolled</div>
                  </div>
                )}
                {course.acceptance_rate && (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f3e8ff',
                    borderRadius: '12px',
                    border: '1px solid #9333ea',
                    textAlign: 'center'
                  }}>
                    <Award style={{ height: '32px', width: '32px', color: '#7c3aed', margin: '0 auto 8px' }} />
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#6b21a8', marginBottom: '4px' }}>{course.acceptance_rate}%</div>
                    <div style={{ fontSize: '13px', color: '#581c87' }}>Acceptance Rate</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '32px' }}>
          
          {/* Quick Actions Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.1)',
            transition: 'all 0.3s'
          }}>
            <div style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  padding: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px'
                }}>
                  <Settings style={{ height: '20px', width: '20px' }} />
                </div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: 0
                }}>
                  Quick Actions
                </h2>
              </div>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Edit Button */}
              <Link href={`/admin/courses/${course.id}/edit`}>
                <button style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
                }}>
                  <Edit style={{ height: '18px', width: '18px' }} />
                  Edit Course
                </button>
              </Link>

              {/* Delete Button */}
              <button onClick={handleDelete} style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                backgroundColor: '#fee2e2',
                border: '2px solid #fca5a5',
                borderRadius: '10px',
                color: '#dc2626',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#fecaca'
                e.currentTarget.style.borderColor = '#f87171'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#fee2e2'
                e.currentTarget.style.borderColor = '#fca5a5'
                e.currentTarget.style.transform = 'translateY(0)'
              }}>
                <Trash2 style={{ height: '18px', width: '18px' }} />
                Delete Course
              </button>
            </div>
          </div>

          {/* Quick Info Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(147, 51, 234, 0.1)'
          }}>
            <div style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
              color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  padding: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px'
                }}>
                  <Eye style={{ height: '20px', width: '20px' }} />
                </div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: 0
                }}>
                  Quick Info
                </h2>
              </div>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Status Badge */}
              <div style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                borderRadius: '12px',
                border: '1px solid #10b981'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle style={{ height: '20px', width: '20px', color: '#059669' }} />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#065f46' }}>Active Course</div>
                    <div style={{ fontSize: '13px', color: '#047857' }}>Currently accepting applications</div>
                  </div>
                </div>
              </div>

              {/* Featured Badge */}
              {course.featured ? (
                <div style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '12px',
                  border: '1px solid #f59e0b'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Award style={{ height: '20px', width: '20px', color: '#d97706' }} />
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: '#92400e' }}>Featured Course</div>
                      <div style={{ fontSize: '13px', color: '#b45309' }}>Highlighted on homepage</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Award style={{ height: '20px', width: '20px', color: '#9ca3af' }} />
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: '#6b7280' }}>Not Featured</div>
                      <div style={{ fontSize: '13px', color: '#9ca3af' }}>Not shown on homepage</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Course Details */}
              {course.fees && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>Annual Fees</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>${course.fees.toLocaleString()}</span>
                </div>
              )}

              {course.category && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>Category</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>{course.category}</span>
                </div>
              )}

              {course.ranking && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>Course Ranking</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>#{course.ranking}</span>
                </div>
              )}

              {/* Timestamps */}
              <div style={{
                padding: '16px',
                backgroundColor: '#f0f9ff',
                borderRadius: '12px',
                border: '1px solid #0ea5e9'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Clock style={{ height: '16px', width: '16px', color: '#0284c7' }} />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#0c4a6e' }}>Timeline</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: '#075985' }}>Created</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#0c4a6e' }}>{new Date(course.created_at).toLocaleDateString()}</span>
                  </div>
                  {course.updated_at && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', color: '#075985' }}>Updated</span>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#0c4a6e' }}>{new Date(course.updated_at).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Course ID & Technical Info */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(107, 114, 128, 0.1)'
          }}>
            <div style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
              color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  padding: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px'
                }}>
                  <Info style={{ height: '20px', width: '20px' }} />
                </div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: 0
                }}>
                  Technical Info
                </h2>
              </div>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Course ID */}
              <div style={{
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>Course ID</span>
                <code style={{ 
                  fontSize: '12px', 
                  backgroundColor: '#e5e7eb', 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  color: '#1f2937'
                }}>
                  {course.id}
                </code>
              </div>

              {/* Database Status */}
              <div style={{
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>Database</span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  color: '#059669',
                  fontWeight: '600'
                }}>
                  <CheckCircle style={{ height: '12px', width: '12px' }} />
                  Connected
                </div>
              </div>

              {/* Last Sync */}
              <div style={{
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>Last Sync</span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm font-medium text-muted-foreground mb-1">
      {children}
    </div>
  )
}