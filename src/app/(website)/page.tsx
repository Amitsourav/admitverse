'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, Globe, TrendingUp, Users, ChevronRight, Sparkles, ArrowRight, Award, Star, Target, Zap, Heart, BarChart, FileText, Video, GraduationCap, Menu, X, Play, Pause, Volume2, VolumeX, ChevronDown } from 'lucide-react'
import { useToast } from '@/components/Toast'
import { useSearchParams } from 'next/navigation'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'
import AnimatedCounter from '@/components/AnimatedCounter'

export default function HomePage() {
  const { showToast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const searchParams = useSearchParams()
  const design = searchParams.get('design') || (typeof window !== 'undefined' ? localStorage.getItem('selectedDesign') : null) || 'forest-premium'
  
  // Animation refs and scroll
  const containerRef = useRef(null)
  const freezeScrollRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const { scrollYProgress: freezeScrollProgress } = useScroll({ 
    target: freezeScrollRef,
    offset: ["start end", "end start"]
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  // Design variants
  const designVariants = {
    'ocean-blue': {
      primaryGradient: 'from-blue-600 via-blue-700 to-indigo-800',
      accentGradient: 'from-blue-500 to-cyan-600',
      cardBg: 'bg-blue-50',
      textAccent: 'text-blue-600'
    },
    'sunset-orange': {
      primaryGradient: 'from-orange-500 via-red-500 to-pink-600',
      accentGradient: 'from-orange-400 to-red-500',
      cardBg: 'bg-orange-50',
      textAccent: 'text-orange-600'
    },
    'forest-premium': {
      primaryGradient: 'from-emerald-600 via-green-600 to-teal-700',
      accentGradient: 'from-emerald-500 to-green-600',
      cardBg: 'bg-emerald-50',
      textAccent: 'text-emerald-600'
    }
  }

  const currentDesign = designVariants[design as keyof typeof designVariants] || designVariants['forest-premium']

  // Success Stories data
  const successStories = [
    {
      name: "Sarah Chen",
      university: "Stanford University",
      program: "Computer Science MS",
      image: "/images/student-sarah.jpg",
      flag: "🇨🇦",
      quote: "AdmitVerse made my dream of studying at Stanford a reality. Their guidance was invaluable!"
    },
    {
      name: "Raj Patel", 
      university: "MIT",
      program: "Data Science PhD",
      image: "/images/student-raj.jpg",
      flag: "🇮🇳",
      quote: "The personalized support and scholarship assistance helped me secure full funding at MIT."
    },
    {
      name: "Maria Rodriguez",
      university: "Oxford University", 
      program: "Business Administration MBA",
      image: "/images/student-maria.jpg",
      flag: "🇲🇽",
      quote: "From GMAT prep to visa assistance, AdmitVerse was with me every step of the way."
    },
    {
      name: "David Kim",
      university: "Harvard University",
      program: "Medicine MD",
      image: "/images/student-david.jpg",
      flag: "🇰🇷",
      quote: "Their expert counselors helped me craft a compelling application that stood out."
    },
    {
      name: "Emma Thompson",
      university: "Cambridge University",
      program: "Engineering MEng",
      image: "/images/student-emma.jpg",
      flag: "🇬🇧",
      quote: "AdmitVerse's mock interviews prepared me perfectly for the actual admission interviews."
    },
    {
      name: "Ahmed Hassan",
      university: "ETH Zurich",
      program: "Artificial Intelligence MS",
      image: "/images/student-ahmed.jpg",
      flag: "🇪🇬",
      quote: "The AI-powered matching system found the perfect program for my research interests."
    }
  ]

  // Why Choose Us Features with enhanced content
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Universities',
      description: 'Access comprehensive information about 500+ top-ranked universities across 50+ countries with detailed program listings, admission requirements, deadlines, and scholarship opportunities all in one place.',
      highlights: ['500+ Universities', '50+ Countries', 'Real-time Updates', 'Detailed Rankings'],
      stats: '99% of our students get accepted to their top 3 choices',
      imageSrc: '/images/feature-1.svg',
      ctaText: 'Explore Universities',
      ctaHref: '/colleges'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'AI-Powered Matching',
      description: 'Our advanced AI algorithm analyzes your academic profile, career goals, budget, and preferences to recommend the perfect universities and programs tailored specifically for your success.',
      highlights: ['Smart Algorithm', 'Personalized Results', '95% Accuracy', 'Instant Matching'],
      stats: 'Over 10,000 successful matches made',
      imageSrc: '/images/feature-2.svg',
      ctaText: 'Find Your Match',
      ctaHref: '/courses'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Guidance',
      description: 'Connect with certified education counselors and admission experts who have helped thousands of students. Get personalized support for applications, essays, interviews, and every step of your journey.',
      highlights: ['Certified Counselors', '24/7 Support', 'Application Help', 'Interview Prep'],
      stats: '15+ years average counselor experience',
      imageSrc: '/images/feature-3.svg',
      ctaText: 'Book Consultation',
      ctaHref: '/contact'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Scholarship Support',
      description: 'Unlock millions in scholarship opportunities with our comprehensive database. We help you find, apply for, and secure financial aid, grants, and merit-based scholarships to fund your dreams.',
      highlights: ['$50M+ in Scholarships', 'Merit & Need-based', 'Application Assistance', 'Success Strategies'],
      stats: '85% of students receive financial aid',
      imageSrc: '/images/feature-4.svg',
      ctaText: 'Find Scholarships',
      ctaHref: '/scholarships'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Visa Assistance',
      description: 'Navigate complex visa processes with confidence. Our visa experts provide step-by-step guidance, document preparation, interview coaching, and support throughout your visa application journey.',
      highlights: ['Document Checklist', 'Interview Prep', 'Embassy Guidance', '98% Success Rate'],
      stats: '5000+ successful visa applications',
      imageSrc: '/images/feature-5.svg',
      ctaText: 'Get Visa Help',
      ctaHref: '/visa'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Career Planning',
      description: 'Build your future with strategic career planning. From internship opportunities to job placements, we connect you with industry partners and provide career development resources for long-term success.',
      highlights: ['Career Counseling', 'Industry Connections', 'Resume Building', 'Job Placement'],
      stats: '92% employed within 6 months of graduation',
      imageSrc: '/images/feature-6.svg',
      ctaText: 'Plan Your Career',
      ctaHref: '/career'
    }
  ]

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted
      setIsVideoMuted(!isVideoMuted)
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section with Video Background */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, transform: `scale(${heroScale})` }}
      >
        {/* Video Background with green tint */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted={isVideoMuted}
            playsInline
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-black/40 to-green-900/30" />
          <div className="absolute inset-0 bg-emerald-500/10" />
        </div>

        {/* Video Controls */}
        <div className="absolute top-24 right-8 flex gap-2 z-20">
          <button
            onClick={toggleVideo}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            {isVideoMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-white leading-tight">
              Your Gateway to
              <span className={`block bg-gradient-to-r ${currentDesign.accentGradient} bg-clip-text text-transparent`}>
                Global Education
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover top universities worldwide. Get personalized recommendations, expert guidance, and make your dream of studying abroad a reality.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search universities, courses, or countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-6 text-lg rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-transparent focus:border-emerald-500 focus:outline-none shadow-2xl"
              />
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              href="/universities"
              className={`group px-10 py-5 bg-gradient-to-r ${currentDesign.primaryGradient} text-white font-bold text-lg rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center`}
            >
              Explore Universities
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-10 py-5 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 font-bold text-lg rounded-2xl hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
            >
              Get Free Consultation
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-8 h-8 text-white/70" />
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Universities' },
              { value: '50+', label: 'Countries' },
              { value: '25K+', label: 'Students Helped' },
              { value: '95%', label: 'Success Rate' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`text-4xl md:text-5xl font-black ${currentDesign.textAccent} mb-2`}>
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Freeze Scroll Why Choose Us Section */}
      <div ref={freezeScrollRef} style={{ height: `${features.length * 100}vh` }}>
        <div className="sticky top-0 h-screen bg-gradient-to-br from-slate-800 via-emerald-800 to-slate-900 flex items-center justify-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 to-slate-800/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_70%)]" />
          
          {/* Header */}
          <div className="absolute top-16 left-0 right-0 text-center z-20 bg-gradient-to-b from-black/20 to-transparent pb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">Why Choose Us</h2>
            <p className="text-emerald-200 text-base lg:text-lg">Complete support for your educational journey</p>
          </div>

          {/* Feature Sections */}
          {features.map((feature, index) => {
            const totalSections = features.length
            const sectionStart = index / totalSections
            const sectionEnd = (index + 1) / totalSections
            
            // Use freeze scroll progress with extended visibility
            const opacity = useTransform(
              freezeScrollProgress,
              [sectionStart, sectionStart + 0.05, sectionEnd - 0.05, sectionEnd],
              [0, 1, 1, 0]
            )
            
            const y = useTransform(
              freezeScrollProgress,
              [sectionStart, sectionStart + 0.05, sectionEnd - 0.05, sectionEnd],
              [30, 0, 0, -30]
            )
            
            const scale = useTransform(
              freezeScrollProgress,
              [sectionStart, sectionStart + 0.05, sectionEnd - 0.05, sectionEnd],
              [0.95, 1, 1, 0.95]
            )

            return (
              <motion.div
                key={index}
                className="absolute inset-0 flex items-center justify-center px-8 pt-32 pb-16"
                style={{ opacity, y, scale }}
              >
                <div className="max-w-6xl mx-auto w-full">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}>
                    {/* Content Side */}
                    <motion.div 
                      className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} text-white space-y-6`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {/* Large Icon with Animation */}
                      <motion.div 
                        className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-400 rounded-2xl flex items-center justify-center shadow-2xl"
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <span className="text-gray-900 text-2xl">{feature.icon}</span>
                      </motion.div>

                      {/* Section Number */}
                      <div className="text-emerald-300 font-bold text-lg">
                        {(index + 1).toString().padStart(2, '0')} / {features.length.toString().padStart(2, '0')}
                      </div>

                      {/* Title with Gradient */}
                      <h3 className="text-4xl lg:text-5xl font-black leading-tight">
                        <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                          {feature.title}
                        </span>
                      </h3>

                      {/* Enhanced Description */}
                      <p className="text-xl text-emerald-100 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Success Stats */}
                      <div className="bg-emerald-800/30 border border-emerald-500/30 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-emerald-300 font-semibold text-lg">✨ {feature.stats}</p>
                      </div>

                      {/* Feature Highlights */}
                      <div className="flex flex-wrap gap-3">
                        {feature.highlights.map((highlight, tagIndex) => (
                          <motion.span
                            key={highlight}
                            className="px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-200 text-sm font-semibold"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + tagIndex * 0.1 }}
                          >
                            {highlight}
                          </motion.span>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <div className="pt-4">
                        <Link
                          href={feature.ctaHref}
                          className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold text-lg rounded-xl shadow-2xl overflow-hidden relative"
                        >
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                          <span className="relative z-10 flex items-center">
                            {feature.ctaText}
                            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </motion.div>

                    {/* Image Side with enhanced effects */}
                    <motion.div 
                      className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} flex items-center justify-center`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <div className="relative">
                        {/* Background Glow Effects */}
                        <div className="absolute -inset-8 opacity-30">
                          <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-emerald-400/40 to-green-400/40 rounded-full blur-xl" />
                          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-400/40 to-emerald-400/40 rounded-full blur-xl" />
                        </div>
                        
                        {/* Main Image Container */}
                        <motion.div 
                          className="relative bg-gradient-to-br from-white/10 to-emerald-50/20 rounded-3xl p-8 backdrop-blur-lg border border-emerald-300/30 shadow-2xl overflow-hidden"
                          animate={{ 
                            y: [0, -10, 0],
                            rotateY: [0, 5, 0]
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            rotateY: index % 2 === 0 ? 10 : -10
                          }}
                        >
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-green-500/20" />
                          
                          {/* Feature Image with Pop-up Animation */}
                          <motion.img
                            src={feature.imageSrc}
                            alt={feature.title}
                            className="w-full h-64 lg:h-80 object-contain relative z-10 drop-shadow-2xl cursor-pointer"
                            loading="lazy"
                            initial={{ scale: 0, opacity: 0, rotateZ: -10 }}
                            animate={{ 
                              scale: [0, 1.2, 1], 
                              opacity: [0, 1, 1],
                              rotateZ: [-10, 5, 0]
                            }}
                            transition={{ 
                              duration: 1.2, 
                              delay: 0.6,
                              times: [0, 0.6, 1],
                              ease: "easeOut"
                            }}
                            whileHover={{
                              scale: 1.15,
                              rotateZ: 3,
                              transition: { 
                                duration: 0.3,
                                type: "spring",
                                stiffness: 300
                              }
                            }}
                            whileTap={{
                              scale: 0.95,
                              transition: { duration: 0.1 }
                            }}
                          />

                          {/* Pop-up Effect Elements */}
                          <AnimatePresence>
                            <motion.div
                              className="absolute inset-0 pointer-events-none"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              {/* Burst Effect */}
                              {[...Array(8)].map((_, i) => (
                                <motion.div
                                  key={`burst-${i}`}
                                  className="absolute w-2 h-8 bg-gradient-to-t from-emerald-400 to-transparent rounded-full"
                                  style={{
                                    left: '50%',
                                    top: '50%',
                                    transformOrigin: '50% 100%',
                                  }}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ 
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 1.5],
                                    rotate: i * 45,
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    delay: 0.8 + i * 0.05,
                                    ease: "easeOut"
                                  }}
                                />
                              ))}

                              {/* Expanding Rings */}
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={`ring-${i}`}
                                  className="absolute border-2 border-emerald-400/30 rounded-full"
                                  style={{
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)'
                                  }}
                                  initial={{ width: 0, height: 0, opacity: 0 }}
                                  animate={{
                                    width: [0, 100 + i * 50, 150 + i * 50],
                                    height: [0, 100 + i * 50, 150 + i * 50],
                                    opacity: [0, 0.5, 0],
                                  }}
                                  transition={{
                                    duration: 2,
                                    delay: 1 + i * 0.2,
                                    ease: "easeOut"
                                  }}
                                />
                              ))}
                            </motion.div>
                          </AnimatePresence>

                          {/* Sparkle Points */}
                          <div className="absolute inset-0 pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={`sparkle-${i}`}
                                className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-400"
                                style={{
                                  left: `${20 + i * 15}%`,
                                  top: `${15 + i * 12}%`
                                }}
                                animate={{
                                  scale: [0, 1, 0],
                                  opacity: [0, 1, 0],
                                }}
                                transition={{
                                  duration: 2,
                                  delay: 1.5 + i * 0.1,
                                  repeat: Infinity,
                                  repeatDelay: 3
                                }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Section Number Background */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <motion.span 
                      className="text-[12rem] lg:text-[16rem] font-black text-white/5 select-none"
                      style={{ opacity: useTransform(opacity, [0, 1], [0, 0.3]) }}
                    >
                      {(index + 1).toString().padStart(2, '0')}
                    </motion.span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-8 left-8 right-8 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-full"
                    style={{
                      width: useTransform(
                        freezeScrollProgress,
                        [sectionStart, sectionEnd],
                        ['0%', '100%']
                      )
                    }}
                  />
                </div>

                {/* Side Progress Indicator */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-1 h-32 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="w-full bg-emerald-400 rounded-full"
                    style={{
                      height: useTransform(
                        freezeScrollProgress,
                        [index / features.length, (index + 1) / features.length],
                        ['0%', '100%']
                      )
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Success Stories Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories
              <span className={`bg-gradient-to-r ${currentDesign.accentGradient} bg-clip-text text-transparent`}>
                {" "}That Inspire
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real students, real results. See how AdmitVerse has helped thousands of students achieve their dreams of studying at top universities worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-48 bg-gradient-to-r from-emerald-500 to-teal-600">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute top-4 right-4 text-3xl">{story.flag}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{story.name}</h3>
                  <p className="text-emerald-600 font-semibold mb-2">{story.university}</p>
                  <div className={`bg-gradient-to-r ${currentDesign.accentGradient} text-white p-4 rounded-xl`}>
                    <p className="text-sm mb-2">{story.program}</p>
                    <p className="italic">&ldquo;{story.quote}&rdquo;</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/success-stories"
                className={`px-8 py-4 bg-gradient-to-r ${currentDesign.primaryGradient} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center`}
              >
                View All Success Stories
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Student Interest Form Section */}
      <section id="book-counseling" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Study Abroad Journey?
              </span>
            </h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Book a free counseling session with our expert advisors. Get personalized guidance tailored to your academic goals and career aspirations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="studyLevel" className="block text-sm font-semibold text-gray-700 mb-2">
                    Study Level *
                  </label>
                  <select
                    id="studyLevel"
                    name="studyLevel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                  >
                    <option value="">Select study level</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="graduate">Graduate (Master's)</option>
                    <option value="phd">PhD</option>
                    <option value="certificate">Certificate Program</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="preferredCountry" className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Country
                  </label>
                  <select
                    id="preferredCountry"
                    name="preferredCountry"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                  >
                    <option value="">Select preferred country</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="australia">Australia</option>
                    <option value="germany">Germany</option>
                    <option value="france">France</option>
                    <option value="netherlands">Netherlands</option>
                    <option value="switzerland">Switzerland</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="fieldOfStudy" className="block text-sm font-semibold text-gray-700 mb-2">
                  Field of Study *
                </label>
                <select
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                >
                  <option value="">Select field of study</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="engineering">Engineering</option>
                  <option value="business">Business Administration</option>
                  <option value="medicine">Medicine</option>
                  <option value="data-science">Data Science</option>
                  <option value="psychology">Psychology</option>
                  <option value="law">Law</option>
                  <option value="arts">Arts & Humanities</option>
                  <option value="social-sciences">Social Sciences</option>
                  <option value="natural-sciences">Natural Sciences</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Tell us about your goals (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors resize-none"
                  placeholder="Share your academic goals, preferred universities, or any specific questions you have..."
                ></textarea>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  I agree to receive communications about study abroad opportunities and consent to AdmitVerse processing my personal information for counseling purposes. *
                </label>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 bg-gradient-to-r ${currentDesign.primaryGradient} text-white font-bold text-lg rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2`}
              >
                <span>Book Free Counseling Session</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Expert Counselors</div>
                    <div className="text-sm text-gray-600">Personalized guidance</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Global Network</div>
                    <div className="text-sm text-gray-600">500+ universities</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Success Rate</div>
                    <div className="text-sm text-gray-600">95% admissions</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}