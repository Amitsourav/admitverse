'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, Target, Building, BookOpen, Award, TrendingUp, Edit2, Star, Info, CheckCircle, AlertCircle, DollarSign } from 'lucide-react'
import { toast } from 'react-hot-toast'
import RichTextEditor from '@/components/RichTextEditor'

interface Specialization {
  id: number
  course_id: number
  name: string
  code?: string
  about?: string
  description?: string
  requirements?: string
  career_prospects?: string
  placement_rate?: number
  avg_package?: number
  courses?: {
    name: string
  }
}

interface Course {
  id: number
  name: string
  college_id: number
}

export default function EditSpecializationPage() {
  const params = useParams()
  const router = useRouter()
  const [specialization, setSpecialization] = useState<Specialization | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    course_id: '',
    about: '',
    description: '',
    requirements: '',
    career_prospects: '',
    placement_rate: '',
    avg_package: ''
  })

  useEffect(() => {
    Promise.all([
      fetchSpecialization(),
      fetchCourses()
    ])
  }, [params.id])

  const fetchSpecialization = async () => {
    try {
      const response = await fetch('/api/admin/specializations')
      const result = await response.json()
      
      if (result.success) {
        const foundSpec = result.data.find((s: Specialization) => s.id.toString() === params.id)
        if (foundSpec) {
          setSpecialization(foundSpec)
          setFormData({
            name: foundSpec.name || '',
            code: foundSpec.code || '',
            course_id: foundSpec.course_id?.toString() || '',
            about: foundSpec.about || '',
            description: foundSpec.description || '',
            requirements: foundSpec.requirements || '',
            career_prospects: foundSpec.career_prospects || '',
            placement_rate: foundSpec.placement_rate?.toString() || '',
            avg_package: foundSpec.avg_package?.toString() || ''
          })
        } else {
          toast.error('Specialization not found')
          router.push('/admin/specializations')
        }
      }
    } catch (error) {
      console.error('Error fetching specialization:', error)
      toast.error('Failed to load specialization')
    }
  }

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/admin/courses')
      const result = await response.json()
      
      if (result.success) {
        setCourses(result.data)
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
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
    
    if (!formData.name || !formData.course_id) {
      toast.error('Please fill in all required fields')
      return
    }

    setSaving(true)
    
    try {
      const updateData = {
        id: specialization!.id,
        ...formData,
        course_id: parseInt(formData.course_id),
        placement_rate: formData.placement_rate ? parseFloat(formData.placement_rate) : null,
        avg_package: formData.avg_package ? parseInt(formData.avg_package) : null
      }

      const response = await fetch('/api/admin/specializations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Specialization updated successfully!')
        router.push(`/admin/specializations/${specialization!.id}`)
      } else {
        toast.error(result.error || 'Failed to update specialization')
      }
    } catch (error) {
      console.error('Error updating specialization:', error)
      toast.error('Failed to update specialization')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
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
          <Link href={`/admin/specializations/${specialization.id}`}>
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
              Back to Specialization
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
              Edit Specialization
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Target style={{ height: '16px', width: '16px' }} />
              <span style={{ fontSize: '16px', opacity: 0.9 }}>{specialization.name}</span>
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
                
                {/* Specialization Name */}
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
                      <Target style={{ height: '14px', width: '14px', color: '#3b82f6' }} />
                    </div>
                    Specialization Name
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    placeholder="Enter specialization name"
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

                {/* Course */}
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
                      <BookOpen style={{ height: '14px', width: '14px', color: '#10b981' }} />
                    </div>
                    Course
                    <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    value={formData.course_id}
                    onChange={(e) => handleInputChange('course_id', e.target.value)}
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
                    <option value="">Select course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id.toString()}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Code */}
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
                    Specialization Code
                  </label>
                  <input
                    value={formData.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    placeholder="e.g., CS-AI, MBA-FIN"
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

            {/* Career Information Card */}
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
                    <TrendingUp style={{ height: '20px', width: '20px' }} />
                  </div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Career Information
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Placement Rate & Package Grid */}
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
                        <TrendingUp style={{ height: '14px', width: '14px', color: '#9333ea' }} />
                      </div>
                      Placement Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.placement_rate}
                      onChange={(e) => handleInputChange('placement_rate', e.target.value)}
                      placeholder="e.g., 85.5"
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
                        <DollarSign style={{ height: '14px', width: '14px', color: '#ef4444' }} />
                      </div>
                      Average Package (USD)
                    </label>
                    <input
                      type="number"
                      value={formData.avg_package}
                      onChange={(e) => handleInputChange('avg_package', e.target.value)}
                      placeholder="e.g., 75000"
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

            {/* About & Description Card */}
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
                    About Specialization
                  </h2>
                </div>
              </div>
              <div style={{ padding: '32px' }}>
                <textarea
                  value={formData.about}
                  onChange={(e) => handleInputChange('about', e.target.value)}
                  placeholder="Write about this specialization..."
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
            
            {/* Specialization Preview Card */}
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
                    {formData.name || 'Specialization Name'}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {formData.course_id && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <BookOpen style={{ height: '14px', width: '14px', color: '#6b7280' }} />
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>
                          {courses.find(c => c.id.toString() === formData.course_id)?.name || 'Course'}
                        </span>
                      </div>
                    )}
                    {formData.code && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Award style={{ height: '14px', width: '14px', color: '#6b7280' }} />
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>{formData.code}</span>
                      </div>
                    )}
                    {formData.placement_rate && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <TrendingUp style={{ height: '14px', width: '14px', color: '#6b7280' }} />
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>{formData.placement_rate}% placement</span>
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
            
            <Link href={`/admin/specializations/${specialization.id}`}>
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