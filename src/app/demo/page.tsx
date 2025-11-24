'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Beaker, 
  ArrowRight, 
  AlertTriangle, 
  Sparkles, 
  Bot,
  Search,
  Target,
  CheckCircle,
  ExternalLink 
} from 'lucide-react'

export default function DemoPage() {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null)

  const demos = [
    {
      id: 'ai-search',
      title: 'AI-Powered Search',
      description: 'Natural language university search with intelligent recommendations',
      status: 'ready',
      path: '/demo/ai-search',
      features: ['Natural language queries', 'Smart filtering', 'Contextual results', 'Personalized suggestions']
    },
    {
      id: 'ai-matching',
      title: 'AI University Matching',
      description: 'Comprehensive profile analysis with personalized university recommendations',
      status: 'ready',
      path: '/demo/ai-matching',
      features: ['Profile analysis', 'Admission predictions', 'Personalized insights', 'Custom recommendations']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Demo Warning Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center space-x-2">
          <Beaker className="w-5 h-5" />
          <span className="font-medium">DEMO ENVIRONMENT</span>
          <span className="text-orange-100">•</span>
          <span className="text-sm">Testing AI Features - Not Live on Main Website</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-orange-100 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-orange-600 mr-2" />
            <span className="text-orange-700 font-medium">AdmitVerse AI Demo</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Experience the Future of
            <span className="text-orange-600 block">University Discovery</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Test our cutting-edge AI features before they go live. These demos showcase how artificial intelligence 
            can revolutionize the way students find and match with universities worldwide.
          </p>

          {/* Warning Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="text-left">
                <h3 className="font-medium text-yellow-800">Demo Environment Notice</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  These features are in testing phase. Data may be limited and results are for demonstration purposes only. 
                  Features will be integrated into the main website after successful testing.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Demo Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      {demo.id === 'ai-search' ? (
                        <Search className="w-6 h-6 text-orange-600" />
                      ) : (
                        <Target className="w-6 h-6 text-orange-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{demo.title}</h3>
                      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {demo.status}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{demo.description}</p>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Key Features:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {demo.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    href={demo.path}
                    className="flex-1 bg-orange-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Try Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  
                  <button
                    onClick={() => setSelectedDemo(selectedDemo === demo.id ? null : demo.id)}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Details
                  </button>
                </div>

                {/* Expanded Details */}
                {selectedDemo === demo.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-gray-100"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">Powered by OpenAI GPT-3.5-turbo</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-600">Real-time intelligent processing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">Personalized for each user</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Integration Timeline</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-blue-800" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Phase 1: Demo Development</h3>
                <p className="text-sm text-gray-600">Build and test AI features in isolated environment</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Phase 2: Testing & Refinement</h3>
                <p className="text-sm text-gray-600">Gather feedback, optimize performance, and improve accuracy</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium text-sm">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Phase 3: Production Integration</h3>
                <p className="text-sm text-gray-600">Seamlessly integrate successful features into main website</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Main Site */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to AdmitVerse Main Website</span>
          </Link>
        </div>
      </div>
    </div>
  )
}