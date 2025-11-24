'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import { useToast } from '@/components/Toast'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Calendar, Globe, Users } from 'lucide-react'

export default function ContactPage() {
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    interestedCountry: '',
    studyLevel: '',
    subject: '',
    message: '',
    preferredTime: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Use data collection service
      const { submitContactForm } = await import('@/services/dataCollection')
      const success = await submitContactForm(formData)
      
      showToast({ 
        type: 'success', 
        title: 'Thank you! Your message has been sent successfully. We will get back to you within 24 hours.' 
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        interestedCountry: '',
        studyLevel: '',
        subject: '',
        message: '',
        preferredTime: ''
      })

      if (!success) {
        console.log('Data stored locally as backup')
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      showToast({ 
        type: 'error', 
        title: 'Something went wrong. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: ['+91 99826 27466'],
      description: 'Mon-Fri: 9AM-6PM IST'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: ['admission@admitverse.com'],
      description: 'We reply within 24 hours'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Address',
      details: ['WorkWorm Co-working Space, NHPC Chowk', 'Block A, DLF Industrial Area, Sector 32', 'Faridabad, Haryana 121003, India'],
      description: 'Visit us by appointment'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Office Hours',
      details: ['Monday - Friday: 9AM - 6PM', 'Saturday: 10AM - 4PM'],
      description: 'IST (Indian Standard Time)'
    }
  ]

  const offices = [
    {
      city: 'Faridabad',
      country: 'India',
      address: 'WorkWorm Co-working Space, NHPC Chowk, Block A, DLF Industrial Area, Sector 32, Faridabad, Haryana 121003',
      phone: '+91 99826 27466',
      email: 'admission@admitverse.com'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner />
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-blue-600 via-blue-800 to-blue-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
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
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Contact{" "}
              <motion.span
                className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Us
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-50 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ready to start your educational journey? Get in touch with our expert counselors for personalized guidance
            </motion.p>
            
            {/* Floating Contact Icons */}
            <motion.div 
              className="flex justify-center space-x-8 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { icon: <Phone className="w-6 h-6" />, label: "Call" },
                { icon: <Mail className="w-6 h-6" />, label: "Email" },
                { icon: <MessageCircle className="w-6 h-6" />, label: "Chat" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-white/80"
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    color: "#ffffff"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm">
                    {item.icon}
                  </div>
                  <span className="text-sm">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
              whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
              
              <motion.div 
                className="mb-8 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.h2 
                  className="text-3xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Send us a{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Message
                  </span>
                </motion.h2>
                <motion.p 
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Fill out the form below and we'll get back to you within 24 hours
                </motion.p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select your country</option>
                      <option value="india">India</option>
                      <option value="usa">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="canada">Canada</option>
                      <option value="australia">Australia</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interested Country
                    </label>
                    <select
                      name="interestedCountry"
                      value={formData.interestedCountry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Where do you want to study?</option>
                      <option value="usa">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="canada">Canada</option>
                      <option value="australia">Australia</option>
                      <option value="germany">Germany</option>
                      <option value="netherlands">Netherlands</option>
                      <option value="singapore">Singapore</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Study Level
                    </label>
                    <select
                      name="studyLevel"
                      value={formData.studyLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select study level</option>
                      <option value="undergraduate">Undergraduate (Bachelor's)</option>
                      <option value="postgraduate">Postgraduate (Master's)</option>
                      <option value="phd">PhD / Doctorate</option>
                      <option value="diploma">Diploma</option>
                      <option value="foundation">Foundation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="e.g., University Selection, Visa Guidance, Scholarships"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your goals and how we can help you..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Time
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select preferred time</option>
                    <option value="morning">Morning (9AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 5PM)</option>
                    <option value="evening">Evening (5PM - 8PM)</option>
                    <option value="anytime">Anytime</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-800 text-white font-bold py-4 px-6 rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div 
                className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
                whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              >
                {/* Decorative Background */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-800"></div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-100 to-blue-100 rounded-full -translate-y-10 translate-x-10 opacity-60"></div>
                
                <motion.h2 
                  className="text-3xl font-bold text-gray-900 mb-8 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Get in{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Touch
                  </span>
                </motion.h2>
                
                <div className="space-y-6 relative z-10">
                  {contactInfo.map((info, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start space-x-4 group cursor-pointer"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-800 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-lg"
                        whileHover={{ 
                          rotate: 360, 
                          scale: 1.1,
                          boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)"
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        {info.icon}
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {info.title}
                        </h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-gray-700">{detail}</p>
                        ))}
                        <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-blue-50 rounded-2xl p-8 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Floating Orbs */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-200/50 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-blue-200/50 rounded-full"></div>
                
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-6 relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Quick{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Actions
                  </span>
                </motion.h3>
                
                <div className="space-y-4 relative z-10">
                  {[
                    { href: "tel:+919982627466", icon: <Phone className="w-6 h-6 text-blue-600 mr-3" />, text: "Call us now", type: "link" },
                    { href: "mailto:admission@admitverse.com", icon: <Mail className="w-6 h-6 text-blue-600 mr-3" />, text: "Send us an email", type: "link" },
                    { icon: <MessageCircle className="w-6 h-6 text-blue-600 mr-3" />, text: "Start live chat", type: "button" },
                    { icon: <Calendar className="w-6 h-6 text-blue-600 mr-3" />, text: "Schedule a consultation", type: "button" }
                  ].map((action, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {action.type === "link" ? (
                        <motion.a
                          href={action.href}
                          className="flex items-center p-4 bg-white rounded-lg shadow-sm group cursor-pointer"
                          whileHover={{ 
                            x: 5, 
                            scale: 1.02,
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.6 }}
                          >
                            {action.icon}
                          </motion.div>
                          <span className="font-medium group-hover:text-blue-600 transition-colors">
                            {action.text}
                          </span>
                        </motion.a>
                      ) : (
                        <motion.button 
                          className="flex items-center p-4 bg-white rounded-lg shadow-sm w-full group cursor-pointer"
                          whileHover={{ 
                            x: 5, 
                            scale: 1.02,
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.6 }}
                          >
                            {action.icon}
                          </motion.div>
                          <span className="font-medium group-hover:text-blue-600 transition-colors">
                            {action.text}
                          </span>
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-300/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our{" "}
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Locations
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Find us in major cities around the world
            </motion.p>
          </motion.div>

          {/* Interactive Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 80 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-96 mb-12 flex items-center justify-center relative overflow-hidden shadow-2xl"
            whileHover={{ y: -10, rotateX: 5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-100 opacity-80" />
            
            {/* Floating Globe Animation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-32 h-32 border-2 border-blue-300/30 rounded-full"></div>
            </motion.div>
            
            <motion.div
              className="relative z-10 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ 
                  rotate: 360, 
                  scale: 1.1,
                  y: -10 
                }}
                transition={{ duration: 0.8 }}
              >
                <Globe className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
              >
                Interactive Map
              </motion.h3>
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                viewport={{ once: true }}
              >
                Map integration coming soon
              </motion.p>
              <motion.p 
                className="text-sm text-gray-500 mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                viewport={{ once: true }}
              >
                Google Maps / Mapbox integration will be added here
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Office Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0, 
                  y: 50,
                  rotateY: -15,
                  scale: 0.9
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  rotateY: 0,
                  scale: 1
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden group cursor-pointer"
                whileHover={{ 
                  y: -10, 
                  rotateY: 5,
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-100 to-blue-100 rounded-full -translate-y-8 translate-x-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-blue-100 to-blue-100 rounded-full translate-y-6 -translate-x-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <motion.div 
                  className="flex items-center mb-4 relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={{ 
                      rotate: 360, 
                      scale: 1.2,
                      color: "#10B981"
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <MapPin className="w-6 h-6 text-blue-600 mr-2" />
                  </motion.div>
                  <motion.h3 
                    className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    {office.city}
                  </motion.h3>
                </motion.div>
                
                <motion.div
                  className="relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.4 }}
                  viewport={{ once: true }}
                >
                  <p className="text-gray-600 mb-2 font-medium">{office.country}</p>
                  <p className="text-sm text-gray-500 mb-3 leading-relaxed">{office.address}</p>
                  <div className="space-y-2">
                    <motion.p 
                      className="text-sm text-gray-700 flex items-center group/item"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="group-hover/item:text-blue-600 transition-colors"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                      </motion.div>
                      <span className="group-hover/item:text-blue-600 transition-colors">
                        {office.phone}
                      </span>
                    </motion.p>
                    <motion.p 
                      className="text-sm text-gray-700 flex items-center group/item"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="group-hover/item:text-blue-600 transition-colors"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                      </motion.div>
                      <span className="group-hover/item:text-blue-600 transition-colors">
                        {office.email}
                      </span>
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-200/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -80, 0],
                opacity: [0, 0.6, 0],
                scale: [0.3, 1, 0.3],
              }}
              transition={{
                duration: Math.random() * 5 + 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Frequently Asked{" "}
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Questions
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Quick answers to common questions
            </motion.p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How quickly will I get a response?",
                answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, you can call us directly.",
                icon: "⏰"
              },
              {
                question: "Is the consultation really free?",
                answer: "Yes! Our initial consultation is completely free with no obligations. We believe in providing value upfront.",
                icon: "💯"
              },
              {
                question: "Which countries do you specialize in?",
                answer: "We have expertise in all major study destinations including USA, UK, Canada, Australia, Germany, Netherlands, and many more.",
                icon: "🌍"
              },
              {
                question: "Do you help with visa applications?",
                answer: "Absolutely! We provide comprehensive visa guidance including document preparation, interview coaching, and application submission.",
                icon: "📋"
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0, 
                  y: 30,
                  rotateX: 15,
                  scale: 0.95
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0,
                  scale: 1
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg relative overflow-hidden group cursor-pointer"
                whileHover={{ 
                  y: -8, 
                  rotateX: 2,
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.span 
                    className="text-lg"
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {faq.icon}
                  </motion.span>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors pr-16"
                    whileHover={{ scale: 1.02 }}
                  >
                    {faq.question}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 + 0.4 }}
                    viewport={{ once: true }}
                  >
                    {faq.answer}
                  </motion.p>
                </motion.div>
                
                {/* Hover Effect Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/50 to-blue-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
          
          {/* Call to Action at Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.div 
              className="bg-gradient-to-r from-blue-50 to-blue-50 rounded-2xl p-8 relative overflow-hidden"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-blue-200/30 rounded-full -translate-y-10 -translate-x-10"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-200/30 rounded-full translate-y-8 translate-x-8"></div>
              
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-4 relative z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                Still have questions?
              </motion.h3>
              <motion.p 
                className="text-gray-600 mb-6 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                viewport={{ once: true }}
              >
                Don't hesitate to reach out. Our team is here to help you every step of the way.
              </motion.p>
              <motion.button 
                className="bg-gradient-to-r from-blue-500 to-blue-800 text-white font-bold py-3 px-8 rounded-lg relative z-10"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                viewport={{ once: true }}
              >
                Contact Us Now
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </div>
  )
}