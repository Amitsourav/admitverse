'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import { Award, Users, Globe, Target, Heart, Shield, Zap, Star, BookOpen, Rocket, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import AnimatedCounter from '@/components/AnimatedCounter'

export default function AboutPage() {
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
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 overflow-hidden">
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
              className="text-xl md:text-2xl text-emerald-50 max-w-4xl mx-auto leading-relaxed"
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
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Foundation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on strong principles and driven by a clear vision for the future
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-emerald-50 to-green-50 p-8 md:p-10 rounded-3xl border border-emerald-100 shadow-lg hover:shadow-2xl transition-all duration-500">
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Target className="w-10 h-10" />
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To democratize access to international education by providing comprehensive, 
                  personalized guidance that empowers every student to pursue their academic 
                  dreams, regardless of their background or circumstances. We strive to make 
                  the complex admission process simple, transparent, and achievable for all.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-teal-50 to-cyan-50 p-8 md:p-10 rounded-3xl border border-teal-100 shadow-lg hover:shadow-2xl transition-all duration-500">
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Rocket className="w-10 h-10" />
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Vision</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To become the world's most trusted education consultancy, recognized for 
                  transforming lives through education. We envision a future where every 
                  deserving student has equal opportunities to access quality education at 
                  top universities worldwide, creating global leaders and change-makers.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-green-600">
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
                <div className="text-emerald-100">{stat.label}</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  {/* Header Section - Always Visible */}
                  <div className="p-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                        {value.icon}
                      </div>
                      <h3 className="text-lg font-bold">{value.title}</h3>
                    </div>
                    <p className="text-emerald-100 text-sm">
                      {value.description}
                    </p>
                  </div>

                  {/* Compact Footer - Default State */}
                  <div className="px-6 py-4 text-center bg-white group-hover:hidden">
                    <div className="text-emerald-600 text-sm font-medium">
                      Hover to learn more ↗
                    </div>
                  </div>

                  {/* Expanded Content - Hover State */}
                  <div className="p-6 bg-white hidden group-hover:block">
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                      {value.expandedContent.details}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                        Key Features:
                      </h4>
                      <div className="space-y-2">
                        {value.expandedContent.benefits.slice(0, 2).map((benefit, i) => (
                          <div
                            key={i}
                            className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors duration-200"
                          >
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-xs text-gray-700 font-medium">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-3 border border-emerald-200 text-center">
                      <div className="text-emerald-800 font-bold text-sm">{value.expandedContent.impact}</div>
                      <div className="text-emerald-600 text-xs">Our Achievement</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AdmitVerse?</h2>
            <p className="text-xl text-gray-600">What sets us apart from the rest</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gray-50 p-8 rounded-2xl hover:bg-emerald-50 transition-colors">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                    {reason.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-600">
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
            <p className="text-xl text-emerald-50 mb-8">
              Join thousands of students who have achieved their dreams with AdmitVerse
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/colleges"
                className="px-8 py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 transition-colors"
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