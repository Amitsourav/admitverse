'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, BookOpen, Building, Globe, Award, TrendingUp, Edit2, Star, Info, CheckCircle, AlertCircle, Clock, Plus, X } from 'lucide-react'
import { toast } from 'react-hot-toast'
import RichTextEditor from '@/components/RichTextEditor'

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
}

interface College {
  id: number
  name: string
  location?: string
  country?: string
  featured?: boolean
}

export default function EditCoursePage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
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
    intake_dates: [''],
    application_deadline: '',
    acceptance_rate: '',
    ranking: '',
    students_enrolled: '',
    max_capacity: '',
    course_code: '',
    credits: '',
    mode: '',
    specializations: ['']
  })

  useEffect(() => {
    Promise.all([
      fetchCourse(),
      fetchColleges()
    ])
  }, [params.id])

  const fetchCourse = async () => {
    try {
      const response = await fetch('/api/admin/courses')
      const result = await response.json()
      
      if (result.success) {
        const foundCourse = result.data.find((c: Course) => c.id.toString() === params.id)
        if (foundCourse) {
          setCourse(foundCourse)
          setFormData({
            name: foundCourse.name || '',
            short_name: foundCourse.short_name || '',
            college_id: foundCourse.college_id?.toString() || '',
            degree_type: foundCourse.degree_type || '',
            duration: foundCourse.duration || '',
            total_seats: foundCourse.total_seats?.toString() || '',
            fees: foundCourse.fees?.toString() || '',
            description: foundCourse.description || '',
            eligibility: foundCourse.eligibility || '',
            admission_process: foundCourse.admission_process || '',
            status: foundCourse.status || 'ACTIVE',
            featured: foundCourse.featured || false,
            category: foundCourse.category || '',
            intake_dates: foundCourse.intake_dates?.length ? foundCourse.intake_dates : [''],
            application_deadline: foundCourse.application_deadline || '',
            acceptance_rate: foundCourse.acceptance_rate?.toString() || '',
            ranking: foundCourse.ranking?.toString() || '',
            students_enrolled: foundCourse.students_enrolled?.toString() || '0',
            max_capacity: foundCourse.max_capacity?.toString() || '',
            course_code: foundCourse.course_code || '',
            credits: foundCourse.credits?.toString() || '',
            mode: foundCourse.mode || '',
            specializations: foundCourse.specializations?.length ? foundCourse.specializations : ['']
          })
        } else {
          toast.error('Course not found')
          router.push('/admin/courses')
        }
      }
    } catch (error) {
      console.error('Error fetching course:', error)
      toast.error('Failed to load course')
    }
  }

  const fetchColleges = async () => {
    try {
      const response = await fetch('/api/admin/colleges')
      const result = await response.json()
      
      if (result.success) {
        setColleges(result.data)
      }
    } catch (error) {
      console.error('Error fetching colleges:', error)
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

  const handleArrayChange = (field: 'intake_dates' | 'specializations', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field: 'intake_dates' | 'specializations') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayItem = (field: 'intake_dates' | 'specializations', index: number) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🔄 Course form submitted with data:', formData)
    
    if (!formData.name || !formData.college_id) {
      toast.error('Please fill in all required fields')
      return
    }

    setSaving(true)
    
    try {
      const updateData = {
        id: course!.id,
        ...formData,
        college_id: parseInt(formData.college_id),
        total_seats: formData.total_seats ? parseInt(formData.total_seats) : null,
        fees: formData.fees ? parseInt(formData.fees) : null,
        acceptance_rate: formData.acceptance_rate ? parseFloat(formData.acceptance_rate) : null,
        ranking: formData.ranking ? parseInt(formData.ranking) : null,
        students_enrolled: formData.students_enrolled ? parseInt(formData.students_enrolled) : 0,
        max_capacity: formData.max_capacity ? parseInt(formData.max_capacity) : null,
        credits: formData.credits ? parseInt(formData.credits) : null,
        intake_dates: formData.intake_dates.filter(date => date.trim() !== ''),
        specializations: formData.specializations.filter(spec => spec.trim() !== '')
      }

      const response = await fetch('/api/admin/courses', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })

      const result = await response.json()
      console.log('📡 Course API Response:', result)

      if (result.success) {
        toast.success('Course updated successfully!')
        router.push(`/admin/courses/${course!.id}`)
      } else {
        console.error('❌ Course update failed:', result)
        toast.error(result.error || 'Failed to update course')
      }
    } catch (error) {
      console.error('Error updating course:', error)
      toast.error('Failed to update course')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        Loading course details...
      </div>
    )
  }

  if (!course) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <h1>Course not found</h1>
        <Link href="/admin/courses">
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
            Back to Courses
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
          <Link href={`/admin/courses/${course.id}`}>
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
              Back to Course Details
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
              Edit Course
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen style={{ height: '16px', width: '16px' }} />
              <span style={{ fontSize: '16px', opacity: 0.9 }}>{course.name}</span>
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
                      backgroundColor: '#eff6ff',
                      borderRadius: '6px'
                    }}>
                      <BookOpen style={{ height: '14px', width: '14px', color: '#3b82f6' }} />
                    </div>
                    Course Name
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    placeholder="Enter course name"
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

                {/* College */}
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
                      <Building style={{ height: '14px', width: '14px', color: '#10b981' }} />
                    </div>
                    College
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    value={formData.college_id}
                    onChange={(e) => handleInputChange('college_id', e.target.value)}
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
                    <option value="">Select college</option>
                    {colleges.map((college) => (
                      <option key={college.id} value={college.id.toString()}>
                        {college.name}
                      </option>
                    ))}
                  </select>
                </div>

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
                    value={formData.degree_type}
                    onChange={(e) => handleInputChange('degree_type', e.target.value)}
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
                    <option value="">Select degree type</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="PhD">PhD</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Certificate">Certificate</option>
                  </select>
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
                      onChange={(e) => handleInputChange('featured', e.target.checked)}
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
                        Feature this course
                      </div>
                      <div style={{ fontSize: '13px', color: '#b45309', marginTop: '4px' }}>
                        Featured courses appear on the homepage
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Course Details Card */}
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
                    <Info style={{ height: '20px', width: '20px' }} />
                  </div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Course Details
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Duration & Fees Grid */}
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
                        <Clock style={{ height: '14px', width: '14px', color: '#9333ea' }} />
                      </div>
                      Duration
                    </label>
                    <input
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
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
                        <TrendingUp style={{ height: '14px', width: '14px', color: '#ef4444' }} />
                      </div>
                      Annual Fees (USD)
                    </label>
                    <input
                      type="number"
                      value={formData.fees}
                      onChange={(e) => handleInputChange('fees', e.target.value)}
                      placeholder="e.g., 25000"
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
                </div>
              </div>
            </div>

            {/* Course Description Card */}
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
                    <Info style={{ height: '20px', width: '20px' }} />
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
                  onChange={(content) => handleInputChange('description', content)}
                  placeholder="Write a detailed course description..."
                />
              </div>
            </div>
          </div>
          
          {/* Right Column - Preview & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Course Preview Card */}
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
                    {formData.name || 'Course Name'}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {formData.college_id && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Building style={{ height: '14px', width: '14px', color: '#6b7280' }} />
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>
                          {colleges.find(c => c.id.toString() === formData.college_id)?.name || 'College'}
                        </span>
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
                      {formData.featured ? 'Featured Course' : 'Not Featured'}
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
                      <strong>Tip:</strong> Make sure to fill all required fields marked with a red asterisk (*). Featured courses will appear on the homepage.
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
            
            <Link href={`/admin/courses/${course.id}`}>
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