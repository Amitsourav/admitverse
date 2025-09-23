'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
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
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      showToast('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.', 'success')
      
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
    } catch (error) {
      showToast('Something went wrong. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Mon-Fri: 9AM-6PM EST'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: ['info@admitverse.com', 'support@admitverse.com'],
      description: 'We reply within 24 hours'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Address',
      details: ['123 Education Avenue', 'New York, NY 10001, USA'],
      description: 'Visit us by appointment'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Office Hours',
      details: ['Monday - Friday: 9AM - 6PM', 'Saturday: 10AM - 4PM'],
      description: 'EST (Eastern Standard Time)'
    }
  ]

  const offices = [
    {
      city: 'New York',
      country: 'USA',
      address: '123 Education Avenue, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'ny@admitverse.com'
    },
    {
      city: 'London',
      country: 'UK',
      address: '456 Academic Street, London EC1A 1BB',
      phone: '+44 20 7123 4567',
      email: 'london@admitverse.com'
    },
    {
      city: 'Dubai',
      country: 'UAE',
      address: '789 Knowledge Village, Dubai',
      phone: '+971 4 123 4567',
      email: 'dubai@admitverse.com'
    },
    {
      city: 'Singapore',
      country: 'Singapore',
      address: '321 Education Hub, Singapore 138547',
      phone: '+65 6123 4567',
      email: 'singapore@admitverse.com'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-emerald-50 max-w-3xl mx-auto">
              Ready to start your educational journey? Get in touch with our expert counselors for personalized guidance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
              </div>

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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors resize-none"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
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
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-4 px-6 rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
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
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{info.title}</h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-gray-700">{detail}</p>
                        ))}
                        <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <a
                    href="tel:+15551234567"
                    className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <Phone className="w-6 h-6 text-emerald-600 mr-3" />
                    <span className="font-medium">Call us now</span>
                  </a>
                  <a
                    href="mailto:info@admitverse.com"
                    className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <Mail className="w-6 h-6 text-emerald-600 mr-3" />
                    <span className="font-medium">Send us an email</span>
                  </a>
                  <button className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow w-full">
                    <MessageCircle className="w-6 h-6 text-emerald-600 mr-3" />
                    <span className="font-medium">Start live chat</span>
                  </button>
                  <button className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow w-full">
                    <Calendar className="w-6 h-6 text-emerald-600 mr-3" />
                    <span className="font-medium">Schedule a consultation</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Locations</h2>
            <p className="text-xl text-gray-600">Find us in major cities around the world</p>
          </motion.div>

          {/* Interactive Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-100 rounded-2xl h-96 mb-12 flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-green-100" />
            <div className="relative z-10 text-center">
              <Globe className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Interactive Map</h3>
              <p className="text-gray-600">Map integration coming soon</p>
              <p className="text-sm text-gray-500 mt-2">
                Google Maps / Mapbox integration will be added here
              </p>
            </div>
          </motion.div>

          {/* Office Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-emerald-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900">{office.city}</h3>
                </div>
                <p className="text-gray-600 mb-2">{office.country}</p>
                <p className="text-sm text-gray-500 mb-3">{office.address}</p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-700 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {office.phone}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {office.email}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How quickly will I get a response?",
                answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, you can call us directly."
              },
              {
                question: "Is the consultation really free?",
                answer: "Yes! Our initial consultation is completely free with no obligations. We believe in providing value upfront."
              },
              {
                question: "Which countries do you specialize in?",
                answer: "We have expertise in all major study destinations including USA, UK, Canada, Australia, Germany, Netherlands, and many more."
              },
              {
                question: "Do you help with visa applications?",
                answer: "Absolutely! We provide comprehensive visa guidance including document preparation, interview coaching, and application submission."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </div>
  )
}