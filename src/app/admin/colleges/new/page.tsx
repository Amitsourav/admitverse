'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, CheckCircle, ArrowLeft, Building, MapPin, Award, FileText, Save, Eye, Globe, GraduationCap, TrendingUp, Star, Info } from 'lucide-react'
import RichTextEditor from '@/components/RichTextEditor'

export default function AddCollegePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    establishedYear: '',
    type: '',
    country: '',
    state: '',
    city: '',
    ranking: '',
    acceptanceRate: '',
    description: ''
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'College name is required'
    if (!formData.type) newErrors.type = 'Institution type is required'
    if (!formData.country) newErrors.country = 'Country is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    
    if (formData.website && !formData.website.match(/^https?:\/\/.+/)) {
      newErrors.website = 'Please enter a valid URL starting with http:// or https://'
    }
    
    if (formData.acceptanceRate && (parseFloat(formData.acceptanceRate) < 0 || parseFloat(formData.acceptanceRate) > 100)) {
      newErrors.acceptanceRate = 'Acceptance rate must be between 0 and 100'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      const response = await fetch('/api/admin/colleges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          city: formData.city,
          country: formData.country,
          state: formData.state,
          website: formData.website || null,
          ranking: formData.ranking ? parseInt(formData.ranking) : null,
          acceptanceRate: formData.acceptanceRate ? parseFloat(formData.acceptanceRate) : null,
          description: formData.description || null
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create college')
      }

      setSuccess(true)
      
      setTimeout(() => {
        router.push('/admin/colleges')
      }, 2000)
    } catch (error) {
      console.error('Error creating college:', error)
      setErrors({ submit: error instanceof Error ? error.message : 'Failed to create college' })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 16px',
            backgroundColor: '#dcfce7',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckCircle style={{ width: '32px', height: '32px', color: '#16a34a' }} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>Success!</h2>
          <p style={{ color: '#6b7280', margin: 0 }}>College has been added successfully.</p>
        </div>
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
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            padding: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px'
          }}>
            <Building style={{
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
              Add New College
            </h1>
            <p style={{ fontSize: '16px', opacity: 0.9, margin: 0 }}>
              Create a comprehensive profile for a new educational institution
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          
          {/* Left Column - Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Error Display */}
            {errors.submit && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fca5a5',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <AlertCircle style={{ height: '20px', width: '20px', color: '#ef4444' }} />
                <p style={{ color: '#dc2626', fontSize: '14px', margin: 0 }}>{errors.submit}</p>
              </div>
            )}
            
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
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Harvard University"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: errors.name ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: errors.name ? '#fef2f2' : '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.name ? '#ef4444' : '#e5e7eb'
                      e.target.style.backgroundColor = errors.name ? '#fef2f2' : '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  {errors.name && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#dc2626' }}>
                      <AlertCircle style={{ height: '16px', width: '16px', marginRight: '4px' }} />
                      {errors.name}
                    </div>
                  )}
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
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://college.edu"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: errors.website ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: errors.website ? '#fef2f2' : '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#10b981'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.website ? '#ef4444' : '#e5e7eb'
                      e.target.style.backgroundColor = errors.website ? '#fef2f2' : '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  {errors.website && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#dc2626' }}>
                      <AlertCircle style={{ height: '16px', width: '16px', marginRight: '4px' }} />
                      {errors.website}
                    </div>
                  )}
                </div>

                {/* Institution Type */}
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
                    Institution Type
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: errors.type ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: errors.type ? '#fef2f2' : '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f59e0b'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.type ? '#ef4444' : '#e5e7eb'
                      e.target.style.backgroundColor = errors.type ? '#fef2f2' : '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    <option value="">Select Institution Type</option>
                    <option value="Public Research University">Public Research University</option>
                    <option value="Private Research University">Private Research University</option>
                    <option value="Liberal Arts College">Liberal Arts College</option>
                    <option value="Community College">Community College</option>
                    <option value="Technical Institute">Technical Institute</option>
                    <option value="Business School">Business School</option>
                    <option value="Medical School">Medical School</option>
                  </select>
                  {errors.type && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#dc2626' }}>
                      <AlertCircle style={{ height: '16px', width: '16px', marginRight: '4px' }} />
                      {errors.type}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Location Information Card */}
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
                    Location Information
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
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
                  <select
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: errors.country ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: errors.country ? '#fef2f2' : '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#10b981'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.country ? '#ef4444' : '#e5e7eb'
                      e.target.style.backgroundColor = errors.country ? '#fef2f2' : '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    <option value="">Select Country</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="India">India</option>
                    <option value="China">China</option>
                    <option value="Japan">Japan</option>
                  </select>
                  {errors.country && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#dc2626' }}>
                      <AlertCircle style={{ height: '16px', width: '16px', marginRight: '4px' }} />
                      {errors.country}
                    </div>
                  )}
                </div>

                {/* City */}
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
                    City
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., Cambridge"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: errors.city ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: errors.city ? '#fef2f2' : '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#ef4444'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.city ? '#ef4444' : '#e5e7eb'
                      e.target.style.backgroundColor = errors.city ? '#fef2f2' : '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  {errors.city && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#dc2626' }}>
                      <AlertCircle style={{ height: '16px', width: '16px', marginRight: '4px' }} />
                      {errors.city}
                    </div>
                  )}
                </div>

                {/* State */}
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
                      <MapPin style={{ height: '14px', width: '14px', color: '#9333ea' }} />
                    </div>
                    State/Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="e.g., Massachusetts"
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

            {/* Academic Information Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.1)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(245, 158, 11, 0.15)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)'
              e.currentTarget.style.transform = 'translateY(0)'
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
                    <Award style={{ height: '20px', width: '20px' }} />
                  </div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Academic Information
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
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
                    name="ranking"
                    value={formData.ranking}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g., 15"
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
                    name="acceptanceRate"
                    value={formData.acceptanceRate}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="e.g., 15.5"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: errors.acceptanceRate ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: errors.acceptanceRate ? '#fef2f2' : '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#9333ea'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(147, 51, 234, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.acceptanceRate ? '#ef4444' : '#e5e7eb'
                      e.target.style.backgroundColor = errors.acceptanceRate ? '#fef2f2' : '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  {errors.acceptanceRate && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#dc2626' }}>
                      <AlertCircle style={{ height: '16px', width: '16px', marginRight: '4px' }} />
                      {errors.acceptanceRate}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description Card */}
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

            {/* Submit Buttons */}
            <div style={{
              padding: '24px',
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }} />
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', margin: 0 }}>* Required fields</p>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Link href="/admin/colleges">
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
                <button
                  type="submit" 
                  disabled={loading}
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 28px',
                    background: loading 
                      ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid white',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save style={{ height: '18px', width: '18px' }} />
                      Add College
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div>
            <div style={{ position: 'sticky', top: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
              {/* Form Progress */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.1)'
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
                      Progress
                    </h2>
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Form Completion</span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#667eea' }}>
                      {Math.round(((formData.name ? 1 : 0) + (formData.country ? 1 : 0) + (formData.city ? 1 : 0) + (formData.type ? 1 : 0)) / 4 * 100)}%
                    </span>
                  </div>
                  <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px' }}>
                    <div 
                      style={{ 
                        width: `${Math.round(((formData.name ? 1 : 0) + (formData.country ? 1 : 0) + (formData.city ? 1 : 0) + (formData.type ? 1 : 0)) / 4 * 100)}%`,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        height: '8px',
                        borderRadius: '9999px',
                        transition: 'all 0.5s'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ color: '#6b7280' }}>Required fields:</span>
                      <span style={{ fontWeight: '600', color: '#111827' }}>
                        {[formData.name, formData.type, formData.country, formData.city].filter(Boolean).length}/4
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ color: '#6b7280' }}>Validation errors:</span>
                      <span style={{ fontWeight: '600', color: Object.keys(errors).length > 0 ? '#ef4444' : '#10b981' }}>
                        {Object.keys(errors).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.1)'
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
                      <Eye style={{ height: '20px', width: '20px' }} />
                    </div>
                    <h2 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      margin: 0
                    }}>
                      Live Preview
                    </h2>
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
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
                      {(formData.city || formData.state || formData.country) && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <MapPin style={{ height: '14px', width: '14px', color: '#6b7280' }} />
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>
                            {[formData.city, formData.state, formData.country].filter(Boolean).join(', ') || 'Location'}
                          </span>
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
                      {formData.type && (
                        <div style={{
                          display: 'inline-block',
                          padding: '6px 12px',
                          backgroundColor: '#eff6ff',
                          color: '#1e40af',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          marginTop: '8px'
                        }}>
                          {formData.type}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
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
                      <Building style={{ height: '20px', width: '20px' }} />
                    </div>
                    <h2 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      margin: 0
                    }}>
                      Quick Tips
                    </h2>
                  </div>
                </div>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#3b82f6', borderRadius: '50%', marginTop: '6px', flexShrink: 0 }} />
                    <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
                      Use the official college name as it appears on their website
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', marginTop: '6px', flexShrink: 0 }} />
                    <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
                      Include the full website URL starting with https://
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#f59e0b', borderRadius: '50%', marginTop: '6px', flexShrink: 0 }} />
                    <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
                      Global ranking should be from a recognized ranking system
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', marginTop: '6px', flexShrink: 0 }} />
                    <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
                      Use rich text formatting for better descriptions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}