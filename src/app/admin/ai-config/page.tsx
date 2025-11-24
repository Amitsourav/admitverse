'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, X, AlertCircle, Brain, Search, Users, FileText, Settings, TestTube } from 'lucide-react'

export default function AIConfigPage() {
  const [aiStatus, setAIStatus] = useState({
    configured: false,
    search: false,
    matching: false,
    sopReview: false,
    loading: true
  })
  const [testResults, setTestResults] = useState<Record<string, any>>({})
  const [isTesting, setIsTesting] = useState(false)

  useEffect(() => {
    checkAIStatus()
  }, [])

  const checkAIStatus = async () => {
    try {
      // Test AI Search
      const searchTest = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'test' })
      })
      const searchResult = await searchTest.json()

      // Test AI Matching
      const matchTest = await fetch('/api/ai-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          academicScore: 80,
          preferredCountries: ['USA'],
          fieldOfStudy: 'Computer Science',
          degreeLevel: 'Masters',
          budget: '$40,000 - $60,000',
          englishTest: 'IELTS',
          englishScore: 7.5,
          workExperience: 2,
          priorities: ['Rankings', 'Cost']
        })
      })
      const matchResult = await matchTest.json()

      // Test SOP Review
      const sopTest = await fetch('/api/ai-sop-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: 'This is a test statement of purpose with enough content to trigger the review process. I am applying for this program because of my passion for learning.'
        })
      })
      const sopResult = await sopTest.json()

      setAIStatus({
        configured: !searchResult.fallbackMode && !matchResult.fallbackMode && !sopResult.fallbackMode,
        search: searchResult.success,
        matching: matchResult.success,
        sopReview: sopResult.success,
        loading: false
      })

      setTestResults({
        search: searchResult,
        matching: matchResult,
        sopReview: sopResult
      })
    } catch (error) {
      console.error('AI status check failed:', error)
      setAIStatus({
        configured: false,
        search: false,
        matching: false,
        sopReview: false,
        loading: false
      })
    }
  }

  const runFullTest = async () => {
    setIsTesting(true)
    
    try {
      // Comprehensive test with real data
      const tests = await Promise.all([
        // Search test
        fetch('/api/ai-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            query: 'best computer science programs in USA for international students' 
          })
        }),
        
        // Matching test
        fetch('/api/ai-match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            academicScore: 85,
            preferredCountries: ['USA', 'Canada'],
            fieldOfStudy: 'Data Science',
            degreeLevel: 'Masters',
            budget: '$50,000 - $70,000',
            englishTest: 'TOEFL',
            englishScore: 105,
            workExperience: 3,
            priorities: ['Research Opportunities', 'Industry Connections']
          })
        }),
        
        // SOP Review test
        fetch('/api/ai-sop-review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: 'I am passionate about pursuing a Master\'s degree in Data Science because of my strong background in mathematics and computer science. During my undergraduate studies, I worked on several machine learning projects that sparked my interest in artificial intelligence. My goal is to contribute to the field of AI research while developing practical solutions for real-world problems.',
            targetProgram: 'MS in Data Science',
            targetUniversity: 'Stanford University'
          })
        })
      ])

      const results = await Promise.all(tests.map(t => t.json()))
      
      setTestResults({
        search: results[0],
        matching: results[1],
        sopReview: results[2]
      })
      
    } catch (error) {
      console.error('Full test failed:', error)
    } finally {
      setIsTesting(false)
    }
  }

  if (aiStatus.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Checking AI configuration...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Brain className="text-blue-600" />
            AI Configuration Dashboard
          </h1>
          <p className="text-gray-600">Monitor and test OpenAI integration for AdmitVerse</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatusCard
            title="OpenAI Configured"
            status={aiStatus.configured}
            icon={<Settings />}
            description="API key and client setup"
          />
          <StatusCard
            title="AI Search"
            status={aiStatus.search}
            icon={<Search />}
            description="Intelligent university search"
          />
          <StatusCard
            title="AI Matching"
            status={aiStatus.matching}
            icon={<Users />}
            description="Personalized recommendations"
          />
          <StatusCard
            title="SOP Review"
            status={aiStatus.sopReview}
            icon={<FileText />}
            description="Essay analysis & feedback"
          />
        </div>

        {/* Configuration Instructions */}
        {!aiStatus.configured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-yellow-600 w-6 h-6" />
              <h2 className="text-xl font-semibold text-yellow-800">Setup Required</h2>
            </div>
            <div className="text-yellow-800 space-y-4">
              <p className="mb-4">To enable AI features, follow these steps:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Get your OpenAI API key from <a href="https://platform.openai.com/api-keys" target="_blank" className="text-blue-600 underline">OpenAI Platform</a></li>
                <li>Add the API key to your <code className="bg-yellow-100 px-2 py-1 rounded">.env</code> file:
                  <pre className="bg-yellow-100 p-3 rounded mt-2 text-sm">
                    OPENAI_API_KEY="sk-your-actual-api-key-here"
                  </pre>
                </li>
                <li>Restart your development server: <code className="bg-yellow-100 px-2 py-1 rounded">npm run dev</code></li>
                <li>Refresh this page to see updated status</li>
              </ol>
            </div>
          </motion.div>
        )}

        {/* Test Results */}
        {aiStatus.configured && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                <TestTube className="text-blue-800" />
                AI Testing
              </h2>
              <button
                onClick={runFullTest}
                disabled={isTesting}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  isTesting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isTesting ? 'Testing...' : 'Run Full Test'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <TestResultCard
                title="AI Search Test"
                result={testResults.search}
                example="Query: 'best computer science programs'"
              />
              <TestResultCard
                title="AI Matching Test"
                result={testResults.matching}
                example="Profile: Data Science, 85% academic score"
              />
              <TestResultCard
                title="SOP Review Test"
                result={testResults.sopReview}
                example="Sample statement analysis"
              />
            </div>
          </div>
        )}

        {/* Features Overview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI Features Overview</h2>
          <div className="space-y-6">
            <FeatureCard
              title="Intelligent Search"
              description="Natural language understanding for university and program search"
              endpoint="/api/ai-search"
              features={[
                'Natural language query processing',
                'Context-aware search results',
                'Smart filtering and recommendations',
                'Fallback to keyword search if AI unavailable'
              ]}
            />
            <FeatureCard
              title="University Matching"
              description="Personalized university recommendations based on student profiles"
              endpoint="/api/ai-match"
              features={[
                'Academic profile analysis',
                'Budget and location preferences',
                'Admission probability assessment',
                'Scholarship opportunity identification'
              ]}
            />
            <FeatureCard
              title="SOP Review"
              description="AI-powered Statement of Purpose analysis and feedback"
              endpoint="/api/ai-sop-review"
              features={[
                'Structure and content analysis',
                'Grammar and style feedback',
                'Improvement recommendations',
                'Program-specific guidance'
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusCard({ title, status, icon, description }: {
  title: string
  status: boolean
  icon: React.ReactNode
  description: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg p-6 shadow-md"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-gray-600">{icon}</div>
        {status ? (
          <Check className="w-6 h-6 text-blue-800" />
        ) : (
          <X className="w-6 h-6 text-red-600" />
        )}
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div className={`mt-3 px-3 py-1 rounded-full text-xs font-medium ${
        status ? 'bg-blue-100 text-blue-900' : 'bg-red-100 text-red-700'
      }`}>
        {status ? 'Active' : 'Inactive'}
      </div>
    </motion.div>
  )
}

function TestResultCard({ title, result, example }: {
  title: string
  result: any
  example: string
}) {
  if (!result) return null

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-3">{example}</p>
      
      <div className="space-y-2">
        <div className={`flex items-center gap-2 text-sm ${
          result.success ? 'text-blue-800' : 'text-red-600'
        }`}>
          {result.success ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
          {result.success ? 'Success' : 'Failed'}
        </div>
        
        {result.aiPowered !== undefined && (
          <div className={`flex items-center gap-2 text-sm ${
            result.aiPowered ? 'text-blue-600' : 'text-yellow-600'
          }`}>
            <Brain className="w-4 h-4" />
            {result.aiPowered ? 'AI-Powered' : 'Fallback Mode'}
          </div>
        )}
        
        {result.totalResults && (
          <div className="text-sm text-gray-600">
            Results: {result.totalResults}
          </div>
        )}
      </div>
    </div>
  )
}

function FeatureCard({ title, description, endpoint, features }: {
  title: string
  description: string
  endpoint: string
  features: string[]
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <code className="text-sm bg-gray-100 px-3 py-1 rounded">{endpoint}</code>
      </div>
      
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-blue-800 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}