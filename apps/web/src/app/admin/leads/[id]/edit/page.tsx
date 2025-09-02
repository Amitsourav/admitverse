'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, Users, Edit2, Target, BookOpen, Building, Mail, Phone, MessageSquare, Info, CheckCircle, AlertCircle, User, Clock } from 'lucide-react'
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
    course: {
      id: number
      name: string
      college: {
        id: number
        name: string
      }
    }
  }
}

interface Specialization {
  id: number
  name: string
  course: {
    id: number
    name: string
    college: {
      id: number
      name: string
    }
  }
}

const leadStatuses = [
  { value: 'new', label: 'New', color: '#3b82f6' },
  { value: 'contacted', label: 'Contacted', color: '#f59e0b' },
  { value: 'qualified', label: 'Qualified', color: '#10b981' },
  { value: 'converted', label: 'Converted', color: '#8b5cf6' },
  { value: 'lost', label: 'Lost', color: '#ef4444' }
]

const leadSources = ['Website', 'Social Media', 'Email Campaign', 'Referral', 'Direct', 'Advertisement', 'Event', 'Other']

export default function EditLeadPage() {
  const params = useParams()
  const router = useRouter()
  const [lead, setLead] = useState<Lead | null>(null)
  const [specializations, setSpecializations] = useState<Specialization[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    status: 'new',
    source: '',
    specializationId: ''
  })

  useEffect(() => {
    Promise.all([
      fetchLead(),
      fetchSpecializations()
    ])
  }, [params.id])

  const fetchLead = async () => {
    try {
      const response = await fetch('/api/admin/leads')
      const result = await response.json()
      
      if (result.success) {
        const foundLead = result.data.find((l: Lead) => l.id.toString() === params.id)
        if (foundLead) {
          setLead(foundLead)
          setFormData({
            name: foundLead.name || '',
            email: foundLead.email || '',
            phone: foundLead.phone || '',
            message: foundLead.message || '',
            status: foundLead.status || 'new',
            source: foundLead.source || '',
            specializationId: foundLead.specializationId?.toString() || ''
          })
        } else {
          toast.error('Lead not found')
          router.push('/admin/leads')
        }
      }
    } catch (error) {
      console.error('Error fetching lead:', error)
      toast.error('Failed to load lead')
    }
  }

  const fetchSpecializations = async () => {
    try {
      const response = await fetch('/api/admin/specializations')
      const result = await response.json()
      
      if (result.success) {
        setSpecializations(result.data)
      }
    } catch (error) {
      console.error('Error fetching specializations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🔄 Lead form submitted with data:', formData)
    
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields')
      return
    }

    setSaving(true)
    
    try {
      const updateData = {
        id: lead!.id,
        ...formData,
        specializationId: formData.specializationId ? parseInt(formData.specializationId) : null
      }

      const response = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })

      const result = await response.json()
      console.log('📡 Lead API Response:', result)

      if (result.success) {
        toast.success('Lead updated successfully!')
        router.push(`/admin/leads/${lead!.id}`)
      } else {
        console.error('❌ Lead update failed:', result)
        toast.error(result.error || 'Failed to update lead')
      }
    } catch (error) {
      console.error('Error updating lead:', error)
      toast.error('Failed to update lead')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
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
          <Link href={`/admin/leads/${lead.id}`}>
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
              Back to Lead
            </button>
          </Link>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            padding: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px'
          }}>
            <Edit2 style={{
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
              Edit Lead
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users style={{ height: '16px', width: '16px' }} />
              <span style={{ fontSize: '16px', opacity: 0.9 }}>{lead.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          
          {/* Left Column - Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Basic Information Card */}
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
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Name */}
                <div>
                  <label style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#111827',
                    marginBottom: '10px' 
                  }}>
                    <div style={{
                      padding: '6px',
                      backgroundColor: '#eff6ff',
                      borderRadius: '6px'
                    }}>
                      <User style={{ height: '14px', width: '14px', color: '#3b82f6' }} />
                    </div>
                    Full Name
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    placeholder="Enter full name"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                      e.target.style.backgroundColor = '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#111827',
                    marginBottom: '10px' 
                  }}>
                    <div style={{
                      padding: '6px',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '6px'
                    }}>
                      <Mail style={{ height: '14px', width: '14px', color: '#10b981' }} />
                    </div>
                    Email Address
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    placeholder="Enter email address"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#10b981'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                      e.target.style.backgroundColor = '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#111827',
                    marginBottom: '10px' 
                  }}>
                    <div style={{
                      padding: '6px',
                      backgroundColor: '#fef3c7',
                      borderRadius: '6px'
                    }}>
                      <Phone style={{ height: '14px', width: '14px', color: '#f59e0b' }} />
                    </div>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f59e0b'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                      e.target.style.backgroundColor = '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Lead Details Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.1)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.15)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)'
              e.currentTarget.style.transform = 'translateY(0)'
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
                    <Target style={{ height: '20px', width: '20px' }} />
                  </div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Lead Details
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Status & Source Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#111827',
                      marginBottom: '10px' 
                    }}>
                      <div style={{
                        padding: '6px',
                        backgroundColor: '#f3e8ff',
                        borderRadius: '6px'
                      }}>
                        <CheckCircle style={{ height: '14px', width: '14px', color: '#9333ea' }} />
                      </div>
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '10px',
                        fontSize: '15px',
                        outline: 'none',
                        transition: 'all 0.2s',
                        backgroundColor: '#f9fafb'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#9333ea'
                        e.target.style.backgroundColor = 'white'
                        e.target.style.boxShadow = '0 0 0 4px rgba(147, 51, 234, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb'
                        e.target.style.backgroundColor = '#f9fafb'
                        e.target.style.boxShadow = 'none'
                      }}
                    >
                      {leadStatuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#111827',
                      marginBottom: '10px' 
                    }}>
                      <div style={{
                        padding: '6px',
                        backgroundColor: '#fee2e2',
                        borderRadius: '6px'
                      }}>
                        <Info style={{ height: '14px', width: '14px', color: '#ef4444' }} />
                      </div>
                      Source
                    </label>
                    <select
                      value={formData.source}
                      onChange={(e) => handleInputChange('source', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '10px',
                        fontSize: '15px',
                        outline: 'none',
                        transition: 'all 0.2s',
                        backgroundColor: '#f9fafb'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#ef4444'
                        e.target.style.backgroundColor = 'white'
                        e.target.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb'
                        e.target.style.backgroundColor = '#f9fafb'
                        e.target.style.boxShadow = 'none'
                      }}
                    >
                      <option value="">Select source</option>
                      {leadSources.map((source) => (
                        <option key={source} value={source}>
                          {source}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Specialization */}
                <div>
                  <label style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#111827',
                    marginBottom: '10px' 
                  }}>
                    <div style={{
                      padding: '6px',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '6px'
                    }}>
                      <Target style={{ height: '14px', width: '14px', color: '#10b981' }} />
                    </div>
                    Interested Specialization
                  </label>
                  <select
                    value={formData.specializationId}
                    onChange={(e) => handleInputChange('specializationId', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#10b981'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                      e.target.style.backgroundColor = '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    <option value="">No specific specialization</option>
                    {specializations.map((spec) => (
                      <option key={spec.id} value={spec.id.toString()}>
                        {spec.name} - {spec.course?.name || 'Unknown Course'} ({spec.course?.college?.name || 'Unknown College'})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Message Card */}
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
                    <MessageSquare style={{ height: '20px', width: '20px' }} />
                  </div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Message
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px' }}>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Any message or inquiry from the lead..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    backgroundColor: '#f9fafb',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ef4444'
                    e.target.style.backgroundColor = 'white'
                    e.target.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb'
                    e.target.style.backgroundColor = '#f9fafb'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Right Column - Preview & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Lead Preview Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(147, 51, 234, 0.1)',
              position: 'sticky',
              top: '32px'
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
                    Preview
                  </h2>
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                {/* Preview Content */}
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  marginBottom: '20px'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#111827',
                    margin: '0 0 12px 0'
                  }}>
                    {formData.name || 'Lead Name'}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Mail style={{ height: '14px', width: '14px', color: '#6b7280' }} />
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        {formData.email || 'email@example.com'}
                      </span>
                    </div>
                    {formData.phone && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Phone style={{ height: '14px', width: '14px', color: '#6b7280' }} />
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>{formData.phone}</span>
                      </div>
                    )}
                    {formData.specializationId && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Target style={{ height: '14px', width: '14px', color: '#6b7280' }} />
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>
                          {specializations.find(s => s.id.toString() === formData.specializationId)?.name || 'Specialization'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: leadStatuses.find(s => s.value === formData.status)?.color + '20',
                    borderRadius: '8px'
                  }}>
                    <CheckCircle style={{ 
                      height: '16px', 
                      width: '16px', 
                      color: leadStatuses.find(s => s.value === formData.status)?.color || '#10b981'
                    }} />
                    <span style={{ 
                      fontSize: '14px', 
                      color: leadStatuses.find(s => s.value === formData.status)?.color || '#10b981',
                      fontWeight: '600'
                    }}>
                      {leadStatuses.find(s => s.value === formData.status)?.label || 'New'}
                    </span>
                  </div>
                </div>

                {/* Help Text */}
                <div style={{
                  padding: '16px',
                  backgroundColor: '#eff6ff',
                  borderRadius: '8px',
                  border: '1px solid #3b82f6'
                }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <AlertCircle style={{ height: '16px', width: '16px', color: '#3b82f6', flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '13px', color: '#1e40af' }}>
                      <strong>Tip:</strong> Make sure to fill all required fields marked with a red asterisk (*).
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Submit Buttons - Full Width */}
        <div style={{
          marginTop: '32px',
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              type="submit" 
              disabled={saving}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                background: saving 
                  ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: saving ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              onMouseOver={(e) => {
                if (!saving) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)'
                }
              }}
              onMouseOut={(e) => {
                if (!saving) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
                }
              }}
            >
              <Save style={{ height: '18px', width: '18px' }} />
              {saving ? 'Saving Changes...' : 'Save Changes'}
            </button>
            
            <Link href={`/admin/leads/${lead.id}`}>
              <button 
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  backgroundColor: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  color: '#374151',
                  fontSize: '15px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textDecoration: 'none',
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
                <ArrowLeft style={{ height: '18px', width: '18px' }} />
                Cancel
              </button>
            </Link>
          </div>

          {/* Last Saved Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6b7280',
            fontSize: '14px'
          }}>
            <Clock style={{ height: '16px', width: '16px' }} />
            <span>Last updated: {new Date(lead.updatedAt || lead.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </form>
    </div>
  )
}