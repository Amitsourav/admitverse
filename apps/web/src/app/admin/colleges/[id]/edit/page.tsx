'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, GraduationCap, MapPin, Globe, Award, TrendingUp, Edit2, Building, Star, Info, Image, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'
import RichTextEditor from '@/components/RichTextEditor'

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
}

export default function EditCollegePage() {
  const params = useParams()
  const router = useRouter()
  const [college, setCollege] = useState<College | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    country: '',
    website: '',
    ranking: '',
    acceptanceRate: '',
    description: '',
    featured: false
  })

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await fetch('/api/admin/colleges')
        const result = await response.json()
        
        if (result.success) {
          const foundCollege = result.data.find((c: any) => c.id.toString() === params.id)
          if (foundCollege) {
            setCollege(foundCollege)
            setFormData({
              name: foundCollege.name || '',
              location: foundCollege.location || '',
              country: foundCollege.country || '',
              website: foundCollege.website || '',
              ranking: foundCollege.ranking?.toString() || '',
              acceptanceRate: foundCollege.acceptance_rate?.toString() || '',
              description: foundCollege.description || '',
              featured: foundCollege.featured || false
            })
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch('/api/admin/colleges', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: parseInt(params.id as string),
          name: formData.name,
          location: formData.location,
          country: formData.country,
          website: formData.website || null,
          ranking: formData.ranking ? parseInt(formData.ranking) : null,
          acceptance_rate: formData.acceptanceRate ? parseFloat(formData.acceptanceRate) : null,
          description: formData.description || null,
          featured: formData.featured
        })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('College updated successfully')
        router.push(`/admin/colleges/${params.id}`)
      } else {
        toast.error('Failed to update college')
      }
    } catch (error) {
      console.error('Error updating college:', error)
      toast.error('Failed to update college')
    } finally {
      setIsSaving(false)
    }
  }

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
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#5856eb'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#6366f1'
            e.currentTarget.style.transform = 'translateY(0)'
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
          <Link href={`/admin/colleges/${college.id}`}>
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
              Back to College
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
              Edit College
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GraduationCap style={{ height: '16px', width: '16px' }} />
              <span style={{ fontSize: '16px', opacity: 0.9 }}>{college.name}</span>
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
                    <Building style={{ height: '20px', width: '20px' }} />
                  </div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Basic Information
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* College Name */}
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
                      <GraduationCap style={{ height: '14px', width: '14px', color: '#3b82f6' }} />
                    </div>
                    College Name
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    placeholder="Enter college name"
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

                {/* Website */}
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
                      <Globe style={{ height: '14px', width: '14px', color: '#10b981' }} />
                    </div>
                    Website
                  </label>
                  <input
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://college.edu"
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

                {/* Featured Toggle */}
                <div style={{ 
                  padding: '20px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '12px',
                  border: '1px solid #fbbf24'
                }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      style={{ 
                        width: '20px', 
                        height: '20px',
                        accentColor: '#f59e0b',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontSize: '15px', 
                        fontWeight: '600', 
                        color: '#92400e',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <Star style={{ height: '16px', width: '16px' }} />
                        Feature this college
                      </div>
                      <div style={{ fontSize: '13px', color: '#b45309', marginTop: '4px' }}>
                        Featured colleges appear on the homepage
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Location & Academic Information Card */}
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
                    <MapPin style={{ height: '20px', width: '20px' }} />
                  </div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Location & Academic Info
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Location */}
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
                      <MapPin style={{ height: '14px', width: '14px', color: '#ef4444' }} />
                    </div>
                    Location
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="City, State, Country"
                    required
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
                  />
                </div>

                {/* Country */}
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
                      backgroundColor: '#e0e7ff',
                      borderRadius: '6px'
                    }}>
                      <Globe style={{ height: '14px', width: '14px', color: '#6366f1' }} />
                    </div>
                    Country
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    required
                    placeholder="e.g., United States"
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

                {/* Ranking */}
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
                      <Award style={{ height: '14px', width: '14px', color: '#f59e0b' }} />
                    </div>
                    Global Ranking
                  </label>
                  <input
                    type="number"
                    value={formData.ranking}
                    onChange={(e) => setFormData(prev => ({ ...prev, ranking: e.target.value }))}
                    placeholder="e.g., 50"
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

                {/* Acceptance Rate */}
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
                      <TrendingUp style={{ height: '14px', width: '14px', color: '#9333ea' }} />
                    </div>
                    Acceptance Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.acceptanceRate}
                    onChange={(e) => setFormData(prev => ({ ...prev, acceptanceRate: e.target.value }))}
                    placeholder="e.g., 15.5"
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
                  />
                </div>
              </div>
            </div>

            {/* Description Card - Full Width */}
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
                    College Description
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px' }}>
                <RichTextEditor
                  value={formData.description}
                  onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                  placeholder="Write a detailed description of the college..."
                />
              </div>
            </div>
          </div>
          
          {/* Right Column - Preview & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* College Preview Card */}
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
                    {formData.name || 'College Name'}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {formData.location && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin style={{ height: '14px', width: '14px', color: '#6b7280' }} />
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>{formData.location}</span>
                      </div>
                    )}
                    {formData.website && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Globe style={{ height: '14px', width: '14px', color: '#6b7280' }} />
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>{formData.website}</span>
                      </div>
                    )}
                    {formData.ranking && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Award style={{ height: '14px', width: '14px', color: '#6b7280' }} />
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Rank #{formData.ranking}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Indicators */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: formData.featured ? '#fef3c7' : '#f3f4f6',
                    borderRadius: '8px'
                  }}>
                    <Star style={{ 
                      height: '16px', 
                      width: '16px', 
                      color: formData.featured ? '#f59e0b' : '#9ca3af' 
                    }} />
                    <span style={{ 
                      fontSize: '14px', 
                      color: formData.featured ? '#92400e' : '#6b7280' 
                    }}>
                      {formData.featured ? 'Featured College' : 'Not Featured'}
                    </span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: '#ecfdf5',
                    borderRadius: '8px'
                  }}>
                    <CheckCircle style={{ height: '16px', width: '16px', color: '#10b981' }} />
                    <span style={{ fontSize: '14px', color: '#065f46' }}>Active Status</span>
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
                      <strong>Tip:</strong> Make sure to fill all required fields marked with a red asterisk (*). Featured colleges will appear on the homepage.
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
              disabled={isSaving}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                background: isSaving 
                  ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: isSaving ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              onMouseOver={(e) => {
                if (!isSaving) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)'
                }
              }}
              onMouseOut={(e) => {
                if (!isSaving) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
                }
              }}
            >
              <Save style={{ height: '18px', width: '18px' }} />
              {isSaving ? 'Saving Changes...' : 'Save Changes'}
            </button>
            
            <Link href={`/admin/colleges/${college.id}`}>
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
            <Info style={{ height: '16px', width: '16px' }} />
            <span>All changes are saved automatically</span>
          </div>
        </div>
      </form>
    </div>
  )
}