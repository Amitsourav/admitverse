'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AlertCircle, CheckCircle, ArrowLeft, Target, Save, Eye, TrendingUp, BookOpen, Info } from 'lucide-react'
import RichTextEditor from '@/components/RichTextEditor'
import { toast } from 'react-hot-toast'

interface Course {
  id: number
  name: string
  short_name?: string
  colleges?: {
    name: string
  }
}

export default function AddSpecializationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [courses, setCourses] = useState<Course[]>([])
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    course_id: '',
    about: '',
    description: '',
    requirements: '',
    career_prospects: '',
    placement_rate: '',
    avg_package: '',
    top_recruiters: '',
    research_areas: '',
    lab_facilities: '',
    syllabus: ''
  })

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/admin/courses')
      const result = await response.json()
      if (result.success) {
        setCourses(result.data)
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
      toast.error('Failed to load courses')
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Specialization name is required'
    if (!formData.course_id) newErrors.course_id = 'Course selection is required'
    
    if (formData.placement_rate && (parseFloat(formData.placement_rate) < 0 || parseFloat(formData.placement_rate) > 100)) {
      newErrors.placement_rate = 'Placement rate must be between 0 and 100'
    }
    
    if (formData.avg_package && isNaN(parseInt(formData.avg_package))) {
      newErrors.avg_package = 'Average package must be a valid number'
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleRichTextChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    setErrors({})

    try {
      const submitData = {
        ...formData,
        courseId: formData.course_id,
        placementRate: formData.placement_rate,
        avgPackage: formData.avg_package,
        careerProspects: formData.career_prospects,
        topRecruiters: formData.top_recruiters ? JSON.parse(formData.top_recruiters) : null,
        researchAreas: formData.research_areas ? JSON.parse(formData.research_areas) : null,
        labFacilities: formData.lab_facilities ? JSON.parse(formData.lab_facilities) : null,
        syllabus: formData.syllabus ? JSON.parse(formData.syllabus) : null
      }

      const response = await fetch('/api/admin/specializations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })

      const result = await response.json()

      if (result.success) {
        setSuccess(true)
        toast.success('Specialization created successfully!')
        setTimeout(() => {
          router.push('/admin/specializations')
        }, 2000)
      } else {
        setErrors({ submit: result.error || 'Failed to create specialization' })
        toast.error(result.error || 'Failed to create specialization')
      }
    } catch (error) {
      console.error('Error creating specialization:', error)
      setErrors({ submit: 'An unexpected error occurred' })
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const completedFields = [
    formData.name,
    formData.course_id,
    formData.about,
    formData.description,
    formData.placement_rate,
    formData.avg_package
  ].filter(field => field && field.trim()).length

  const progressPercentage = Math.round((completedFields / 6) * 100)

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/admin/specializations"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Specializations
        </Link>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add New Specialization</h1>
            <p className="text-muted-foreground">
              Create a new course specialization with detailed information
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Progress: {progressPercentage}% ({completedFields}/6 fields completed)
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Specialization created successfully!</p>
                <p className="text-sm text-green-700">Redirecting to specializations list...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-indigo-600" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Specialization Name <span className="text-destructive">*</span></Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Artificial Intelligence, Data Science"
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="code">Specialization Code</Label>
                    <Input
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      placeholder="e.g., AI, DS, ML"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course_id">Associated Course <span className="text-destructive">*</span></Label>
                  <Select value={formData.course_id} onValueChange={(value) => handleSelectChange('course_id', value)}>
                    <SelectTrigger className={errors.course_id ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(course => (
                        <SelectItem key={course.id} value={course.id.toString()}>
                          {course.name} {course.colleges?.name ? `(${course.colleges.name})` : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.course_id && (
                    <p className="text-sm text-destructive flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.course_id}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about">About Specialization</Label>
                  <textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Brief overview of the specialization..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span>Detailed Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Detailed Description</Label>
                  <RichTextEditor
                    value={formData.description}
                    onChange={(value) => handleRichTextChange('description', value)}
                    placeholder="Provide a detailed description of the specialization, curriculum, and learning objectives..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Requirements & Eligibility</Label>
                  <RichTextEditor
                    value={formData.requirements}
                    onChange={(value) => handleRichTextChange('requirements', value)}
                    placeholder="Academic requirements, prerequisites, skills needed..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Career Prospects</Label>
                  <RichTextEditor
                    value={formData.career_prospects}
                    onChange={(value) => handleRichTextChange('career_prospects', value)}
                    placeholder="Career opportunities, job roles, industry prospects..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Placement Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Placement Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="placement_rate">Placement Rate (%)</Label>
                    <Input
                      id="placement_rate"
                      name="placement_rate"
                      type="number"
                      value={formData.placement_rate}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      step="0.1"
                      placeholder="85.5"
                      className={errors.placement_rate ? 'border-destructive' : ''}
                    />
                    {errors.placement_rate && (
                      <p className="text-sm text-destructive flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.placement_rate}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avg_package">Average Package ($)</Label>
                    <Input
                      id="avg_package"
                      name="avg_package"
                      type="number"
                      value={formData.avg_package}
                      onChange={handleChange}
                      min="0"
                      placeholder="75000"
                      className={errors.avg_package ? 'border-destructive' : ''}
                    />
                    {errors.avg_package && (
                      <p className="text-sm text-destructive flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.avg_package}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="top_recruiters">Top Recruiters (JSON format)</Label>
                  <textarea
                    id="top_recruiters"
                    name="top_recruiters"
                    value={formData.top_recruiters}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm font-mono resize-vertical focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder='["Google", "Microsoft", "Amazon", "Apple"]'
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="w-5 h-5 text-purple-600" />
                  <span>Additional Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="research_areas">Research Areas (JSON format)</Label>
                  <textarea
                    id="research_areas"
                    name="research_areas"
                    value={formData.research_areas}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm font-mono resize-vertical focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder='["Machine Learning", "Deep Learning", "Natural Language Processing"]'
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lab_facilities">Lab Facilities (JSON format)</Label>
                  <textarea
                    id="lab_facilities"
                    name="lab_facilities"
                    value={formData.lab_facilities}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm font-mono resize-vertical focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder='["AI Research Lab", "Data Science Lab", "High-Performance Computing"]'
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="syllabus">Syllabus (JSON format)</Label>
                  <textarea
                    id="syllabus"
                    name="syllabus"
                    value={formData.syllabus}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm font-mono resize-vertical focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder='{"semester1": ["Foundations of AI", "Programming"], "semester2": ["ML Algorithms", "Statistics"]}'
                  />
                </div>
              </CardContent>
            </Card>

            {/* Error Display */}
            {errors.submit && (
              <Card className="border-destructive bg-destructive/5">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <p className="text-sm font-medium">{errors.submit}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              size="lg"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Creating Specialization...' : 'Create Specialization'}
            </Button>
          </form>
        </div>

        {/* Sidebar - Preview */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-indigo-600" />
                <span>Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-2">
                  {formData.name || 'Specialization Name'}
                </h3>
                
                {formData.code && (
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    Code: {formData.code}
                  </p>
                )}
                
                <p className="text-sm text-muted-foreground mb-3">
                  {courses.find(c => c.id === parseInt(formData.course_id))?.name || 'Course not selected'}
                </p>
                
                {formData.about && (
                  <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                    {formData.about.substring(0, 150)}
                    {formData.about.length > 150 ? '...' : ''}
                  </p>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {formData.placement_rate && (
                    <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                      {formData.placement_rate}% placed
                    </div>
                  )}
                  
                  {formData.avg_package && (
                    <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      ${parseInt(formData.avg_package).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Completion</span>
                  <span className="font-medium">{progressPercentage}%</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className={formData.name ? 'text-green-600' : 'text-muted-foreground'}>Name</span>
                    <span>{formData.name ? '✓' : '○'}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={formData.course_id ? 'text-green-600' : 'text-muted-foreground'}>Course</span>
                    <span>{formData.course_id ? '✓' : '○'}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={formData.about ? 'text-green-600' : 'text-muted-foreground'}>About</span>
                    <span>{formData.about ? '✓' : '○'}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={formData.description ? 'text-green-600' : 'text-muted-foreground'}>Description</span>
                    <span>{formData.description ? '✓' : '○'}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={formData.placement_rate ? 'text-green-600' : 'text-muted-foreground'}>Placement</span>
                    <span>{formData.placement_rate ? '✓' : '○'}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={formData.avg_package ? 'text-green-600' : 'text-muted-foreground'}>Package</span>
                    <span>{formData.avg_package ? '✓' : '○'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}