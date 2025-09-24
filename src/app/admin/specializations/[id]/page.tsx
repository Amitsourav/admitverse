'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Edit, 
  Target,
  BookOpen,
  Building,
  Users,
  TrendingUp,
  Award,
  Trash2,
  Info,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Settings
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Specialization {
  id: number
  course_id: number
  name: string
  code?: string
  about?: string
  description?: string
  requirements?: string
  career_prospects?: string
  syllabus?: any
  placement_rate?: number
  avg_package?: number
  top_recruiters?: any
  research_areas?: any
  lab_facilities?: any
  is_sample: boolean
  created_at: string
  updated_at?: string
  courses?: {
    name: string
    colleges?: {
      name: string
      location?: string
      country?: string
    }
  }
}

export default function SpecializationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [specialization, setSpecialization] = useState<Specialization | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSpecialization = async () => {
      try {
        const response = await fetch('/api/admin/specializations')
        const result = await response.json()
        
        if (result.success) {
          const foundSpec = result.data.find((s: Specialization) => s.id.toString() === params.id)
          if (foundSpec) {
            setSpecialization(foundSpec)
          } else {
            toast.error('Specialization not found')
          }
        }
      } catch (error) {
        console.error('Error fetching specialization:', error)
        toast.error('Failed to load specialization')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSpecialization()
  }, [params.id])

  const handleDelete = async () => {
    if (!specialization) return
    
    if (window.confirm(`Are you sure you want to delete "${specialization.name}"?`)) {
      try {
        const response = await fetch(`/api/admin/specializations?id=${specialization.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        })
        
        const result = await response.json()
        
        if (result.success) {
          toast.success('Specialization deleted successfully')
          router.push('/admin/specializations')
        } else {
          toast.error(result.error || 'Failed to delete specialization')
        }
      } catch (error) {
        console.error('Error deleting specialization:', error)
        toast.error('Failed to delete specialization')
      }
    }
  }

  if (isLoading) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        Loading specialization details...
      </div>
    )
  }

  if (!specialization) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <h1>Specialization not found</h1>
        <Link href="/admin/specializations">
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#5856eb'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#6366f1'
            e.currentTarget.style.transform = 'translateY(0)'
          }}>
            Back to Specializations
          </button>
        </Link>
      </div>
    )
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
          <Link href="/admin/specializations">
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
              Back to Specializations
            </button>
          </Link>
          <Link href={`/admin/specializations/${specialization.id}/edit`}>
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
              <Edit style={{ height: '16px', width: '16px' }} />
              Edit Specialization
            </button>
          </Link>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            padding: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px'
          }}>
            <Target style={{
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
              {specialization.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen style={{ height: '16px', width: '16px' }} />
                <span style={{ fontSize: '16px', opacity: 0.9 }}>{specialization.courses?.name}</span>
              </div>
              {specialization.placement_rate && specialization.placement_rate >= 80 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  backgroundColor: 'rgba(34, 197, 94, 0.9)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  <Award style={{ height: '12px', width: '12px' }} />
                  High Placement
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Specialization Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        
        {/* Left Column - Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Specialization Stats Overview */}
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
                  Specialization Information
                </h2>
              </div>
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                
                {/* Specialization Name */}
                <div style={{
                  padding: '20px',
                  backgroundColor: '#eff6ff',
                  borderRadius: '12px',
                  border: '1px solid #3b82f6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <Target style={{ height: '18px', width: '18px', color: '#2563eb' }} />
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#1e40af' }}>Specialization</span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#1e3a8a', margin: 0, fontWeight: '500' }}>
                    {specialization.name}
                  </p>
                </div>

                {/* Course */}
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '12px',
                  border: '1px solid #10b981'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <BookOpen style={{ height: '18px', width: '18px', color: '#059669' }} />
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#065f46' }}>Course</span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#064e3b', margin: 0, fontWeight: '500' }}>
                    {specialization.courses?.name}
                  </p>
                </div>

                {/* College */}
                <div style={{
                  padding: '20px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '12px',
                  border: '1px solid #f59e0b'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <Building style={{ height: '18px', width: '18px', color: '#d97706' }} />
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#92400e' }}>College</span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#78350f', margin: 0, fontWeight: '500' }}>
                    {specialization.courses?.colleges?.name}
                  </p>
                </div>

                {specialization.code && (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f3e8ff',
                    borderRadius: '12px',
                    border: '1px solid #9333ea'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Award style={{ height: '18px', width: '18px', color: '#7c3aed' }} />
                      <span style={{ fontSize: '16px', fontWeight: '600', color: '#6b21a8' }}>Code</span>
                    </div>
                    <p style={{ fontSize: '15px', color: '#581c87', margin: 0, fontWeight: '500' }}>
                      {specialization.code}
                    </p>
                  </div>
                )}
              </div>
              
              {specialization.about && (
                <div style={{ marginTop: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>
                    About
                  </h3>
                  <div 
                    style={{ 
                      lineHeight: 1.7, 
                      color: '#374151',
                      fontSize: '15px'
                    }}
                  >
                    {specialization.about}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Career & Placement Information */}
          {(specialization.career_prospects || specialization.placement_rate || specialization.avg_package) && (
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
                    <TrendingUp style={{ height: '20px', width: '20px' }} />
                  </div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Career & Placement
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                  
                  {specialization.placement_rate && (
                    <div style={{
                      padding: '20px',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '12px',
                      border: '1px solid #10b981',
                      textAlign: 'center'
                    }}>
                      <TrendingUp style={{ height: '32px', width: '32px', color: '#059669', margin: '0 auto 8px' }} />
                      <div style={{ fontSize: '24px', fontWeight: '800', color: '#047857', marginBottom: '4px' }}>{specialization.placement_rate}%</div>
                      <div style={{ fontSize: '13px', color: '#064e3b' }}>Placement Rate</div>
                    </div>
                  )}

                  {specialization.avg_package && (
                    <div style={{
                      padding: '20px',
                      backgroundColor: '#fef3c7',
                      borderRadius: '12px',
                      border: '1px solid #f59e0b',
                      textAlign: 'center'
                    }}>
                      <DollarSign style={{ height: '32px', width: '32px', color: '#d97706', margin: '0 auto 8px' }} />
                      <div style={{ fontSize: '24px', fontWeight: '800', color: '#92400e', marginBottom: '4px' }}>${specialization.avg_package.toLocaleString()}</div>
                      <div style={{ fontSize: '13px', color: '#78350f' }}>Average Package</div>
                    </div>
                  )}
                </div>

                {specialization.career_prospects && (
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                      Career Prospects
                    </h3>
                    <div 
                      style={{ 
                        lineHeight: 1.7, 
                        color: '#374151',
                        fontSize: '15px'
                      }}
                    >
                      {specialization.career_prospects}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
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
              <Link href={`/admin/specializations/${specialization.id}/edit`}>
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
                  Edit Specialization
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
                Delete Specialization
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
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#065f46' }}>Active Specialization</div>
                    <div style={{ fontSize: '13px', color: '#047857' }}>Currently available for enrollment</div>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              {specialization.placement_rate && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>Placement Rate</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>{specialization.placement_rate}%</span>
                </div>
              )}

              {specialization.avg_package && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>Avg Package</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>${specialization.avg_package.toLocaleString()}</span>
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
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#0c4a6e' }}>{new Date(specialization.created_at).toLocaleDateString()}</span>
                  </div>
                  {specialization.updated_at && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', color: '#075985' }}>Updated</span>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#0c4a6e' }}>{new Date(specialization.updated_at).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Info */}
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
              
              {/* Specialization ID */}
              <div style={{
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>Specialization ID</span>
                <code style={{ 
                  fontSize: '12px', 
                  backgroundColor: '#e5e7eb', 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  color: '#1f2937'
                }}>
                  {specialization.id}
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