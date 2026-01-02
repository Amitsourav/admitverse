'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import { Award, Users, Globe, Target, Heart, Shield, Zap, Star, BookOpen, Rocket, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import AnimatedCounter from '@/components/AnimatedCounter'

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isManualClick, setIsManualClick] = useState(false)
  const [slideDirection, setSlideDirection] = useState(1) // 1 for right-to-left, -1 for left-to-right

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setIsManualClick(false)
        setSlideDirection(1) // Auto progression always goes forward
        setCurrentSlide((prev) => (prev + 1) % whyChooseUs.length)
      }, 4000) // 4 seconds per slide

      return () => clearInterval(interval)
    }
  }, [isPaused])

  const handleSlideClick = (index: number) => {
    if (index === currentSlide) return // Don't change if same slide
    
    setIsManualClick(true)
    // Set direction FIRST, then change slide
    if (index > currentSlide) {
      setSlideDirection(1) // Going forward (right-to-left)
    } else {
      setSlideDirection(-1) // Going backward (left-to-right)
    }
    
    // Small delay to ensure direction is set before slide change
    setTimeout(() => {
      setCurrentSlide(index)
    }, 10)
  }

  const stats = [
    { value: '25000', label: 'Students Guided', suffix: '+' },
    { value: '500', label: 'Partner Universities', suffix: '+' },
    { value: '50', label: 'Countries Covered', suffix: '+' },
    { value: '95', label: 'Success Rate', suffix: '%' }
  ]

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Student-First Approach',
      description: 'Every decision we make prioritizes the success and well-being of our students.',
      expandedContent: {
        details: 'We believe that students are at the heart of everything we do. Our team of dedicated counselors works tirelessly to understand each student\'s unique aspirations, strengths, and challenges.',
        benefits: [
          'Personalized counseling sessions',
          '24/7 student support hotline',
          'Regular progress tracking',
          'Mental health and wellness support'
        ],
        impact: '98% student satisfaction rate'
      }
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Integrity & Trust',
      description: 'We build lasting relationships through transparency and honest guidance.',
      expandedContent: {
        details: 'Trust forms the foundation of our relationships. We provide honest assessments, transparent pricing, and ethical guidance throughout your education journey.',
        benefits: [
          'No hidden fees or charges',
          'Honest admission probability assessments',
          'Transparent application tracking',
          'Ethical counseling practices'
        ],
        impact: '95% client trust rating'
      }
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology to simplify the admission process.',
      expandedContent: {
        details: 'Our AI-powered platform revolutionizes the university selection process by analyzing thousands of data points to find your perfect academic match.',
        benefits: [
          'AI-driven university matching',
          'Automated application tracking',
          'Smart deadline reminders',
          'Virtual reality campus tours'
        ],
        impact: '200+ technology features'
      }
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Global Community',
      description: 'Creating a supportive network of students, alumni, and education partners.',
      expandedContent: {
        details: 'Join a thriving community of over 25,000 students and alumni from 150+ countries. Connect, collaborate, and grow together in your educational journey.',
        benefits: [
          'Global student mentorship programs',
          'Alumni networking events',
          'Cultural exchange opportunities',
          'Professional development workshops'
        ],
        impact: '25,000+ community members'
      }
    }
  ]

  const whyChooseUs = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Industry Expertise',
      description: 'Over 15 years of experience helping students achieve their international education dreams with a proven track record of success.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Network',
      description: 'Partnerships with 500+ top-ranked universities across 50+ countries, providing you with unlimited opportunities.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Personalized Guidance',
      description: 'Dedicated counselors who understand your unique goals and provide tailored advice at every step of your journey.'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'End-to-End Support',
      description: 'From university selection to visa assistance, we handle everything so you can focus on your dreams.'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Success Stories',
      description: 'Join thousands of successful students who have transformed their careers through our guidance.'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Technology-Driven',
      description: 'AI-powered tools and digital platforms that make your application process smooth and efficient.'
    }
  ]


  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner />
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 bg-gradient-to-br from-blue-600 via-blue-800 to-blue-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 3 + 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About{" "}
              <motion.span
                className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                AdmitVerse
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-blue-50 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Empowering students worldwide to achieve their dreams of international education through expert guidance and innovative technology
            </motion.p>
            
            {/* Scroll Indicator */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-white/70 text-sm"
              >
                <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto mb-2">
                  <motion.div
                    className="w-1 h-2 bg-white/70 rounded-full mx-auto mt-2"
                    animate={{ y: [0, 16, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </div>
                Scroll to learn more
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-gray-50 to-blue-50 relative overflow-hidden">
        {/* Animated Geometric Background */}
        <div className="absolute inset-0">
          {/* Flowing Lines */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
              style={{
                width: `${Math.random() * 600 + 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [-1000, 1000],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 8 + 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
          
          {/* Glowing Orbs */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 1, 0.3],
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
              }}
              transition={{
                duration: Math.random() * 6 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our{" "}
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Foundation
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Built on strong principles and driven by a clear vision for the future
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission - Tilted Perspective Card */}
            <motion.div
              initial={{ opacity: 0, rotateY: -30, x: -100 }}
              whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="group relative"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-blue-200 shadow-2xl overflow-hidden"
                whileHover={{ 
                  rotateY: 5,
                  rotateX: -5,
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Glowing Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-blue-500/20 rounded-3xl"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
                
                <motion.div 
                  className="relative z-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center text-black mb-6 shadow-lg shadow-blue-400/30"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Target className="w-10 h-10" />
                </motion.div>
                
                <motion.h3 
                  className="relative z-10 text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Our Mission
                </motion.h3>
                
                <motion.p 
                  className="relative z-10 text-gray-700 text-lg leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  To democratize access to international education by providing comprehensive, 
                  personalized guidance that empowers every student to pursue their academic 
                  dreams, regardless of their background or circumstances.
                </motion.p>
                
                {/* Glowing Key Points */}
                <motion.div 
                  className="relative z-10 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {['Comprehensive guidance', 'Personalized approach', 'Equal opportunities'].map((point, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center group/item"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-3 h-3 bg-blue-400 rounded-full mr-4 shadow-lg shadow-blue-400/50 group-hover/item:shadow-blue-400/80 transition-all"></div>
                      <span className="text-gray-600 group-hover/item:text-blue-600 transition-colors">{point}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Vision - Tilted Perspective Card */}
            <motion.div
              initial={{ opacity: 0, rotateY: 30, x: 100 }}
              whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-blue-200 shadow-2xl overflow-hidden"
                whileHover={{ 
                  rotateY: -5,
                  rotateX: -5,
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Glowing Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-indigo-500/20 rounded-3xl"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
                
                <motion.div 
                  className="relative z-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl flex items-center justify-center text-black mb-6 shadow-lg shadow-blue-400/30"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Rocket className="w-10 h-10" />
                </motion.div>
                
                <motion.h3 
                  className="relative z-10 text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Our Vision
                </motion.h3>
                
                <motion.p 
                  className="relative z-10 text-gray-700 text-lg leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  To become the world's most trusted education consultancy, recognized for 
                  transforming lives through education. We envision a future where every 
                  deserving student has equal opportunities to access quality education.
                </motion.p>
                
                {/* Glowing Key Points */}
                <motion.div 
                  className="relative z-10 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  {['Global recognition', 'Life transformation', 'Creating leaders'].map((point, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center group/item"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-3 h-3 bg-blue-400 rounded-full mr-4 shadow-lg shadow-blue-400/50 group-hover/item:shadow-blue-400/80 transition-all"></div>
                      <span className="text-gray-600 group-hover/item:text-blue-800 transition-colors">{point}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white text-center mb-12"
          >
            Our Impact in Numbers
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value + stat.suffix} />
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our{" "}
              <motion.span
                className="bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Core Values
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              The principles that{" "}
              <motion.span
                className="font-semibold text-blue-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                guide everything we do
              </motion.span>
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group cursor-pointer relative"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105 relative z-10">
                  {/* Header Section - Always Visible */}
                  <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-800 text-white">
                    <div className="flex items-center mb-3">
                      <motion.div 
                        className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {value.icon}
                      </motion.div>
                      <motion.h3 
                        className="text-lg font-bold"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {value.title}
                      </motion.h3>
                    </div>
                    <motion.p 
                      className="text-blue-100 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      {value.description}
                    </motion.p>
                  </div>

                  {/* Compact Footer - Default State */}
                  <div className="px-6 py-4 text-center bg-white group-hover:hidden">
                    <motion.div 
                      className="text-blue-600 text-sm font-medium"
                      animate={{ 
                        opacity: [1, 0.7, 1],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      Hover to learn more ↗
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Content - Overlay on Hover */}
                <div className="absolute top-0 left-0 w-full bg-white rounded-xl shadow-2xl border border-blue-200 p-6 opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-300 transform-gpu z-20">
                  {/* Header Section */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-800 rounded-lg flex items-center justify-center text-white mr-3">
                        {value.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{value.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {value.expandedContent.details}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                      Key Features:
                    </h4>
                    <div className="space-y-2">
                      {value.expandedContent.benefits.slice(0, 2).map((benefit, i) => (
                        <div
                          key={i}
                          className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-xs text-gray-700 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-blue-50 rounded-lg p-3 border border-blue-200 text-center">
                    <div className="text-blue-800 font-bold text-sm">{value.expandedContent.impact}</div>
                    <div className="text-blue-600 text-xs">Our Achievement</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AdmitVerse?</h2>
            <p className="text-xl text-gray-600">What sets us apart from the rest</p>
          </motion.div>
          
          {/* Single Position Sliding Slides */}
          <div 
            className="relative h-[550px] lg:h-[450px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ 
                  x: slideDirection === 1 ? "100%" : "-100%", 
                  opacity: 0 
                }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ 
                  x: slideDirection === 1 ? "-100%" : "100%", 
                  opacity: 0 
                }}
                transition={{ 
                  duration: isManualClick ? 0.4 : 0.8, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 w-full"
              >
                {whyChooseUs[currentSlide] && (
                  <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-3xl shadow-xl overflow-hidden border border-blue-100 h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
                      {/* Image Section */}
                      <div className="relative bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center min-h-[220px] lg:min-h-full">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <motion.div 
                          className="relative z-10 w-24 h-24 lg:w-32 lg:h-32 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="text-white text-4xl lg:text-6xl">
                            {whyChooseUs[currentSlide].icon}
                          </div>
                        </motion.div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute top-4 right-4 lg:top-8 lg:right-8 w-12 h-12 lg:w-20 lg:h-20 bg-white/10 rounded-full"></div>
                        <div className="absolute bottom-6 left-6 lg:bottom-12 lg:left-12 w-8 h-8 lg:w-16 lg:h-16 bg-white/10 rounded-full"></div>
                        <div className="absolute top-1/2 left-4 lg:left-8 w-3 h-3 lg:w-4 lg:h-4 bg-white/20 rounded-full"></div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-6 lg:p-8 xl:p-10 flex flex-col justify-center h-full relative">
                        {/* Watermark Number */}
                        <div className="absolute top-2 right-2 lg:top-4 lg:right-4">
                          <span className="text-8xl lg:text-9xl font-black text-blue-200 select-none pointer-events-none opacity-60">
                            {currentSlide + 1}
                          </span>
                        </div>
                        
                        <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 mb-3 lg:mb-4 leading-tight relative z-10">
                          {whyChooseUs[currentSlide].title}
                        </h3>
                        
                        <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-4 lg:mb-6">
                          {whyChooseUs[currentSlide].description}
                        </p>
                        
                        {/* Additional Benefits */}
                        <div className="space-y-2 mb-4 lg:mb-6 flex-shrink-0">
                          <div className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span className="text-xs lg:text-sm text-gray-700">
                              Proven track record with {currentSlide === 0 ? '15+ years' : currentSlide === 1 ? '500+ universities' : currentSlide === 2 ? 'personalized approach' : currentSlide === 3 ? 'comprehensive support' : currentSlide === 4 ? 'thousands of success stories' : 'cutting-edge technology'}
                            </span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span className="text-xs lg:text-sm text-gray-700">Available 24/7 for your success</span>
                          </div>
                        </div>
                        
                        <div className="mt-auto pt-4">
                          <div className="inline-flex items-center px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-blue-500 to-blue-800 text-white font-semibold rounded-xl shadow-lg text-sm lg:text-base hover:shadow-xl transition-shadow cursor-pointer">
                            <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                            Learn More
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* Slide Indicators */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {whyChooseUs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentSlide === index 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-blue-200 hover:bg-blue-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-50 mb-8">
              Join thousands of students who have achieved their dreams with AdmitVerse
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/colleges"
                className="px-8 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors"
              >
                Explore Universities
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </div>
  )
}