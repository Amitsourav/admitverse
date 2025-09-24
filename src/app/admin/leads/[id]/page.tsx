'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Edit, 
  Users,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Building,
  BookOpen,
  Target,
  Trash2,
  Info,
  Eye,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  Settings
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Lead {
  id: number
  name: string
  email: string
  phone?: string
  message?: string
  status: string
  source?: string
  specializationId?: number
  userId?: number
  isSample: boolean
  createdAt: string
  updatedAt?: string
  specialization?: {
    id: number
    name: string
    code?: string
    course: {
      id: number
      name: string
      college: {
        id: number
        name: string
        location?: string
      }
    }
  }
  user?: {
    id: number
    username: string
    email: string
    fullName?: string
  }
}

const leadStatuses = [
  { value: 'new', label: 'New', color: '#3b82f6' },
  { value: 'contacted', label: 'Contacted', color: '#f59e0b' },
  { value: 'qualified', label: 'Qualified', color: '#10b981' },
  { value: 'converted', label: 'Converted', color: '#8b5cf6' },
  { value: 'lost', label: 'Lost', color: '#ef4444' }
]

export default function LeadDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [lead, setLead] = useState<Lead | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await fetch('/api/admin/leads')
        const result = await response.json()
        
        if (result.success) {
          const foundLead = result.data.find((l: Lead) => l.id.toString() === params.id)
          if (foundLead) {
            setLead(foundLead)
          } else {
            toast.error('Lead not found')
          }
        }
      } catch (error) {
        console.error('Error fetching lead:', error)
        toast.error('Failed to load lead')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLead()
  }, [params.id])

  const handleDelete = async () => {
    if (!lead) return
    
    if (window.confirm(`Are you sure you want to delete lead from "${lead.name}"?`)) {
      try {
        const response = await fetch(`/api/admin/leads?id=${lead.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        })
        
        const result = await response.json()
        
        if (result.success) {
          toast.success('Lead deleted successfully')
          router.push('/admin/leads')
        } else {
          toast.error(result.error || 'Failed to delete lead')
        }
      } catch (error) {
        console.error('Error deleting lead:', error)
        toast.error('Failed to delete lead')
      }
    }
  }

  const getStatusConfig = (status: string) => {
    return leadStatuses.find(s => s.value === status) || leadStatuses[0]
  }

  if (isLoading) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        Loading lead details...
      </div>
    )
  }

  if (!lead) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <h1>Lead not found</h1>
        <Link href="/admin/leads">
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
            Back to Leads
          </button>
        </Link>
      </div>
    )
  }

  const statusConfig = getStatusConfig(lead.status)

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
          <Link href="/admin/leads">
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
              Back to Leads
            </button>
          </Link>
          <Link href={`/admin/leads/${lead.id}/edit`}>
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
              Edit Lead
            </button>
          </Link>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            padding: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px'
          }}>
            <Users style={{
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
              {lead.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail style={{ height: '16px', width: '16px' }} />
                <span style={{ fontSize: '16px', opacity: 0.9 }}>{lead.email}</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                backgroundColor: statusConfig.color,
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                <CheckCircle style={{ height: '12px', width: '12px' }} />
                {statusConfig.label}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        
        {/* Left Column - Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Contact Information */}
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
                  <User style={{ height: '20px', width: '20px' }} />
                </div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: 0
                }}>
                  Contact Information
                </h2>
              </div>
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                
                {/* Name */}
                <div style={{
                  padding: '20px',
                  backgroundColor: '#eff6ff',
                  borderRadius: '12px',
                  border: '1px solid #3b82f6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <User style={{ height: '18px', width: '18px', color: '#2563eb' }} />
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#1e40af' }}>Full Name</span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#1e3a8a', margin: 0, fontWeight: '500' }}>
                    {lead.name}
                  </p>
                </div>

                {/* Email */}
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '12px',
                  border: '1px solid #10b981'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <Mail style={{ height: '18px', width: '18px', color: '#059669' }} />
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#065f46' }}>Email Address</span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#064e3b', margin: 0, fontWeight: '500' }}>
                    {lead.email}
                  </p>
                </div>

                {/* Phone */}
                {lead.phone && (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '12px',
                    border: '1px solid #f59e0b'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Phone style={{ height: '18px', width: '18px', color: '#d97706' }} />
                      <span style={{ fontSize: '16px', fontWeight: '600', color: '#92400e' }}>Phone Number</span>
                    </div>
                    <p style={{ fontSize: '15px', color: '#78350f', margin: 0, fontWeight: '500' }}>
                      {lead.phone}
                    </p>
                  </div>
                )}

                {/* Source */}
                {lead.source && (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f3e8ff',
                    borderRadius: '12px',
                    border: '1px solid #9333ea'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Info style={{ height: '18px', width: '18px', color: '#7c3aed' }} />
                      <span style={{ fontSize: '16px', fontWeight: '600', color: '#6b21a8' }}>Source</span>
                    </div>
                    <p style={{ fontSize: '15px', color: '#581c87', margin: 0, fontWeight: '500' }}>
                      {lead.source}
                    </p>
                  </div>
                )}
              </div>
              
              {lead.message && (
                <div style={{ marginTop: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>
                    Message
                  </h3>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    lineHeight: 1.7, 
                    color: '#374151',
                    fontSize: '15px'
                  }}>
                    {lead.message}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Specialization Information */}
          {lead.specialization && (
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
                    <Target style={{ height: '20px', width: '20px' }} />
                  </div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Interest & Specialization
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '12px',
                    border: '1px solid #10b981'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Target style={{ height: '18px', width: '18px', color: '#059669' }} />
                      <span style={{ fontSize: '16px', fontWeight: '600', color: '#065f46' }}>Specialization</span>
                    </div>
                    <p style={{ fontSize: '15px', color: '#064e3b', margin: 0, fontWeight: '500' }}>
                      {lead.specialization.name}
                    </p>
                  </div>

                  <div style={{
                    padding: '20px',
                    backgroundColor: '#eff6ff',
                    borderRadius: '12px',
                    border: '1px solid #3b82f6'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <BookOpen style={{ height: '18px', width: '18px', color: '#2563eb' }} />
                      <span style={{ fontSize: '16px', fontWeight: '600', color: '#1e40af' }}>Course</span>
                    </div>
                    <p style={{ fontSize: '15px', color: '#1e3a8a', margin: 0, fontWeight: '500' }}>
                      {lead.specialization.course.name}
                    </p>
                  </div>

                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '12px',
                    border: '1px solid #f59e0b',
                    gridColumn: 'span 2'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Building style={{ height: '18px', width: '18px', color: '#d97706' }} />
                      <span style={{ fontSize: '16px', fontWeight: '600', color: '#92400e' }}>College</span>
                    </div>
                    <p style={{ fontSize: '15px', color: '#78350f', margin: 0, fontWeight: '500' }}>
                      {lead.specialization.course.college.name}
                      {lead.specialization.course.college.location && (
                        <span style={{ color: '#a16207', fontSize: '14px' }}>
                          {' • '}{lead.specialization.course.college.location}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
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
              <Link href={`/admin/leads/${lead.id}/edit`}>
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
                  Edit Lead
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
                Delete Lead
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
                  <Eye style={{ height: '20px', width: '20px' }} />
                </div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: 0
                }}>
                  Lead Status
                </h2>
              </div>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Status Badge */}
              <div style={{
                padding: '16px',
                backgroundColor: statusConfig.color + '20',
                borderRadius: '12px',
                border: `1px solid ${statusConfig.color}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle style={{ height: '20px', width: '20px', color: statusConfig.color }} />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: statusConfig.color }}>
                      Status: {statusConfig.label}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                      Current lead status in pipeline
                    </div>
                  </div>
                </div>
              </div>

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
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#0c4a6e' }}>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {lead.updatedAt && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', color: '#075985' }}>Updated</span>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#0c4a6e' }}>
                        {new Date(lead.updatedAt).toLocaleDateString()}
                      </span>
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
              
              {/* Lead ID */}
              <div style={{
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>Lead ID</span>
                <code style={{ 
                  fontSize: '12px', 
                  backgroundColor: '#e5e7eb', 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  color: '#1f2937'
                }}>
                  {lead.id}
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