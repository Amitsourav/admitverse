'use client'

import { useState } from 'react'
import { Calculator, Calendar, Percent, IndianRupee, FileText } from 'lucide-react'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(1000000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [loanTenure, setLoanTenure] = useState(5)
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years')
  
  // Calculate EMI using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
  const calculateEMI = () => {
    const principal = loanAmount
    const monthlyRate = interestRate / (12 * 100)
    const numberOfMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure
    
    if (monthlyRate === 0) {
      return principal / numberOfMonths
    }
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / 
                (Math.pow(1 + monthlyRate, numberOfMonths) - 1)
    
    return emi
  }
  
  const emi = calculateEMI()
  const totalMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure
  const totalPayment = emi * totalMonths
  const totalInterest = totalPayment - loanAmount
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <>
      <TopBanner />
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-32">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Calculator className="text-blue-600" />
              EMI Calculator
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Calculate your Education Loan EMI instantly. Plan your finances better with our accurate EMI calculator.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Loan Details</h2>
                
                {/* Loan Amount */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
                    <IndianRupee className="w-5 h-5 text-blue-600" />
                    Loan Amount
                  </label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    min="10000"
                    step="10000"
                  />
                  <input
                    type="range"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full mt-3"
                    min="100000"
                    max="10000000"
                    step="50000"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹1L</span>
                    <span>₹1Cr</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
                    <Percent className="w-5 h-5 text-blue-600" />
                    Interest Rate (% p.a.)
                  </label>
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    min="0"
                    max="30"
                    step="0.1"
                  />
                  <input
                    type="range"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full mt-3"
                    min="5"
                    max="20"
                    step="0.1"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>5%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Loan Tenure */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Loan Tenure
                  </label>
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setTenureType('years')}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        tenureType === 'years' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Years
                    </button>
                    <button
                      onClick={() => setTenureType('months')}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        tenureType === 'months' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Months
                    </button>
                  </div>
                  <input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    min={tenureType === 'years' ? 1 : 12}
                    max={tenureType === 'years' ? 30 : 360}
                  />
                  <input
                    type="range"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full mt-3"
                    min={tenureType === 'years' ? 1 : 12}
                    max={tenureType === 'years' ? 15 : 180}
                    step={tenureType === 'years' ? 1 : 6}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{tenureType === 'years' ? '1 Year' : '12 Months'}</span>
                    <span>{tenureType === 'years' ? '15 Years' : '180 Months'}</span>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">EMI Breakdown</h2>
                
                {/* Monthly EMI */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 mb-6">
                  <p className="text-gray-600 mb-2">Monthly EMI</p>
                  <p className="text-4xl font-bold text-blue-600">
                    {formatCurrency(emi)}
                  </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Principal Amount</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {formatCurrency(loanAmount)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {formatCurrency(totalInterest)}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-1">Total Payment</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalPayment)}
                  </p>
                </div>

                {/* Additional Info */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Number of Payments</span>
                      <span className="font-medium">{totalMonths} months</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Interest Rate</span>
                      <span className="font-medium">{interestRate}% p.a.</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Processing Fee</span>
                      <span className="font-medium">Check with Bank</span>
                    </li>
                  </ul>
                </div>

                {/* Tips */}
                <div className="bg-blue-50 rounded-lg p-4 mt-6">
                  <p className="text-sm text-blue-900 font-medium mb-2">💡 Pro Tip</p>
                  <p className="text-sm text-blue-800">
                    Consider prepaying your loan whenever possible to reduce your total interest burden.
                  </p>
                </div>
              </div>
            </div>

            {/* Information Section */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="text-blue-600" />
                Understanding Education Loans
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Covers tuition fees, accommodation, books, and other expenses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Moratorium period available during course + 6 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Tax benefits under Section 80E</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>No prepayment penalties in most cases</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Documents Required</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Admission letter from university</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Fee structure and cost estimates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Income proof of parents/guardians</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Academic records and test scores</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}