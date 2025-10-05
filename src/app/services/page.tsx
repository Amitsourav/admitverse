'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const services = [
    'Education Loan',
    'ISB Application',
    'GDPI Preparation',
    'Study Abroad'
  ]

  const handleServiceSelect = (service: string) => {
    setSelectedService(service)
    setIsDropdownOpen(false)
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Services</h1>
        
        {/* Dropdown */}
        <div className="relative w-full max-w-md">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-between hover:border-emerald-500 transition-colors focus:outline-none focus:border-emerald-500"
          >
            <span className={selectedService ? 'text-gray-900' : 'text-gray-500'}>
              {selectedService || 'Select a Service'}
            </span>
            <ChevronDown 
              className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {services.map((service) => (
                <button
                  key={service}
                  onClick={() => handleServiceSelect(service)}
                  className="w-full px-4 py-3 text-left hover:bg-emerald-50 hover:text-emerald-600 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {service}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Service Content */}
        {selectedService && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {selectedService}
            </h2>
            <p className="text-gray-600">
              Content for {selectedService} will be added here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}