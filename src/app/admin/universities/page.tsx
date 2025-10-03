'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useUniversities } from '@/hooks/useUniversities'
import { University } from '@/lib/university-data'

export default function AdminUniversitiesPage() {
  const { universities, loading, error, refetch } = useUniversities()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingUniversity, setEditingUniversity] = useState<University | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    location: '',
    country: '',
    ranking: 1,
    students: '',
    rating: 4.0,
    tuition: '',
    description: '',
    image: ''
  })

  const handleAddUniversity = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/universities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          programs: [], // Start with empty programs array
          highlights: [],
          facilities: []
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert('University added successfully!')
        setShowAddForm(false)
        resetForm()
        refetch() // Refresh the list
      } else {
        alert('Error: ' + result.error)
      }
    } catch (error) {
      alert('Failed to add university')
    }
  }

  const handleEditUniversity = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUniversity) return
    
    try {
      const response = await fetch(`/api/universities/${editingUniversity.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        alert('University updated successfully!')
        setEditingUniversity(null)
        resetForm()
        refetch() // Refresh the list
      } else {
        alert('Error: ' + result.error)
      }
    } catch (error) {
      alert('Failed to update university')
    }
  }

  const handleDeleteUniversity = async (university: University) => {
    if (!confirm(`Are you sure you want to delete ${university.name}?`)) {
      return
    }

    try {
      const response = await fetch(`/api/universities/${university.slug}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.success) {
        alert('University deleted successfully!')
        refetch() // Refresh the list
      } else {
        alert('Error: ' + result.error)
      }
    } catch (error) {
      alert('Failed to delete university')
    }
  }

  const startEdit = (university: University) => {
    setEditingUniversity(university)
    setFormData({
      name: university.name,
      slug: university.slug,
      location: university.location,
      country: university.country,
      ranking: university.ranking,
      students: university.students,
      rating: university.rating,
      tuition: university.tuition,
      description: university.description,
      image: university.image
    })
    setShowAddForm(false)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      location: '',
      country: '',
      ranking: 1,
      students: '',
      rating: 4.0,
      tuition: '',
      description: '',
      image: ''
    })
  }

  const cancelEdit = () => {
    setEditingUniversity(null)
    resetForm()
  }

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">University Management</h1>
          <div className="space-x-3">
            {editingUniversity && (
              <button
                onClick={cancelEdit}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel Edit
              </button>
            )}
            <button
              onClick={() => {
                setShowAddForm(!showAddForm)
                if (editingUniversity) {
                  cancelEdit()
                }
              }}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              {showAddForm ? 'Cancel' : 'Add New University'}
            </button>
          </div>
        </div>

        {/* Add/Edit University Form */}
        {(showAddForm || editingUniversity) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingUniversity ? `Edit ${editingUniversity.name}` : 'Add New University'}
            </h2>
            <form onSubmit={editingUniversity ? handleEditUniversity : handleAddUniversity} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">University Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ 
                      ...formData, 
                      name: e.target.value,
                      slug: generateSlug(e.target.value)
                    })
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug (Auto-generated)</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="City, State"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select Country</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Global Ranking</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.ranking}
                  onChange={(e) => setFormData({ ...formData, ranking: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Students</label>
                <input
                  type="text"
                  required
                  value={formData.students}
                  onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., 25,000+"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tuition</label>
                <input
                  type="text"
                  value={formData.tuition}
                  onChange={(e) => setFormData({ ...formData, tuition: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., $55,000/year"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="Brief description of the university..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
                >
                  {editingUniversity ? 'Update University' : 'Add University'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Universities List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Current Universities ({universities.length})</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p>Loading universities...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">
              Error: {error}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ranking</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {universities.map((university) => (
                    <tr key={university.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{university.name}</div>
                        <div className="text-sm text-gray-500">{university.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {university.location}, {university.country}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        #{university.ranking}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {university.students}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ⭐ {university.rating}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <a
                          href={`/universities/${university.slug}`}
                          target="_blank"
                          className="text-emerald-600 hover:text-emerald-900"
                        >
                          View
                        </a>
                        <button 
                          onClick={() => startEdit(university)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteUniversity(university)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}