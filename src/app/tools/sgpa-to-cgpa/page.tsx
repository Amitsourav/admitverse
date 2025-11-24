'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import { Calculator, GraduationCap, BookOpen, Target, Plus, Minus, Info, Download } from 'lucide-react'

interface Semester {
  id: number
  sgpa: string
  credits: string
}

export default function SGPAToCGPAPage() {
  const [scale, setScale] = useState('10')
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 1, sgpa: '', credits: '' },
    { id: 2, sgpa: '', credits: '' }
  ])
  const [result, setResult] = useState<{ cgpa: number; totalCredits: number } | null>(null)

  const addSemester = () => {
    const newId = Math.max(...semesters.map(s => s.id)) + 1
    setSemesters([...semesters, { id: newId, sgpa: '', credits: '' }])
  }

  const removeSemester = (id: number) => {
    if (semesters.length > 2) {
      setSemesters(semesters.filter(s => s.id !== id))
    }
  }

  const updateSemester = (id: number, field: 'sgpa' | 'credits', value: string) => {
    setSemesters(semesters.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ))
  }

  const calculateCGPA = () => {
    const validSemesters = semesters.filter(s => s.sgpa && s.credits)
    
    if (validSemesters.length === 0) return

    let totalGradePoints = 0
    let totalCredits = 0

    validSemesters.forEach(semester => {
      const sgpa = parseFloat(semester.sgpa)
      const credits = parseFloat(semester.credits)
      
      if (!isNaN(sgpa) && !isNaN(credits)) {
        totalGradePoints += sgpa * credits
        totalCredits += credits
      }
    })

    if (totalCredits > 0) {
      const cgpa = totalGradePoints / totalCredits
      setResult({ cgpa: Math.round(cgpa * 100) / 100, totalCredits })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    calculateCGPA()
  }

  const getMaxValue = () => {
    switch (scale) {
      case '4': return 4.0
      case '5': return 5.0
      case '10': return 10.0
      default: return 10.0
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <TopBanner />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-6"
          >
            <GraduationCap className="w-14 h-14 text-indigo-600" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SGPA to CGPA Converter
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Calculate your Cumulative Grade Point Average (CGPA) from your Semester Grade Point Averages (SGPA)
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <Calculator className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">3 Scales</h3>
              <p className="text-gray-600">4.0, 5.0 & 10.0 Point</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">Credit-based</h3>
              <p className="text-gray-600">Weighted Calculation</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">Accurate</h3>
              <p className="text-gray-600">Precise Results</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your CGPA</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grading Scale *</label>
                  <select
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="10">10.0 Point Scale</option>
                    <option value="4">4.0 Point Scale</option>
                    <option value="5">5.0 Point Scale</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Semester Details</h3>
                    <button
                      type="button"
                      onClick={addSemester}
                      className="flex items-center gap-2 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Semester
                    </button>
                  </div>

                  {semesters.map((semester, index) => (
                    <motion.div
                      key={semester.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Semester {index + 1} SGPA *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max={getMaxValue()}
                          value={semester.sgpa}
                          onChange={(e) => updateSemester(semester.id, 'sgpa', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`0.00 - ${getMaxValue()}`}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Credits *
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          min="1"
                          max="50"
                          value={semester.credits}
                          onChange={(e) => updateSemester(semester.id, 'credits', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Credits"
                          required
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removeSemester(semester.id)}
                          disabled={semesters.length <= 2}
                          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Calculate CGPA
                </motion.button>
              </form>
            </motion.div>

            {/* Results & Formula */}
            <div className="space-y-8">
              {/* Result */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your CGPA</h2>
                
                {!result ? (
                  <div className="text-center py-12">
                    <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your SGPA and credits to calculate CGPA</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-xl p-6 text-center">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Your CGPA</h3>
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {result.cgpa}
                      </div>
                      <div className="text-gray-600">
                        Out of {getMaxValue()} Point Scale
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Summary</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Total Semesters:</span>
                          <span>{semesters.filter(s => s.sgpa && s.credits).length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Credits:</span>
                          <span>{result.totalCredits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Grading Scale:</span>
                          <span>{scale}.0 Point</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Result
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Formula Explanation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-50 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Info className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-blue-900">How CGPA is Calculated</h3>
                </div>
                
                <div className="space-y-4 text-blue-800">
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-mono text-sm text-center">
                      CGPA = Σ(SGPA × Credits) / Σ(Credits)
                    </p>
                  </div>
                  
                  <div className="text-sm space-y-2">
                    <p><strong>Where:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>SGPA = Semester Grade Point Average</li>
                      <li>Credits = Credit hours for each semester</li>
                      <li>Σ = Sum of all semesters</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm"><strong>Example:</strong></p>
                    <p className="text-sm">Sem 1: SGPA 8.5, Credits 20</p>
                    <p className="text-sm">Sem 2: SGPA 9.0, Credits 22</p>
                    <p className="text-sm font-mono mt-2">
                      CGPA = (8.5×20 + 9.0×22) / (20+22) = 8.76
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Calculator,
                title: 'Multiple Scales',
                desc: 'Support for 4.0, 5.0, and 10.0 point grading scales used by different universities'
              },
              {
                icon: BookOpen,
                title: 'Credit Weighted',
                desc: 'Accurate calculation considering credit hours for each semester'
              },
              {
                icon: Target,
                title: 'Instant Results',
                desc: 'Get your CGPA instantly with detailed breakdown and explanations'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white rounded-xl p-6 shadow-lg"
              >
                <item.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}