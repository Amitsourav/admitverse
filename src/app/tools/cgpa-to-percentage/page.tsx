'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import { Calculator, RotateCcw, GraduationCap, Target, Download, Info, Percent, Award } from 'lucide-react'

export default function CGPAToPercentagePage() {
  const [conversionType, setConversionType] = useState('cgpa-to-percentage')
  const [scale, setScale] = useState('10')
  const [formula, setFormula] = useState('standard')
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const calculateConversion = () => {
    const value = parseFloat(inputValue)
    if (isNaN(value)) return

    let convertedValue: number

    if (conversionType === 'cgpa-to-percentage') {
      // CGPA to Percentage
      if (scale === '10') {
        switch (formula) {
          case 'vtu':
            convertedValue = (value - 0.75) * 10
            break
          case 'anna':
            convertedValue = value * 10
            break
          case 'mumbai':
            convertedValue = (value * 7.1) + 11
            break
          default:
            convertedValue = value * 9.5
        }
      } else if (scale === '4') {
        switch (formula) {
          case 'us':
            convertedValue = (value - 1) * 33.33
            break
          default:
            convertedValue = value * 25
        }
      } else {
        convertedValue = value * 20
      }
    } else {
      // Percentage to CGPA
      if (scale === '10') {
        switch (formula) {
          case 'vtu':
            convertedValue = (value / 10) + 0.75
            break
          case 'anna':
            convertedValue = value / 10
            break
          case 'mumbai':
            convertedValue = (value - 11) / 7.1
            break
          default:
            convertedValue = value / 9.5
        }
      } else if (scale === '4') {
        switch (formula) {
          case 'us':
            convertedValue = 1 + (value / 33.33)
            break
          default:
            convertedValue = value / 25
        }
      } else {
        convertedValue = value / 20
      }
    }

    setResult(Math.round(convertedValue * 100) / 100)
  }

  const reset = () => {
    setInputValue('')
    setResult(null)
  }

  const downloadResult = () => {
    if (!result) return
    const text = `CGPA to Percentage Conversion Result
    ===================================
    Input: ${inputValue} ${conversionType === 'cgpa-to-percentage' ? 'CGPA' : '%'}
    Scale: ${scale}-point scale
    Formula: ${formula}
    Result: ${result} ${conversionType === 'cgpa-to-percentage' ? '%' : 'CGPA'}
    ===================================`
    const element = document.createElement('a')
    const file = new Blob([text], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'cgpa-conversion-result.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const getMaxValue = () => {
    if (conversionType === 'cgpa-to-percentage') {
      return scale === '4' ? 4.0 : scale === '5' ? 5.0 : 10.0
    }
    return 100
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
            <Percent className="w-14 h-14 text-teal-600" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            CGPA to Percentage Converter
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Convert between CGPA and percentage instantly with support for multiple grading scales
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <Calculator className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">100K+</h3>
              <p className="text-gray-600">Conversions</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <GraduationCap className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">All Scales</h3>
              <p className="text-gray-600">4.0, 5.0, 10.0</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <Award className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">100%</h3>
              <p className="text-gray-600">Accurate</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {/* Conversion Type Toggle */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Conversion Type</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setConversionType('cgpa-to-percentage')
                    reset()
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    conversionType === 'cgpa-to-percentage'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">CGPA → Percentage</div>
                  <div className="text-sm mt-1 opacity-75">Convert CGPA to Percentage</div>
                </button>
                <button
                  onClick={() => {
                    setConversionType('percentage-to-cgpa')
                    reset()
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    conversionType === 'percentage-to-cgpa'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">Percentage → CGPA</div>
                  <div className="text-sm mt-1 opacity-75">Convert Percentage to CGPA</div>
                </button>
              </div>
            </div>

            {/* Scale Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Grading Scale</label>
              <select
                value={scale}
                onChange={(e) => setScale(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="10">10-Point Scale</option>
                <option value="4">4-Point Scale</option>
                <option value="5">5-Point Scale</option>
              </select>
            </div>

            {/* Formula Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Formula</label>
              <select
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="standard">Standard</option>
                {scale === '10' && (
                  <>
                    <option value="vtu">VTU Formula</option>
                    <option value="anna">Anna University</option>
                    <option value="mumbai">Mumbai University</option>
                  </>
                )}
                {scale === '4' && <option value="us">US Universities</option>}
              </select>
            </div>

            {/* Input Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter {conversionType === 'cgpa-to-percentage' ? 'CGPA' : 'Percentage'}
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max={getMaxValue()}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-2xl font-semibold text-center"
                placeholder={conversionType === 'cgpa-to-percentage' ? 'Enter CGPA' : 'Enter Percentage'}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-6">
              <motion.button
                onClick={calculateConversion}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate
              </motion.button>
              <motion.button
                onClick={reset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Result Display */}
            {result !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 rounded-lg p-6 border-2 border-emerald-200"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Result</h3>
                <div className="text-3xl font-bold text-emerald-600">
                  {result} {conversionType === 'cgpa-to-percentage' ? '%' : 'CGPA'}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {inputValue} {conversionType === 'cgpa-to-percentage' ? 'CGPA' : '%'} = {result} {conversionType === 'cgpa-to-percentage' ? '%' : 'CGPA'}
                </div>
                <motion.button
                  onClick={downloadResult}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 px-4 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Result
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Formula Guide */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Formula Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <Info className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Standard Formula</h3>
              <p className="text-gray-600 mb-3">10-Point Scale: CGPA × 9.5</p>
              <p className="text-gray-600 mb-3">4-Point Scale: CGPA × 25</p>
              <p className="text-gray-600">5-Point Scale: CGPA × 20</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <Info className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">VTU Formula</h3>
              <p className="text-gray-600 mb-3">Percentage = (CGPA - 0.75) × 10</p>
              <p className="text-gray-600">Applicable for VTU affiliated colleges</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <Info className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Anna University</h3>
              <p className="text-gray-600 mb-3">Percentage = CGPA × 10</p>
              <p className="text-gray-600">Direct multiplication method</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}