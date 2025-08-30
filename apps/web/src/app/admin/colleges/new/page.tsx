'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, CheckCircle, ArrowLeft, Building, MapPin, Award, FileText, Save } from 'lucide-react'

export default function AddCollegePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
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
    if (!formData.shortName.trim()) newErrors.shortName = 'Short name is required'
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSuccess(true)
      setTimeout(() => {
        router.push('/admin/colleges')
      }, 2000)
    } catch (error) {
      console.error('Error creating college:', error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
          <p className="text-gray-600">College has been added successfully.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/colleges"
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-100"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Add New College
                  </h1>
                </div>
                <p className="text-gray-600 font-medium">
                  Create a comprehensive profile for a new educational institution
                </p>
              </div>
            </div>
            <Link
              href="/admin/colleges"
              className="inline-flex items-center px-6 py-3 border border-gray-200 rounded-xl shadow-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg">
                <Building className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  College Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-2 block w-full rounded-xl shadow-sm sm:text-sm px-4 py-3 transition-all duration-200 ${
                    errors.name
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                      : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 focus:bg-white'
                  }`}
                  placeholder="e.g., Harvard University"
                />
                {errors.name && (
                  <div className="mt-1 flex items-center text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="shortName" className="block text-sm font-medium text-gray-700">
                  Short Name *
                </label>
                <input
                  type="text"
                  name="shortName"
                  id="shortName"
                  required
                  value={formData.shortName}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  id="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.edu"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="establishedYear" className="block text-sm font-medium text-gray-700">
                  Established Year
                </label>
                <input
                  type="number"
                  name="establishedYear"
                  id="establishedYear"
                  value={formData.establishedYear}
                  onChange={handleChange}
                  min="1000"
                  max={new Date().getFullYear()}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Institution Type *
                </label>
                <select
                  name="type"
                  id="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Type</option>
                  <option value="Public">Public University</option>
                  <option value="Private">Private University</option>
                  <option value="Community">Community College</option>
                  <option value="Technical">Technical Institute</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Location</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country *
                </label>
                <select
                  name="country"
                  id="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Country</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State/Province
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Academic Information</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="ranking" className="block text-sm font-medium text-gray-700">
                  Global Ranking
                </label>
                <input
                  type="number"
                  name="ranking"
                  id="ranking"
                  value={formData.ranking}
                  onChange={handleChange}
                  min="1"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="acceptanceRate" className="block text-sm font-medium text-gray-700">
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
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Description</h2>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                College Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter a brief description of the college..."
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium text-gray-600">* Required fields</p>
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => router.push('/admin/colleges')}
                  disabled={loading}
                  className="px-6 py-3 border border-gray-200 rounded-xl shadow-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Add College
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}