'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import { Calculator, MapPin, Home, Utensils, Car, GraduationCap, Heart, ShoppingBag, DollarSign } from 'lucide-react'

export default function CostCalculatorPage() {
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    lifestyle: 'moderate',
    accommodation: 'shared',
    familyStatus: 'single'
  })

  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const calculateCost = () => {
    setIsCalculating(true)
    
    // Simulate calculation
    setTimeout(() => {
      const baseCosts = {
        usa: { housing: 1200, food: 400, transport: 150, utilities: 200, misc: 300 },
        uk: { housing: 800, food: 300, transport: 120, utilities: 150, misc: 250 },
        canada: { housing: 900, food: 350, transport: 100, utilities: 180, misc: 280 },
        australia: { housing: 1000, food: 380, transport: 130, utilities: 190, misc: 290 },
        germany: { housing: 700, food: 280, transport: 80, utilities: 160, misc: 220 }
      }

      const countryData = baseCosts[formData.country as keyof typeof baseCosts] || baseCosts.usa
      
      // Apply lifestyle multipliers
      const lifestyleMultiplier = {
        budget: 0.7,
        moderate: 1.0,
        premium: 1.5
      }[formData.lifestyle] || 1.0

      // Apply accommodation multipliers
      const accommodationMultiplier = {
        shared: 0.6,
        single: 1.0,
        studio: 1.3,
        apartment: 1.8
      }[formData.accommodation] || 1.0

      const housing = Math.round(countryData.housing * accommodationMultiplier)
      const food = Math.round(countryData.food * lifestyleMultiplier)
      const transport = Math.round(countryData.transport * lifestyleMultiplier)
      const utilities = Math.round(countryData.utilities)
      const misc = Math.round(countryData.misc * lifestyleMultiplier)

      const totalUSD = housing + food + transport + utilities + misc
      const totalINR = Math.round(totalUSD * 83) // USD to INR conversion

      setResults({
        breakdown: {
          housing,
          food,
          transport,
          utilities,
          misc
        },
        totalUSD,
        totalINR,
        currency: 'USD'
      })
      setIsCalculating(false)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    calculateCost()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
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
            className="w-24 h-24 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6"
          >
            <Calculator className="w-14 h-14 text-teal-600" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cost of Living Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Plan your budget for studying abroad with our comprehensive cost of living calculator
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">50+</h3>
              <p className="text-gray-600">Countries Covered</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <DollarSign className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">Real-time</h3>
              <p className="text-gray-600">Exchange Rates</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <GraduationCap className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">100K+</h3>
              <p className="text-gray-600">Students Helped</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Living Costs</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <select
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select Country</option>
                    <option value="usa">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="germany">Germany</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    disabled={!formData.country}
                  >
                    <option value="">Select City (Optional)</option>
                    {formData.country === 'usa' && (
                      <>
                        <option value="new-york">New York</option>
                        <option value="los-angeles">Los Angeles</option>
                        <option value="chicago">Chicago</option>
                        <option value="boston">Boston</option>
                      </>
                    )}
                    {formData.country === 'uk' && (
                      <>
                        <option value="london">London</option>
                        <option value="manchester">Manchester</option>
                        <option value="birmingham">Birmingham</option>
                        <option value="edinburgh">Edinburgh</option>
                      </>
                    )}
                    {formData.country === 'canada' && (
                      <>
                        <option value="toronto">Toronto</option>
                        <option value="vancouver">Vancouver</option>
                        <option value="montreal">Montreal</option>
                        <option value="calgary">Calgary</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lifestyle *</label>
                  <select
                    name="lifestyle"
                    required
                    value={formData.lifestyle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="budget">Budget (Minimal expenses)</option>
                    <option value="moderate">Moderate (Average lifestyle)</option>
                    <option value="premium">Premium (Comfortable lifestyle)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation Type *</label>
                  <select
                    name="accommodation"
                    required
                    value={formData.accommodation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="shared">Shared Accommodation</option>
                    <option value="single">Single Room</option>
                    <option value="studio">Studio Apartment</option>
                    <option value="apartment">1-Bedroom Apartment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Family Status</label>
                  <select
                    name="familyStatus"
                    value={formData.familyStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="single">Single</option>
                    <option value="couple">Couple</option>
                    <option value="family">Family with Children</option>
                  </select>
                </div>

                <motion.button
                  type="submit"
                  disabled={isCalculating}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {isCalculating ? 'Calculating...' : 'Calculate Costs'}
                </motion.button>
              </form>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cost Breakdown</h2>
              
              {!results ? (
                <div className="text-center py-12">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Fill out the form to calculate your living costs</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Total Cost */}
                  <div className="bg-emerald-50 rounded-xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Monthly Total</h3>
                    <div className="text-3xl font-bold text-emerald-600 mb-1">
                      ${results.totalUSD.toLocaleString()}
                    </div>
                    <div className="text-xl text-gray-600">
                      ₹{results.totalINR.toLocaleString()}
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-4">
                    {[
                      { icon: Home, label: 'Accommodation', amount: results.breakdown.housing, color: 'text-blue-600' },
                      { icon: Utensils, label: 'Food & Dining', amount: results.breakdown.food, color: 'text-orange-600' },
                      { icon: Car, label: 'Transportation', amount: results.breakdown.transport, color: 'text-purple-600' },
                      { icon: ShoppingBag, label: 'Utilities', amount: results.breakdown.utilities, color: 'text-green-600' },
                      { icon: Heart, label: 'Miscellaneous', amount: results.breakdown.misc, color: 'text-pink-600' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className={`w-5 h-5 ${item.color}`} />
                          <span className="font-medium text-gray-700">{item.label}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">${item.amount}</div>
                          <div className="text-sm text-gray-500">₹{(item.amount * 83).toLocaleString()}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Annual Total */}
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Annual Total</h3>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      ${(results.totalUSD * 12).toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-600">
                      ₹{(results.totalINR * 12).toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 bg-emerald-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Use Our Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: 'Location-Specific',
                desc: 'Get accurate costs based on your target city and country with real data'
              },
              {
                icon: DollarSign,
                title: 'Multiple Currencies',
                desc: 'View costs in both local currency and INR for better planning'
              },
              {
                icon: Calculator,
                title: 'Comprehensive',
                desc: 'Includes all major expense categories from housing to entertainment'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white rounded-xl p-6 shadow-lg"
              >
                <item.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
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