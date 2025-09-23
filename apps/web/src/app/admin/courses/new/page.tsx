'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, CheckCircle, ArrowLeft, BookOpen, Calendar, Clock, DollarSign, FileText, Save, Eye, Award, Users, Target, Hash, BookOpenCheck, Monitor, Star, Info } from 'lucide-react'
import RichTextEditor from '@/components/RichTextEditor'

interface College {
  id: number
  name: string
  featured?: boolean
}

export default function AddCoursePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [colleges, setColleges] = useState<College[]>([])
  
  const [formData, setFormData] = useState<{
    name: string
    short_name: string
    college_id: string
    degree_type: string
    duration: string
    total_seats: string
    fees: string
    description: string
    eligibility: string
    admission_process: string
    status: string
    featured: boolean
    category: string
    intake_dates: string
    application_deadline: string
    acceptance_rate: string
    ranking: string
    students_enrolled: string
    max_capacity: string
    course_code: string
    credits: string
    mode: string
    specializations: string
  }>({
    name: '',
    short_name: '',
    college_id: '',
    degree_type: '',
    duration: '',
    total_seats: '',
    fees: '',
    description: '',
    eligibility: '',
    admission_process: '',
    status: 'ACTIVE',
    featured: false,
    category: '',
    intake_dates: '',
    application_deadline: '',
    acceptance_rate: '',
    ranking: '',
    students_enrolled: '',
    max_capacity: '',
    course_code: '',
    credits: '',
    mode: '',
    specializations: ''
  })

  useEffect(() => {
    fetchColleges()
  }, [])

  const fetchColleges = async () => {
    try {
      const response = await fetch('/api/admin/colleges')
      const result = await response.json()
      if (result.success) {
        setColleges(result.data)
      }
    } catch (error) {
      console.error('Error fetching colleges:', error)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Course name is required'
    if (!formData.college_id) newErrors.college_id = 'College selection is required'
    
    if (formData.fees && isNaN(parseInt(formData.fees))) {
      newErrors.fees = 'Fees must be a valid number'
    }
    
    if (formData.acceptance_rate && (parseFloat(formData.acceptance_rate) < 0 || parseFloat(formData.acceptance_rate) > 100)) {
      newErrors.acceptance_rate = 'Acceptance rate must be between 0 and 100'
    }
    
    if (formData.credits && isNaN(parseInt(formData.credits))) {
      newErrors.credits = 'Credits must be a valid number'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          short_name: formData.short_name || null,
          college_id: formData.college_id,
          degree_type: formData.degree_type || null,
          duration: formData.duration || null,
          total_seats: formData.total_seats ? parseInt(formData.total_seats) : null,
          fees: formData.fees ? parseInt(formData.fees) : null,
          description: formData.description || null,
          eligibility: formData.eligibility || null,
          admission_process: formData.admission_process || null,
          status: formData.status,
          featured: formData.featured,
          category: formData.category || null,
          intake_dates: formData.intake_dates ? formData.intake_dates.split(',').map(d => d.trim()) : [],
          application_deadline: formData.application_deadline || null,
          acceptance_rate: formData.acceptance_rate ? parseFloat(formData.acceptance_rate) : null,
          ranking: formData.ranking ? parseInt(formData.ranking) : null,
          students_enrolled: formData.students_enrolled ? parseInt(formData.students_enrolled) : 0,
          max_capacity: formData.max_capacity ? parseInt(formData.max_capacity) : null,
          course_code: formData.course_code || null,
          credits: formData.credits ? parseInt(formData.credits) : null,
          mode: formData.mode || null,
          specializations: formData.specializations ? formData.specializations.split(',').map(s => s.trim()) : []
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create course')
      }

      setSuccess(true)
      
      setTimeout(() => {
        router.push('/admin/courses')
      }, 2000)
    } catch (error) {
      console.error('Error creating course:', error)
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
          <p style={{ color: '#6b7280', margin: 0 }}>Course has been added successfully.</p>
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
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
              Create a comprehensive profile for a new academic course
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
              border: '1px solid rgba(59, 130, 246, 0.1)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.15)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}>
              <div style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Course Name */}
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
                      backgroundColor: '#dbeafe',
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
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science Engineering"
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
                      e.target.style.borderColor = '#3b82f6'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)'
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

                {/* Short Name */}
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
                      <Hash style={{ height: '14px', width: '14px', color: '#6366f1' }} />
                    </div>
                    Short Name
                  </label>
                  <input
                    type="text"
                    name="short_name"
                    value={formData.short_name}
                    onChange={handleChange}
                    placeholder="e.g., CSE"
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

                {/* College Selection */}
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
                    College
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    name="college_id"
                    required
                    value={formData.college_id}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: errors.college_id ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: errors.college_id ? '#fef2f2' : '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f59e0b'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.college_id ? '#ef4444' : '#e5e7eb'
                      e.target.style.backgroundColor = errors.college_id ? '#fef2f2' : '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    <option value="">Select College</option>
                    {colleges.map((college) => (
                      <option key={college.id} value={college.id}>
                        {college.name}
                      </option>
                    ))}
                  </select>
                  {errors.college_id && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#dc2626' }}>
                      <AlertCircle style={{ height: '16px', width: '16px', marginRight: '4px' }} />
                      {errors.college_id}
                    </div>
                  )}
                </div>

                {/* Course Code */}
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
                      <Hash style={{ height: '14px', width: '14px', color: '#10b981' }} />
                    </div>
                    Course Code
                  </label>
                  <input
                    type="text"
                    name="course_code"
                    value={formData.course_code}
                    onChange={handleChange}
                    placeholder="e.g., CS101 (auto-generated if empty)"
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

            {/* Academic Details Card */}
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
                    <BookOpenCheck style={{ height: '20px', width: '20px' }} />
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
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Degree Type */}
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
                    Degree Type
                  </label>
                  <select
                    name="degree_type"
                    value={formData.degree_type}
                    onChange={handleChange}
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
                  >
                    <option value="">Select Degree Type</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="PhD">PhD</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Certificate">Certificate</option>
                  </select>
                </div>

                {/* Duration */}
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
                      <Clock style={{ height: '14px', width: '14px', color: '#6366f1' }} />
                    </div>
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 4 years"
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

                {/* Credits */}
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
                      <Star style={{ height: '14px', width: '14px', color: '#9333ea' }} />
                    </div>
                    Credits
                  </label>
                  <input
                    type="number"
                    name="credits"
                    value={formData.credits}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g., 120"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: errors.credits ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: errors.credits ? '#fef2f2' : '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#9333ea'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(147, 51, 234, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.credits ? '#ef4444' : '#e5e7eb'
                      e.target.style.backgroundColor = errors.credits ? '#fef2f2' : '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  {errors.credits && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#dc2626' }}>
                      <AlertCircle style={{ height: '16px', width: '16px', marginRight: '4px' }} />
                      {errors.credits}
                    </div>
                  )}
                </div>

                {/* Mode */}
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
                      <Monitor style={{ height: '14px', width: '14px', color: '#10b981' }} />
                    </div>
                    Mode
                  </label>
                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
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
                    <option value="">Select Mode</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Distance Learning">Distance Learning</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Admission Information Card */}
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
                    <Target style={{ height: '20px', width: '20px' }} />
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
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Total Seats */}
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
                      backgroundColor: '#dbeafe',
                      borderRadius: '6px'
                    }}>
                      <Users style={{ height: '14px', width: '14px', color: '#3b82f6' }} />
                    </div>
                    Total Seats
                  </label>
                  <input
                    type="number"
                    name="total_seats"
                    value={formData.total_seats}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g., 60"
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
                      e.target.style.borderColor = '#3b82f6'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                      e.target.style.backgroundColor = '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Fees */}
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
                      <DollarSign style={{ height: '14px', width: '14px', color: '#10b981' }} />
                    </div>
                    Annual Fees (USD)
                  </label>
                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g., 25000"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: errors.fees ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: errors.fees ? '#fef2f2' : '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#10b981'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.fees ? '#ef4444' : '#e5e7eb'
                      e.target.style.backgroundColor = errors.fees ? '#fef2f2' : '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  {errors.fees && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#dc2626' }}>
                      <AlertCircle style={{ height: '16px', width: '16px', marginRight: '4px' }} />
                      {errors.fees}
                    </div>
                  )}
                </div>

                {/* Application Deadline */}
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
                      <Calendar style={{ height: '14px', width: '14px', color: '#ef4444' }} />
                    </div>
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    name="application_deadline"
                    value={formData.application_deadline}
                    onChange={handleChange}
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

                {/* Intake Dates */}
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
                      <Calendar style={{ height: '14px', width: '14px', color: '#f59e0b' }} />
                    </div>
                    Intake Dates
                  </label>
                  <input
                    type="text"
                    name="intake_dates"
                    value={formData.intake_dates}
                    onChange={handleChange}
                    placeholder="e.g., January, August (comma separated)"
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

            {/* Statistics Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(147, 51, 234, 0.1)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(147, 51, 234, 0.15)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)'
              e.currentTarget.style.transform = 'translateY(0)'
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
                    <Users style={{ height: '20px', width: '20px' }} />
                  </div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Statistics & Ranking
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Students Enrolled */}
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
                      backgroundColor: '#dbeafe',
                      borderRadius: '6px'
                    }}>
                      <Users style={{ height: '14px', width: '14px', color: '#3b82f6' }} />
                    </div>
                    Students Enrolled
                  </label>
                  <input
                    type="number"
                    name="students_enrolled"
                    value={formData.students_enrolled}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g., 45"
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
                      e.target.style.borderColor = '#3b82f6'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                      e.target.style.backgroundColor = '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Max Capacity */}
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
                    Max Capacity
                  </label>
                  <input
                    type="number"
                    name="max_capacity"
                    value={formData.max_capacity}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g., 60"
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
                      backgroundColor: '#fef3c7',
                      borderRadius: '6px'
                    }}>
                      <Star style={{ height: '14px', width: '14px', color: '#f59e0b' }} />
                    </div>
                    Acceptance Rate (%)
                  </label>
                  <input
                    type="number"
                    name="acceptance_rate"
                    value={formData.acceptance_rate}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="e.g., 75.5"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: errors.acceptance_rate ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: errors.acceptance_rate ? '#fef2f2' : '#f9fafb'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f59e0b'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.acceptance_rate ? '#ef4444' : '#e5e7eb'
                      e.target.style.backgroundColor = errors.acceptance_rate ? '#fef2f2' : '#f9fafb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  {errors.acceptance_rate && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#dc2626' }}>
                      <AlertCircle style={{ height: '16px', width: '16px', marginRight: '4px' }} />
                      {errors.acceptance_rate}
                    </div>
                  )}
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
                      backgroundColor: '#f3e8ff',
                      borderRadius: '6px'
                    }}>
                      <Award style={{ height: '14px', width: '14px', color: '#9333ea' }} />
                    </div>
                    Course Ranking
                  </label>
                  <input
                    type="number"
                    name="ranking"
                    value={formData.ranking}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g., 25"
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

            {/* Course Settings Card */}
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
                    Course Settings
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Status */}
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
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
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
                    <option value="ACTIVE">Active</option>
                    <option value="DRAFT">Draft</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>

                {/* Category */}
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
                      <BookOpenCheck style={{ height: '14px', width: '14px', color: '#6366f1' }} />
                    </div>
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
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
                  >
                    <option value="">Select Category</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Arts">Arts</option>
                    <option value="Science">Science</option>
                    <option value="Technology">Technology</option>
                    <option value="Law">Law</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                {/* Featured */}
                <div>
                  <label style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#111827',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      style={{
                        width: '18px',
                        height: '18px',
                        accentColor: '#f59e0b'
                      }}
                    />
                    <div style={{
                      padding: '6px',
                      backgroundColor: '#fef3c7',
                      borderRadius: '6px'
                    }}>
                      <Star style={{ height: '14px', width: '14px', color: '#f59e0b' }} />
                    </div>
                    Featured Course
                  </label>
                </div>

                {/* Specializations */}
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
                      <Award style={{ height: '14px', width: '14px', color: '#9333ea' }} />
                    </div>
                    Specializations
                  </label>
                  <input
                    type="text"
                    name="specializations"
                    value={formData.specializations}
                    onChange={handleChange}
                    placeholder="e.g., AI, Cybersecurity, Web Development (comma separated)"
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

            {/* Description Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.1)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.15)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}>
              <div style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
                    Course Description
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px' }}>
                <RichTextEditor
                  value={formData.description}
                  onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                  placeholder="Write a detailed description of the course..."
                />
              </div>
            </div>

            {/* Eligibility Card */}
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
                    <FileText style={{ height: '20px', width: '20px' }} />
                  </div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Eligibility & Admission
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Eligibility */}
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
                      <BookOpenCheck style={{ height: '14px', width: '14px', color: '#10b981' }} />
                    </div>
                    Eligibility Criteria
                  </label>
                  <textarea
                    name="eligibility"
                    value={formData.eligibility}
                    onChange={handleChange}
                    rows={4}
                    placeholder="e.g., 12th grade with PCM, minimum 75% marks"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: '#f9fafb',
                      fontFamily: 'inherit'
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

                {/* Admission Process */}
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
                      backgroundColor: '#dbeafe',
                      borderRadius: '6px'
                    }}>
                      <Target style={{ height: '14px', width: '14px', color: '#3b82f6' }} />
                    </div>
                    Admission Process
                  </label>
                  <textarea
                    name="admission_process"
                    value={formData.admission_process}
                    onChange={handleChange}
                    rows={4}
                    placeholder="e.g., Entrance exam followed by interview and document verification"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: '#f9fafb',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)'
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
                <Link href="/admin/courses">
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
                      : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)'
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
                      Add Course
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
                border: '1px solid rgba(59, 130, 246, 0.1)'
              }}>
                <div style={{
                  padding: '24px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#3b82f6' }}>
                      {Math.round(((formData.name ? 1 : 0) + (formData.college_id ? 1 : 0)) / 2 * 100)}%
                    </span>
                  </div>
                  <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px' }}>
                    <div 
                      style={{ 
                        width: `${Math.round(((formData.name ? 1 : 0) + (formData.college_id ? 1 : 0)) / 2 * 100)}%`,
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
                        {[formData.name, formData.college_id].filter(Boolean).length}/2
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
                      {formData.name || 'Course Name'}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {formData.short_name && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Hash style={{ height: '14px', width: '14px', color: '#6b7280' }} />
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>{formData.short_name}</span>
                        </div>
                      )}
                      {formData.degree_type && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Award style={{ height: '14px', width: '14px', color: '#6b7280' }} />
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>{formData.degree_type}</span>
                        </div>
                      )}
                      {formData.duration && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Clock style={{ height: '14px', width: '14px', color: '#6b7280' }} />
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>{formData.duration}</span>
                        </div>
                      )}
                      {formData.fees && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <DollarSign style={{ height: '14px', width: '14px', color: '#6b7280' }} />
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>${parseInt(formData.fees).toLocaleString()}/year</span>
                        </div>
                      )}
                      
                      <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                        {formData.status && (
                          <div style={{
                            padding: '4px 8px',
                            backgroundColor: formData.status === 'ACTIVE' ? '#dcfce7' : formData.status === 'DRAFT' ? '#fef3c7' : '#fee2e2',
                            color: formData.status === 'ACTIVE' ? '#166534' : formData.status === 'DRAFT' ? '#92400e' : '#991b1b',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '600'
                          }}>
                            {formData.status}
                          </div>
                        )}
                        {formData.featured && (
                          <div style={{
                            padding: '4px 8px',
                            backgroundColor: '#fef3c7',
                            color: '#92400e',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '600'
                          }}>
                            ⭐ Featured
                          </div>
                        )}
                        {formData.category && (
                          <div style={{
                            padding: '4px 8px',
                            backgroundColor: '#e0e7ff',
                            color: '#3730a3',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '600'
                          }}>
                            {formData.category}
                          </div>
                        )}
                      </div>
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
                      <BookOpen style={{ height: '20px', width: '20px' }} />
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
                      Course code will be auto-generated from name if not provided
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', marginTop: '6px', flexShrink: 0 }} />
                    <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
                      Use comma-separated values for intake dates and specializations
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#f59e0b', borderRadius: '50%', marginTop: '6px', flexShrink: 0 }} />
                    <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
                      Featured courses will appear prominently on the website
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', marginTop: '6px', flexShrink: 0 }} />
                    <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
                      Use rich text formatting for better course descriptions
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