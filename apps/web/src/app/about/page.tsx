'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import { Award, Users, Globe, Target, Heart, Shield, Zap, Star, BookOpen, Rocket } from 'lucide-react'
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
      description: 'Every decision we make prioritizes the success and well-being of our students.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Integrity & Trust',
      description: 'We build lasting relationships through transparency and honest guidance.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology to simplify the admission process.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Global Community',
      description: 'Creating a supportive network of students, alumni, and education partners.'
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

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      description: 'Former admissions director at Stanford with 20+ years in international education'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Academic Officer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      description: 'PhD from MIT, specializing in student success and academic counseling'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Counseling',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      description: '15+ years helping students secure admissions to Ivy League universities'
    },
    {
      name: 'David Williams',
      role: 'Director of Partnerships',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      description: 'Built partnerships with 500+ universities worldwide'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About AdmitVerse
            </h1>
            <p className="text-xl text-emerald-50 max-w-3xl mx-auto">
              Empowering students worldwide to achieve their dreams of international education through expert guidance and innovative technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl"
            >
              <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center text-white mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To democratize access to international education by providing comprehensive, 
                personalized guidance that empowers every student to pursue their academic 
                dreams, regardless of their background or circumstances. We strive to make 
                the complex admission process simple, transparent, and achievable for all.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-2xl"
            >
              <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center text-white mb-6">
                <Rocket className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To become the world's most trusted education consultancy, recognized for 
                transforming lives through education. We envision a future where every 
                deserving student has equal opportunities to access quality education at 
                top universities worldwide, creating global leaders and change-makers.
              </p>
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center text-white mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
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

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600">Experienced professionals dedicated to your success</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
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