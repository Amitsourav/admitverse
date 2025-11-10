'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import { 
  Bot, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  MapPin, 
  GraduationCap,
  TrendingUp,
  Award,
  Globe,
  DollarSign,
  Clock,
  Target,
  Lightbulb,
  BookOpen,
  Users,
  Zap
} from 'lucide-react'

interface StudentProfile {
  academicScore: number
  preferredCountries: string[]
  fieldOfStudy: string
  degreeLevel: string
  budget: string
  englishTest: string
  englishScore: number
  workExperience: number
  priorities: string[]
}

interface UniversityMatch {
  id: string
  name: string
  location: string
  country: string
  ranking: number
  matchScore: number
  tuitionFee: string
  programs: string[]
  highlights: string[]
  admissionChance: string
  imageUrl: string
}

export default function AIMatchingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [profile, setProfile] = useState<StudentProfile>({
    academicScore: 0,
    preferredCountries: [],
    fieldOfStudy: '',
    degreeLevel: '',
    budget: '',
    englishTest: '',
    englishScore: 0,
    workExperience: 0,
    priorities: []
  })
  const [matches, setMatches] = useState<UniversityMatch[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)

  const steps = [
    'Academic Background',
    'Preferred Countries',
    'Field of Study',
    'Budget & Tests',
    'Priorities',
    'Results'
  ]

  const countries = [
    'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 
    'Netherlands', 'Ireland', 'New Zealand', 'Singapore', 'Sweden', 'Norway'
  ]

  const fieldsOfStudy = [
    'Computer Science', 'Business Administration', 'Engineering', 'Medicine',
    'Data Science', 'Psychology', 'Economics', 'Arts & Design', 'Law',
    'Environmental Science', 'International Relations', 'Education'
  ]

  const degreeLevels = ['Bachelor\'s', 'Master\'s', 'PhD', 'MBA']

  const budgetRanges = [
    'Under $20,000', '$20,000 - $40,000', '$40,000 - $60,000', 
    '$60,000 - $80,000', '$80,000+', 'No specific budget'
  ]

  const priorities = [
    'University Ranking', 'Tuition Cost', 'Location', 'Program Quality',
    'Research Opportunities', 'Campus Life', 'Career Services', 'Diversity',
    'Industry Connections', 'Scholarship Availability'
  ]

  // AI-powered matching algorithm using OpenAI
  const generateMatches = async (studentProfile: StudentProfile): Promise<{matches: UniversityMatch[], analysis?: any}> => {
    try {
      const response = await fetch('/api/ai-match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentProfile)
      })

      const data = await response.json()
      
      if (data.success && data.matches) {
        // Transform the response to match our interface
        const matches = data.matches.map((match: any) => ({
          id: match.id,
          name: match.name,
          location: match.location,
          country: match.country,
          ranking: match.ranking,
          matchScore: match.matchScore,
          tuitionFee: match.tuitionFee,
          programs: match.programs || [],
          highlights: match.highlights || match.reasons || [],
          admissionChance: match.admissionChance,
          imageUrl: match.image || '/universities/default.jpg'
        }))
        
        return {
          matches,
          analysis: data.analysis || null
        }
      }
      
      // Fallback to mock data if API fails
      throw new Error('API failed, using fallback')
    } catch (error) {
      console.error('Error fetching AI matches:', error)
      
      // Fallback mock universities
      const mockUniversities: UniversityMatch[] = [
      {
        id: '1',
        name: 'Stanford University',
        location: 'Stanford, CA',
        country: 'USA',
        ranking: 2,
        matchScore: 95,
        tuitionFee: '$56,169/year',
        programs: ['Computer Science', 'Data Science', 'AI & Machine Learning'],
        highlights: ['Top-tier research', 'Silicon Valley connections', 'Innovation hub'],
        admissionChance: 'Competitive',
        imageUrl: '/universities/stanford.jpg'
      },
      {
        id: '2',
        name: 'University of Toronto',
        location: 'Toronto, ON',
        country: 'Canada',
        ranking: 18,
        matchScore: 88,
        tuitionFee: '$58,160/year',
        programs: ['Computer Science', 'Engineering', 'Business'],
        highlights: ['Excellent research', 'Diverse community', 'Post-grad work permit'],
        admissionChance: 'Good',
        imageUrl: '/universities/toronto.jpg'
      },
      {
        id: '3',
        name: 'Technical University of Munich',
        location: 'Munich',
        country: 'Germany',
        ranking: 50,
        matchScore: 82,
        tuitionFee: '€3,000/year',
        programs: ['Engineering', 'Computer Science', 'Technology Management'],
        highlights: ['Low tuition', 'Strong industry ties', 'High employment rate'],
        admissionChance: 'Very Good',
        imageUrl: '/universities/tum.jpg'
      },
      {
        id: '4',
        name: 'University of Melbourne',
        location: 'Melbourne, VIC',
        country: 'Australia',
        ranking: 33,
        matchScore: 79,
        tuitionFee: '$45,824/year',
        programs: ['Computer Science', 'Information Technology', 'Data Science'],
        highlights: ['Research excellence', 'Student experience', 'Global recognition'],
        admissionChance: 'Good',
        imageUrl: '/universities/melbourne.jpg'
      }
    ]

    // Simple matching logic based on profile
    return mockUniversities.filter(uni => {
      if (studentProfile.preferredCountries.length > 0) {
        return studentProfile.preferredCountries.includes(uni.country)
      }
      return true
    }).map(uni => ({
      ...uni,
      matchScore: Math.max(70, uni.matchScore - Math.random() * 15)
    })).sort((a, b) => b.matchScore - a.matchScore)
    
      return {
        matches: mockUniversities,
        analysis: null
      }
    }
    
    return { matches: [], analysis: null }
  }

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        // Last step before results
        setIsAnalyzing(true)
        const { matches, analysis } = await generateMatches(profile)
        setMatches(matches)
        if (analysis) {
          setAiAnalysis(analysis)
        }
        setIsAnalyzing(false)
        setShowResults(true)
      }
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateProfile = (field: keyof StudentProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (field: keyof StudentProfile, item: string) => {
    const currentArray = profile[field] as string[]
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item]
    updateProfile(field, newArray)
  }

  return (
    <>
      <TopBanner />
      <Navigation />
      <FloatingActions />
      <div className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-20">
        
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-purple-100 rounded-full px-4 py-2 mb-6">
                <Bot className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-purple-700 font-medium">AI-Powered University Matching</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Find Your Perfect
                <span className="text-purple-600 block">University Match</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Our advanced AI analyzes your profile, preferences, and goals to recommend the best universities worldwide that match your unique needs.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-8">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-purple-500" />
                  <span>AI-Powered Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-purple-500" />
                  <span>Global Universities</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-purple-500" />
                  <span>Personalized Results</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {!showResults ? (
          /* Assessment Form */
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {steps.map((step, index) => (
                    <span 
                      key={step}
                      className={`text-xs ${index <= currentStep ? 'text-purple-600' : 'text-gray-400'}`}
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>

              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                {/* Step Content */}
                {currentStep === 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Academic Background</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Academic Score (GPA/Percentage)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={profile.academicScore}
                          onChange={(e) => updateProfile('academicScore', parseFloat(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter your GPA or percentage"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Degree Level
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {degreeLevels.map(level => (
                            <button
                              key={level}
                              onClick={() => updateProfile('degreeLevel', level)}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                profile.degreeLevel === level
                                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                                  : 'border-gray-200 hover:border-purple-300'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferred Countries</h2>
                    <p className="text-gray-600 mb-6">Select the countries where you'd like to study (you can choose multiple):</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {countries.map(country => (
                        <button
                          key={country}
                          onClick={() => toggleArrayItem('preferredCountries', country)}
                          className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center ${
                            profile.preferredCountries.includes(country)
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <span>{country}</span>
                          {profile.preferredCountries.includes(country) && (
                            <CheckCircle className="w-4 h-4 ml-2" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Field of Study</h2>
                    <p className="text-gray-600 mb-6">What subject area are you most interested in?</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {fieldsOfStudy.map(field => (
                        <button
                          key={field}
                          onClick={() => updateProfile('fieldOfStudy', field)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            profile.fieldOfStudy === field
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          {field}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Budget & Test Scores</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Annual Budget
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {budgetRanges.map(budget => (
                            <button
                              key={budget}
                              onClick={() => updateProfile('budget', budget)}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                profile.budget === budget
                                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                                  : 'border-gray-200 hover:border-purple-300'
                              }`}
                            >
                              {budget}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          English Test
                        </label>
                        <select
                          value={profile.englishTest}
                          onChange={(e) => updateProfile('englishTest', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="">Select Test</option>
                          <option value="IELTS">IELTS</option>
                          <option value="TOEFL">TOEFL</option>
                          <option value="PTE">PTE</option>
                          <option value="Duolingo">Duolingo</option>
                        </select>
                      </div>
                      
                      {profile.englishTest && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {profile.englishTest} Score
                          </label>
                          <input
                            type="number"
                            value={profile.englishScore}
                            onChange={(e) => updateProfile('englishScore', parseFloat(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            placeholder={`Enter your ${profile.englishTest} score`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Priorities</h2>
                    <p className="text-gray-600 mb-6">What factors are most important to you? (Select up to 5):</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {priorities.map(priority => (
                        <button
                          key={priority}
                          onClick={() => toggleArrayItem('priorities', priority)}
                          disabled={!profile.priorities.includes(priority) && profile.priorities.length >= 5}
                          className={`p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between ${
                            profile.priorities.includes(priority)
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : profile.priorities.length >= 5
                              ? 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <span>{priority}</span>
                          {profile.priorities.includes(priority) && (
                            <CheckCircle className="w-5 h-5" />
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                      Selected: {profile.priorities.length}/5
                    </p>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="text-center">
                    {isAnalyzing ? (
                      <div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 mx-auto mb-6"
                        >
                          <Bot className="w-16 h-16 text-purple-600" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                          Analyzing Your Profile...
                        </h2>
                        <p className="text-gray-600 mb-6">
                          Our AI is processing your information to find the best university matches
                        </p>
                        <div className="max-w-md mx-auto">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Processing...</span>
                            <span className="text-sm">85%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div 
                              className="bg-purple-600 h-2 rounded-full"
                              animate={{ width: "85%" }}
                              transition={{ duration: 3 }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to Find Your Matches!</h2>
                        <p className="text-gray-600 mb-6">
                          Click below to start the AI analysis and discover universities that perfectly match your profile.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      currentStep === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Back
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={isAnalyzing}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all flex items-center space-x-2 disabled:opacity-50"
                  >
                    <span>{currentStep === steps.length - 2 ? 'Find Matches' : 'Next'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
        ) : (
          /* Results Section */
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center bg-green-100 rounded-full px-4 py-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-700 font-medium">Analysis Complete</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Your Perfect University Matches
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Based on your profile, we've found {matches.length} universities that are excellent matches for your goals and preferences.
                </p>
              </motion.div>

              {/* AI Analysis Insights */}
              {aiAnalysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-6 mb-8"
                >
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Bot className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
                      <p className="text-gray-700">{aiAnalysis.overall}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    {aiAnalysis.recommendations && aiAnalysis.recommendations.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <Target className="w-4 h-4 text-purple-500 mr-2" />
                          Key Recommendations
                        </h4>
                        <ul className="space-y-1">
                          {aiAnalysis.recommendations.slice(0, 3).map((rec: string, idx: number) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {aiAnalysis.nextSteps && aiAnalysis.nextSteps.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <Zap className="w-4 h-4 text-purple-500 mr-2" />
                          Next Steps
                        </h4>
                        <ul className="space-y-1">
                          {aiAnalysis.nextSteps.slice(0, 3).map((step: string, idx: number) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                              <ArrowRight className="w-3 h-3 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {aiAnalysis.alternatives && aiAnalysis.alternatives.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-purple-100">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Alternative options to consider:</span> {aiAnalysis.alternatives.join(', ')}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              <div className="grid gap-6">
                {matches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-1/4">
                        <div className="aspect-video bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {match.name}
                        </div>
                      </div>
                      
                      <div className="lg:w-3/4">
                        <div className="flex flex-col lg:flex-row justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{match.name}</h3>
                            <div className="flex items-center text-gray-600 mb-2">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{match.location}, {match.country}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center">
                                <TrendingUp className="w-4 h-4 text-gray-500 mr-1" />
                                <span>Rank #{match.ranking}</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
                                <span>{match.tuitionFee}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center justify-end mb-2">
                              <Star className="w-5 h-5 text-purple-500 mr-1" />
                              <span className="text-2xl font-bold text-purple-600">
                                {match.matchScore}%
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">Match Score</span>
                            <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                              match.admissionChance === 'Very Good' ? 'bg-green-100 text-green-700' :
                              match.admissionChance === 'Good' ? 'bg-blue-100 text-blue-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {match.admissionChance} Chance
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Relevant Programs</h4>
                            <div className="flex flex-wrap gap-2">
                              {match.programs.map(program => (
                                <span key={program} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                                  {program}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Key Highlights</h4>
                            <div className="space-y-1">
                              {match.highlights.map(highlight => (
                                <div key={highlight} className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                                  <span>{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                            View Details
                          </button>
                          <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
                            Add to Shortlist
                          </button>
                          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                            Compare
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <button
                  onClick={() => {
                    setCurrentStep(0)
                    setShowResults(false)
                    setMatches([])
                    setAiAnalysis(null)
                    setProfile({
                      academicScore: 0,
                      preferredCountries: [],
                      fieldOfStudy: '',
                      degreeLevel: '',
                      budget: '',
                      englishTest: '',
                      englishScore: 0,
                      workExperience: 0,
                      priorities: []
                    })
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Start New Assessment
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  )
}