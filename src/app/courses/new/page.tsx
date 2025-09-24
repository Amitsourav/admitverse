'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  AlertCircle, 
  CheckCircle, 
  ArrowLeft, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Users, 
  DollarSign, 
  Calendar,
  Save, 
  Eye,
  Award,
  FileText
} from 'lucide-react'
import RichTextEditor from '@/components/RichTextEditor'

export default function AddCoursePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    college: '',
    degree: '',
    duration: '',
    category: '',
    tuitionFee: '',
    capacity: '',
    acceptanceRate: '',
    startDate: '',
    applicationDeadline: '',
    description: '',
    requirements: '',
    curriculum: ''
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Course name is required'
    if (!formData.code.trim()) newErrors.code = 'Course code is required'
    if (!formData.college.trim()) newErrors.college = 'College is required'
    if (!formData.degree) newErrors.degree = 'Degree type is required'
    if (!formData.duration) newErrors.duration = 'Duration is required'
    if (!formData.category) newErrors.category = 'Category is required'
    
    if (formData.capacity && parseInt(formData.capacity) <= 0) {
      newErrors.capacity = 'Capacity must be a positive number'
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
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      console.log('📤 Submitting course data:', formData)
      
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create course')
      }

      console.log('✅ Course created successfully:', result)
      setSuccess(true)
      
      setTimeout(() => {
        router.push('/courses')
      }, 2000)
    } catch (error) {
      console.error('❌ Error creating course:', error)
      setErrors({ submit: error instanceof Error ? error.message : 'Failed to create course' })
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
            margin: '0 auto 16px auto',
            backgroundColor: '#dcfce7',
            borderRadius: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckCircle style={{ width: '32px', height: '32px', color: '#16a34a' }} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
            Success!
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>
            Course has been added successfully.
          </p>
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
          <Link href="/courses">
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
              Add New Course
            </h1>
            <p style={{ fontSize: '16px', opacity: 0.9, margin: 0 }}>
              Create a comprehensive academic program profile
            </p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(99, 102, 241, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>Form Progress</h3>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>
            {Math.round(((formData.name ? 1 : 0) + (formData.college ? 1 : 0) + (formData.degree ? 1 : 0) + (formData.category ? 1 : 0) + (formData.duration ? 1 : 0)) / 5 * 100)}% Complete
          </span>
        </div>
        <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px' }}>
          <div 
            style={{ 
              width: `${Math.round(((formData.name ? 1 : 0) + (formData.college ? 1 : 0) + (formData.degree ? 1 : 0) + (formData.category ? 1 : 0) + (formData.duration ? 1 : 0)) / 5 * 100)}%`,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              height: '8px',
              borderRadius: '9999px',
              transition: 'all 0.5s'
            }}
          />
        </div>
      </div>

      {/* Form Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        
        {/* Main Form */}
        <div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
            
            {/* Basic Information */}
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
                    <BookOpen style={{ height: '20px', width: '20px' }} />
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
              <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
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
                      <BookOpen style={{ height: '14px', width: '14px', color: '#3b82f6' }} />
                    </div>
                    Course Name
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science"
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
                    Course Code
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="code"
                    id="code"
                    required
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="e.g., CS101"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: errors.code ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: errors.code ? '#fef2f2' : '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.code ? '#ef4444' : '#e5e7eb'
                      e.target.style.backgroundColor = errors.code ? '#fef2f2' : '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  {errors.code && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#dc2626' }}>
                      <AlertCircle style={{ height: '16px', width: '16px', marginRight: '4px' }} />
                      {errors.code}
                    </div>
                  )}
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
                    College
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="college"
                    id="college"
                    required
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="e.g., Harvard University"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: errors.college ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: errors.college ? '#fef2f2' : '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.college ? '#ef4444' : '#e5e7eb'
                      e.target.style.backgroundColor = errors.college ? '#fef2f2' : '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  {errors.college && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#dc2626' }}>
                      <AlertCircle style={{ height: '16px', width: '16px', marginRight: '4px' }} />
                      {errors.college}
                    </div>
                  )}
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
                    Degree Type
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    name="degree"
                    id="degree"
                    required
                    value={formData.degree}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: errors.degree ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: errors.degree ? '#fef2f2' : '#f9fafb',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.degree ? '#ef4444' : '#e5e7eb'
                      e.target.style.backgroundColor = errors.degree ? '#fef2f2' : '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    <option value="">Select Degree Type</option>
                    <option value="Bachelor of Science">Bachelor of Science</option>
                    <option value="Bachelor of Arts">Bachelor of Arts</option>
                    <option value="Bachelor of Engineering">Bachelor of Engineering</option>
                    <option value="Master of Science">Master of Science</option>
                    <option value="Master of Arts">Master of Arts</option>
                    <option value="Master of Business Administration">Master of Business Administration</option>
                    <option value="Doctor of Philosophy">Doctor of Philosophy</option>
                    <option value="Juris Doctor">Juris Doctor</option>
                    <option value="Doctor of Medicine">Doctor of Medicine</option>
                  </select>
                  {errors.degree && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#dc2626' }}>
                      <AlertCircle style={{ height: '16px', width: '16px', marginRight: '4px' }} />
                      {errors.degree}
                    </div>
                  )}
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
                    Duration
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    name="duration"
                    id="duration"
                    required
                    value={formData.duration}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: errors.duration ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: errors.duration ? '#fef2f2' : '#f9fafb',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.duration ? '#ef4444' : '#e5e7eb'
                      e.target.style.backgroundColor = errors.duration ? '#fef2f2' : '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    <option value="">Select Duration</option>
                    <option value="1 year">1 year</option>
                    <option value="2 years">2 years</option>
                    <option value="3 years">3 years</option>
                    <option value="4 years">4 years</option>
                    <option value="5 years">5 years</option>
                    <option value="6 years">6 years</option>
                  </select>
                  {errors.duration && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#dc2626' }}>
                      <AlertCircle style={{ height: '16px', width: '16px', marginRight: '4px' }} />
                      {errors.duration}
                    </div>
                  )}
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#111827',
                    marginBottom: '10px' 
                  }}>
                    Category
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    name="category"
                    id="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: errors.category ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: errors.category ? '#fef2f2' : '#f9fafb',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.category ? '#ef4444' : '#e5e7eb'
                      e.target.style.backgroundColor = errors.category ? '#fef2f2' : '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    <option value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Law">Law</option>
                    <option value="Arts">Arts</option>
                    <option value="Science">Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Social Sciences">Social Sciences</option>
                    <option value="Humanities">Humanities</option>
                  </select>
                  {errors.category && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#dc2626' }}>
                      <AlertCircle style={{ height: '16px', width: '16px', marginRight: '4px' }} />
                      {errors.category}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Details */}
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
                    <GraduationCap style={{ height: '20px', width: '20px' }} />
                  </div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Academic Details
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
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
                      backgroundColor: '#dcfce7',
                      borderRadius: '6px'
                    }}>
                      <DollarSign style={{ height: '14px', width: '14px', color: '#16a34a' }} />
                    </div>
                    Tuition Fee
                  </label>
                  <input
                    type="text"
                    name="tuitionFee"
                    id="tuitionFee"
                    value={formData.tuitionFee}
                    onChange={handleChange}
                    placeholder="e.g., $50,000"
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
                      backgroundColor: '#dcfce7',
                      borderRadius: '6px'
                    }}>
                      <Users style={{ height: '14px', width: '14px', color: '#16a34a' }} />
                    </div>
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    id="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g., 1500"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: errors.capacity ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: errors.capacity ? '#fef2f2' : '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#10b981'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.capacity ? '#ef4444' : '#e5e7eb'
                      e.target.style.backgroundColor = errors.capacity ? '#fef2f2' : '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  {errors.capacity && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#dc2626' }}>
                      <AlertCircle style={{ height: '16px', width: '16px', marginRight: '4px' }} />
                      {errors.capacity}
                    </div>
                  )}
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
                      backgroundColor: '#dcfce7',
                      borderRadius: '6px'
                    }}>
                      <Award style={{ height: '14px', width: '14px', color: '#16a34a' }} />
                    </div>
                    Acceptance Rate (%)
                  </label>
                  <input
                    type="number"
                    name="acceptanceRate"
                    id="acceptanceRate"
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
                      e.target.style.borderColor = '#10b981'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)'
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
                      backgroundColor: '#dcfce7',
                      borderRadius: '6px'
                    }}>
                      <Calendar style={{ height: '14px', width: '14px', color: '#16a34a' }} />
                    </div>
                    Start Date
                  </label>
                  <input
                    type="text"
                    name="startDate"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    placeholder="e.g., September 2024"
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

                <div style={{ gridColumn: '1 / -1' }}>
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
                      backgroundColor: '#dcfce7',
                      borderRadius: '6px'
                    }}>
                      <Calendar style={{ height: '14px', width: '14px', color: '#16a34a' }} />
                    </div>
                    Application Deadline
                  </label>
                  <input
                    type="text"
                    name="applicationDeadline"
                    id="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    placeholder="e.g., January 15, 2024"
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
              </div>
            </div>

            {/* Course Content */}
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
                    <FileText style={{ height: '20px', width: '20px' }} />
                  </div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Course Content
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                    Course Description
                  </label>
                  <RichTextEditor
                    value={formData.description}
                    onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                    placeholder="Write a detailed description of the course..."
                  />
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
                    Admission Requirements
                  </label>
                  <RichTextEditor
                    value={formData.requirements}
                    onChange={(value) => setFormData(prev => ({ ...prev, requirements: value }))}
                    placeholder="List the admission requirements and prerequisites..."
                  />
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
                    Curriculum Overview
                  </label>
                  <RichTextEditor
                    value={formData.curriculum}
                    onChange={(value) => setFormData(prev => ({ ...prev, curriculum: value }))}
                    placeholder="Outline the curriculum, subjects, and learning outcomes..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', margin: 0 }}>* Required fields</p>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button
                    type="button"
                    onClick={() => router.push('/courses')}
                    disabled={loading}
                    style={{
                      padding: '12px 24px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      opacity: loading ? 0.5 : 1
                    }}
                    onMouseOver={(e) => {
                      if (!loading) {
                        e.currentTarget.style.backgroundColor = '#f9fafb'
                        e.currentTarget.style.borderColor = '#d1d5db'
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'white'
                      e.currentTarget.style.borderColor = '#e5e7eb'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 32px',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '700',
                      color: 'white',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      opacity: loading ? 0.7 : 1,
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                    }}
                    onMouseOver={(e) => {
                      if (!loading) {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)'
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
                    }}
                  >
                    {loading ? (
                      <>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          borderTopColor: 'white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save style={{ width: '16px', height: '16px' }} />
                        Add Course
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div>
          <div style={{ position: 'sticky', top: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Quick Tips */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  padding: '10px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '10px'
                }}>
                  <BookOpen style={{ height: '16px', width: '16px', color: 'white' }} />
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#111827',
                  margin: 0
                }}>
                  Quick Tips
                </h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: '🎯', text: 'Use clear, descriptive course names' },
                  { icon: '🏛️', text: 'Select the exact college offering this course' },
                  { icon: '📚', text: 'Include comprehensive curriculum details' },
                  { icon: '💰', text: 'Provide accurate tuition and fee information' }
                ].map((tip, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#667eea',
                      borderRadius: '50%',
                      marginTop: '6px',
                      flexShrink: 0
                    }}></div>
                    <p style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      margin: 0,
                      lineHeight: '1.4'
                    }}>
                      {tip.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Preview */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  padding: '10px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '10px'
                }}>
                  <Eye style={{ height: '16px', width: '16px', color: 'white' }} />
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#111827',
                  margin: 0
                }}>
                  Live Preview
                </h3>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#111827',
                    margin: 0
                  }}>
                    {formData.name || 'Course Name'}
                  </h4>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <GraduationCap style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>
                      {formData.college || 'Institution'}
                    </span>
                  </div>
                  
                  {formData.degree && (
                    <div style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      width: 'fit-content'
                    }}>
                      {formData.degree}
                    </div>
                  )}
                  
                  {formData.duration && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                      <span style={{ fontSize: '13px', color: '#6b7280' }}>
                        {formData.duration}
                      </span>
                    </div>
                  )}
                  
                  {formData.tuitionFee && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <DollarSign style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                      <span style={{ fontSize: '13px', color: '#6b7280' }}>
                        {formData.tuitionFee}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Stats */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(139, 92, 246, 0.1)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>
                Form Stats
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#6b7280' }}>Fields completed:</span>
                  <span style={{ fontWeight: '500', color: '#111827' }}>
                    {Object.values(formData).filter(Boolean).length}/{Object.keys(formData).length}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#6b7280' }}>Required fields:</span>
                  <span style={{ fontWeight: '500', color: '#111827' }}>
                    {[formData.name, formData.code, formData.college, formData.degree, formData.duration, formData.category].filter(Boolean).length}/6
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#6b7280' }}>Validation errors:</span>
                  <span style={{ 
                    fontWeight: '500', 
                    color: Object.keys(errors).length > 0 ? '#ef4444' : '#16a34a' 
                  }}>
                    {Object.keys(errors).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}