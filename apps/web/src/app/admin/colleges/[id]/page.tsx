'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  ArrowLeft, 
  Edit, 
  Star,
  MapPin,
  Globe,
  Building,
  Users,
  TrendingUp,
  Calendar,
  Award,
  GraduationCap,
  ExternalLink,
  Trash2,
  Info,
  Eye,
  Settings,
  BarChart3,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  Share2
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface College {
  id: string
  name: string
  location: string
  country: string
  website: string | null
  ranking: number | null
  acceptance_rate: number | null
  description: string | null
  featured: boolean
  created_at: string
  updated_at: string
}

export default function CollegeViewPage() {
  const params = useParams()
  const [college, setCollege] = useState<College | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await fetch('/api/admin/colleges')
        const result = await response.json()
        
        if (result.success) {
          const foundCollege = result.data.find((c: any) => c.id.toString() === params.id)
          if (foundCollege) {
            setCollege(foundCollege)
          } else {
            toast.error('College not found')
          }
        }
      } catch (error) {
        console.error('Error fetching college:', error)
        toast.error('Failed to load college')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCollege()
  }, [params.id])

  if (isLoading) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        Loading college details...
      </div>
    )
  }

  if (!college) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <h1>College not found</h1>
        <Link href="/admin/colleges">
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
          }}>
            Back to Colleges
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
          <Link href="/admin/colleges">
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
              Back to Colleges
            </button>
          </Link>
          <Link href={`/admin/colleges/${college.id}/edit`}>
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
              Edit College
            </button>
          </Link>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            padding: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px'
          }}>
            <GraduationCap style={{
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
              {college.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin style={{ height: '16px', width: '16px' }} />
                <span style={{ fontSize: '16px', opacity: 0.9 }}>{college.location}</span>
              </div>
              {college.featured && (
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
                  <Star style={{ height: '12px', width: '12px' }} />
                  Featured
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* College Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        
        {/* Left Column - Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* College Stats Overview */}
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
                  <BarChart3 style={{ height: '20px', width: '20px' }} />
                </div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: 0
                }}>
                  College Overview
                </h2>
              </div>
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                
                {/* Location Info */}
                <div style={{
                  padding: '20px',
                  backgroundColor: '#eff6ff',
                  borderRadius: '12px',
                  border: '1px solid #3b82f6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <MapPin style={{ height: '18px', width: '18px', color: '#2563eb' }} />
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#1e40af' }}>Location</span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#1e3a8a', margin: 0, fontWeight: '500' }}>
                    {college.location}
                  </p>
                </div>

                {/* Country Info */}
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '12px',
                  border: '1px solid #10b981'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <Globe style={{ height: '18px', width: '18px', color: '#059669' }} />
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#065f46' }}>Country</span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#064e3b', margin: 0, fontWeight: '500' }}>
                    {college.country}
                  </p>
                </div>

                {/* Ranking */}
                {college.ranking && (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '12px',
                    border: '1px solid #f59e0b'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Award style={{ height: '18px', width: '18px', color: '#d97706' }} />
                      <span style={{ fontSize: '16px', fontWeight: '600', color: '#92400e' }}>Global Ranking</span>
                    </div>
                    <p style={{ fontSize: '20px', color: '#78350f', margin: 0, fontWeight: '700' }}>
                      #{college.ranking}
                    </p>
                  </div>
                )}

                {/* Acceptance Rate */}
                {college.acceptance_rate && (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f3e8ff',
                    borderRadius: '12px',
                    border: '1px solid #9333ea'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <TrendingUp style={{ height: '18px', width: '18px', color: '#7c3aed' }} />
                      <span style={{ fontSize: '16px', fontWeight: '600', color: '#6b21a8' }}>Acceptance Rate</span>
                    </div>
                    <p style={{ fontSize: '20px', color: '#581c87', margin: 0, fontWeight: '700' }}>
                      {college.acceptance_rate}%
                    </p>
                  </div>
                )}

                {/* Website Link */}
                {college.website && (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#ecfdf5',
                    borderRadius: '12px',
                    border: '1px solid #10b981',
                    gridColumn: college.ranking || college.acceptance_rate ? 'auto' : '1 / -1'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Globe style={{ height: '18px', width: '18px', color: '#059669' }} />
                      <span style={{ fontSize: '16px', fontWeight: '600', color: '#065f46' }}>Official Website</span>
                    </div>
                    <a 
                      href={college.website.startsWith('http') ? college.website : `https://${college.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        fontSize: '15px',
                        color: '#047857', 
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontWeight: '500'
                      }}
                    >
                      {college.website}
                      <ExternalLink style={{ height: '14px', width: '14px' }} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {college.description && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.1)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(239, 68, 68, 0.15)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}>
              <div style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    padding: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px'
                  }}>
                    <FileText style={{ height: '20px', width: '20px' }} />
                  </div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    About {college.name}
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px' }}>
                <div 
                  className="rich-text-content"
                  style={{ 
                    lineHeight: 1.7, 
                    color: '#374151',
                    fontSize: '15px'
                  }}
                  dangerouslySetInnerHTML={{ __html: college.description }}
                />
              </div>
            </div>
          )}

          {/* Admissions & Programs Card */}
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
                  Admissions & Programs
                </h2>
              </div>
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                
                {/* Application Deadline */}
                <div style={{
                  padding: '20px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '12px',
                  border: '1px solid #f59e0b'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <Calendar style={{ height: '18px', width: '18px', color: '#d97706' }} />
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#92400e' }}>Application Deadline</span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#78350f', margin: 0, fontWeight: '600' }}>
                    January 15, 2025
                  </p>
                </div>

                {/* Total Students */}
                <div style={{
                  padding: '20px',
                  backgroundColor: '#e0e7ff',
                  borderRadius: '12px',
                  border: '1px solid #6366f1'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <Users style={{ height: '18px', width: '18px', color: '#4f46e5' }} />
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#3730a3' }}>Total Students</span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#312e81', margin: 0, fontWeight: '600' }}>
                    23,016
                  </p>
                </div>
              </div>

              {/* Popular Programs */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>
                  Popular Programs
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['Computer Science', 'Business Administration', 'Engineering', 'Medicine', 'Law'].map((program, index) => (
                    <div key={index} style={{
                      padding: '16px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        padding: '8px',
                        backgroundColor: '#eff6ff',
                        borderRadius: '8px'
                      }}>
                        <Building style={{ height: '16px', width: '16px', color: '#3b82f6' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>
                          {program}
                        </div>
                        <div style={{ fontSize: '13px', color: '#64748b' }}>
                          {Math.floor(Math.random() * 500) + 100} students enrolled
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campus Life */}
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>
                  Campus Life
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '10px',
                    border: '1px solid #22c55e',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#15803d', marginBottom: '4px' }}>
                      350+
                    </div>
                    <div style={{ fontSize: '13px', color: '#166534' }}>
                      Student Organizations
                    </div>
                  </div>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '10px',
                    border: '1px solid #f59e0b',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#d97706', marginBottom: '4px' }}>
                      95%
                    </div>
                    <div style={{ fontSize: '13px', color: '#92400e' }}>
                      Employment Rate
                    </div>
                  </div>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#e0e7ff',
                    borderRadius: '10px',
                    border: '1px solid #6366f1',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#4f46e5', marginBottom: '4px' }}>
                      45
                    </div>
                    <div style={{ fontSize: '13px', color: '#3730a3' }}>
                      Research Centers
                    </div>
                  </div>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#fce7f3',
                    borderRadius: '10px',
                    border: '1px solid #ec4899',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#be185d', marginBottom: '4px' }}>
                      18:1
                    </div>
                    <div style={{ fontSize: '13px', color: '#9d174d' }}>
                      Student-Faculty Ratio
                    </div>
                  </div>
                </div>
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
              <Link href={`/admin/colleges/${college.id}/edit`}>
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
                  Edit College
                </button>
              </Link>

              {/* Share Button */}
              <button style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                backgroundColor: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                color: '#374151',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb'
                e.currentTarget.style.borderColor = '#9ca3af'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.transform = 'translateY(0)'
              }}>
                <Share2 style={{ height: '18px', width: '18px' }} />
                Share College
              </button>
            </div>
          </div>

          {/* Status & Info Card */}
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
                  <Info style={{ height: '20px', width: '20px' }} />
                </div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: 0
                }}>
                  Status & Info
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
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#065f46' }}>Active College</div>
                    <div style={{ fontSize: '13px', color: '#047857' }}>Currently accepting applications</div>
                  </div>
                </div>
              </div>

              {/* Featured Badge */}
              {college.featured ? (
                <div style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '12px',
                  border: '1px solid #f59e0b'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Star style={{ height: '20px', width: '20px', color: '#d97706' }} />
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: '#92400e' }}>Featured College</div>
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
                    <Star style={{ height: '20px', width: '20px', color: '#9ca3af' }} />
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: '#6b7280' }}>Not Featured</div>
                      <div style={{ fontSize: '13px', color: '#9ca3af' }}>Not shown on homepage</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Performance Metrics */}
              <div style={{
                padding: '16px',
                backgroundColor: '#f0f9ff',
                borderRadius: '12px',
                border: '1px solid #0ea5e9'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <BarChart3 style={{ height: '16px', width: '16px', color: '#0284c7' }} />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#0c4a6e' }}>Performance</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: '#075985' }}>Page Views</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#0c4a6e' }}>1,247</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: '#075985' }}>Applications</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#0c4a6e' }}>156</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.1)'
          }}>
            <div style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  padding: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px'
                }}>
                  <Clock style={{ height: '20px', width: '20px' }} />
                </div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: 0
                }}>
                  Timeline
                </h2>
              </div>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Created */}
              <div style={{
                padding: '16px',
                backgroundColor: '#ecfdf5',
                borderRadius: '12px',
                border: '1px solid #10b981'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Calendar style={{ height: '16px', width: '16px', color: '#059669' }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#065f46' }}>College Created</div>
                    <div style={{ fontSize: '13px', color: '#047857', marginTop: '4px' }}>
                      {new Date(college.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Last Updated */}
              <div style={{
                padding: '16px',
                backgroundColor: '#fef3c7',
                borderRadius: '12px',
                border: '1px solid #f59e0b'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock style={{ height: '16px', width: '16px', color: '#d97706' }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#92400e' }}>Last Updated</div>
                    <div style={{ fontSize: '13px', color: '#b45309', marginTop: '4px' }}>
                      {new Date(college.updated_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Indicator */}
              <div style={{
                padding: '16px',
                backgroundColor: '#eff6ff',
                borderRadius: '12px',
                border: '1px solid #3b82f6'
              }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <AlertCircle style={{ height: '16px', width: '16px', color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '13px', color: '#1e40af', fontWeight: '500' }}>
                      Last activity: {Math.floor((Date.now() - new Date(college.updated_at).getTime()) / (1000 * 60 * 60 * 24))} days ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* College ID & Technical Info */}
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
                  <Eye style={{ height: '20px', width: '20px' }} />
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
              
              {/* College ID */}
              <div style={{
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>College ID</span>
                <code style={{ 
                  fontSize: '12px', 
                  backgroundColor: '#e5e7eb', 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  color: '#1f2937'
                }}>
                  {college.id}
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