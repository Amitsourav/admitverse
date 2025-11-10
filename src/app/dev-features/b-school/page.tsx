'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Users,
  ChevronDown,
  BookOpen,
  Award,
  Calendar,
  FileText,
  HelpCircle,
  Phone,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  Star,
  GraduationCap,
  Building2,
  X
} from 'lucide-react';

export default function BSchoolPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedFeeRange, setSelectedFeeRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<any>(null);
  const [expandedSections, setExpandedSections] = useState({
    programs: true,
    specialization: false,
    guidance: false,
    cutoffs: false,
    advisory: false,
    waitlist: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const schools = [
    {
      id: 1,
      name: "Indian Institute of Management Ahmedabad",
      shortName: "IIM-A",
      type: "MBA",
      location: "Ahmedabad",
      country: "India",
      fees: "₹25,00,000",
      cutoff: "CAT: 99.5 %ile",
      ranking: "#1 in India",
      duration: "2 Years",
      specializations: ["Finance", "Marketing", "Strategy", "Operations"],
      placementAvg: "₹32.79 LPA",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Indian Institute of Management Bangalore",
      shortName: "IIM-B",
      type: "MBA + MBA BA",
      location: "Bangalore",
      country: "India",
      fees: "₹24,50,000",
      cutoff: "CAT: 99 %ile",
      ranking: "#2 in India",
      duration: "2 Years",
      specializations: ["Business Analytics", "Finance", "Consulting", "Product Management"],
      placementAvg: "₹35.31 LPA",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Indian Institute of Management Calcutta",
      shortName: "IIM-C",
      type: "MBA",
      location: "Kolkata",
      country: "India",
      fees: "₹23,00,000",
      cutoff: "CAT: 99 %ile",
      ranking: "#3 in India",
      duration: "2 Years",
      specializations: ["Finance", "Consulting", "Marketing", "Operations"],
      placementAvg: "₹34.20 LPA",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      name: "Faculty of Management Studies",
      shortName: "FMS Delhi",
      type: "MBA",
      location: "Delhi",
      country: "India",
      fees: "₹2,00,000",
      cutoff: "CAT: 98.20 %ile",
      ranking: "#4 in India",
      duration: "2 Years",
      specializations: ["Finance", "Marketing", "HR", "Operations"],
      placementAvg: "₹32.40 LPA",
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      name: "XLRI Jamshedpur",
      shortName: "XLRI",
      type: "BM/HRM",
      location: "Jamshedpur",
      country: "India",
      fees: "₹25,80,000",
      cutoff: "XAT: 96 %ile",
      ranking: "#5 in India",
      duration: "2 Years",
      specializations: ["HR Management", "Business Management", "Finance", "Marketing"],
      placementAvg: "₹30.73 LPA",
      image: "/api/placeholder/300/200"
    },
    {
      id: 6,
      name: "MDI Gurgaon",
      shortName: "MDI",
      type: "PGPM",
      location: "Gurgaon",
      country: "India",
      fees: "₹23,47,000",
      cutoff: "CAT: 95 %ile",
      ranking: "#6 in India",
      duration: "2 Years",
      specializations: ["Marketing", "Finance", "HR", "Operations", "Strategy"],
      placementAvg: "₹26.65 LPA",
      image: "/api/placeholder/300/200"
    },
    {
      id: 7,
      name: "SP Jain Institute of Management",
      shortName: "SPJIMR",
      type: "PGDM",
      location: "Mumbai",
      country: "India",
      fees: "₹20,00,000",
      cutoff: "CAT: 85 %ile",
      ranking: "#7 in India",
      duration: "2 Years",
      specializations: ["Finance", "Marketing", "Operations", "Information Management"],
      placementAvg: "₹32.06 LPA",
      image: "/api/placeholder/300/200"
    },
    {
      id: 8,
      name: "Indian Institute of Management Lucknow",
      shortName: "IIM-L",
      type: "PGP",
      location: "Lucknow",
      country: "India",
      fees: "₹20,00,000",
      cutoff: "CAT: 97 %ile",
      ranking: "#8 in India",
      duration: "2 Years",
      specializations: ["Finance", "Marketing", "Operations", "Strategy"],
      placementAvg: "₹31.03 LPA",
      image: "/api/placeholder/300/200"
    },
    {
      id: 9,
      name: "Indian Institute of Management Kozhikode",
      shortName: "IIM-K",
      type: "PGP",
      location: "Kozhikode",
      country: "India",
      fees: "₹20,50,000",
      cutoff: "CAT: 97 %ile",
      ranking: "#9 in India",
      duration: "2 Years",
      specializations: ["Finance", "Marketing", "IT & Systems", "Operations"],
      placementAvg: "₹29.50 LPA",
      image: "/api/placeholder/300/200"
    }
  ];

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.shortName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProgram = selectedProgram === 'all' || school.type.includes(selectedProgram);
    const matchesCountry = selectedCountry === 'all' || school.country === selectedCountry;
    
    return matchesSearch && matchesProgram && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex">
      {/* Enhanced Sidebar with Emerald Theme */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-white border-r border-emerald-100 fixed h-full overflow-y-auto shadow-xl"
      >
        <div className="p-6">
          <Link href="/" className="block mb-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent"
            >
              AV B-School Zone
            </motion.div>
          </Link>
          
          {/* Animated Sidebar Sections */}
          <div className="space-y-2">
            {/* MBA Programs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <button 
                onClick={() => toggleSection('programs')}
                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-emerald-50 rounded-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700" />
                  <span className="font-medium text-gray-800">2-year MBA Programs</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-emerald-600 transition-transform duration-300 ${expandedSections.programs ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {expandedSections.programs && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-6 mt-2 space-y-1 overflow-hidden"
                  >
                    <Link href="#" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200">1-year MBA Programs</Link>
                    <Link href="#" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200">Executive MBA</Link>
                    <Link href="#" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200">Online MBA</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Other Sidebar Items with Animations */}
            {[
              { icon: FileText, label: "Application Guidance", section: "guidance" },
              { icon: Award, label: "Cutoffs", section: "cutoffs" },
              { icon: Users, label: "Selection Advisory", section: "advisory" }
            ].map((item, index) => (
              <motion.div
                key={item.section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 2) }}
              >
                <button 
                  onClick={() => toggleSection(item.section)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-emerald-50 rounded-lg transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700" />
                    <span className="font-medium text-gray-800">{item.label}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-emerald-600 transition-transform duration-300 ${expandedSections[item.section] ? 'rotate-180' : ''}`} />
                </button>
              </motion.div>
            ))}

            {/* Quick Links */}
            {[
              { icon: BookOpen, label: "MBA from IITs" },
              { icon: FileText, label: "MBA CET Cutoffs" },
              { icon: Award, label: "Score vs Percentile" },
              { icon: Calendar, label: "Webinars & Videos" },
              { icon: DollarSign, label: "CAT @ Zero Fee" },
              { icon: HelpCircle, label: "FAQs & Connect" }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * (index + 5) }}
              >
                <Link href="#" className="flex items-center gap-2 px-3 py-2 text-gray-800 hover:bg-emerald-50 rounded-lg transition-all duration-300 group">
                  <item.icon className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700" />
                  <span className="font-medium group-hover:text-emerald-700">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Animated Sign In Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
          >
            Sign In
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Animated Header with Gradient */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-8 shadow-xl"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold mb-3"
            >
              AV Business School Zone
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-6"
            >
              <Link href="#" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                <span>Book a Free Counselling</span>
              </Link>
              <div className="flex items-center gap-2 text-white/90">
                <Sparkles className="w-5 h-5" />
                <span>AI-Powered Recommendations</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border-b border-emerald-100 px-8 py-4"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {[
              { icon: Building2, value: "150+", label: "Top B-Schools" },
              { icon: GraduationCap, value: "25K+", label: "Alumni Network" },
              { icon: TrendingUp, value: "98%", label: "Placement Rate" },
              { icon: Star, value: "4.9/5", label: "Student Rating" }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index + 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto p-8">
          {/* Description Card with Animation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-emerald-100"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Discover Your Perfect B-School Match
            </h2>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              Explore detailed information on top B-schools across India and globally. Our comprehensive database covers admission criteria, 
              fees, placements, rankings, and more to help you make an informed decision.
            </p>
            <div className="flex gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Target className="w-5 h-5" />
                Take Eligibility Test
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-all duration-300 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Get AI Recommendations
              </motion.button>
            </div>
          </motion.div>

          {/* Enhanced Search and Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-emerald-100"
          >
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by school name, location, or program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 bg-emerald-50 border-2 border-emerald-200 rounded-xl hover:bg-emerald-100 flex items-center gap-2 transition-all duration-300 font-semibold text-emerald-700"
              >
                <Filter className="w-5 h-5" />
                Filters
                {showFilters && (
                  <span className="ml-2 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">3</span>
                )}
              </motion.button>
            </div>

            {/* Expandable Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pt-4 border-t border-emerald-100 grid grid-cols-3 gap-4"
                >
                  <select 
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">All Programs</option>
                    <option value="MBA">MBA</option>
                    <option value="PGDM">PGDM</option>
                    <option value="PGPM">PGPM</option>
                    <option value="BM">Business Management</option>
                  </select>

                  <select 
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">All Countries</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                  </select>

                  <select 
                    value={selectedFeeRange}
                    onChange={(e) => setSelectedFeeRange(e.target.value)}
                    className="px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">All Fee Ranges</option>
                    <option value="low">Under ₹10 Lakhs</option>
                    <option value="medium">₹10-20 Lakhs</option>
                    <option value="high">Above ₹20 Lakhs</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Animated Schools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools.map((school, index) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-emerald-100 group cursor-pointer"
                onClick={() => setSelectedSchool(school)}
              >
                {/* School Header with Gradient */}
                <div className="h-32 bg-gradient-to-br from-emerald-400 via-green-400 to-emerald-500 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-emerald-700">{school.ranking}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{school.shortName}</h3>
                    <p className="text-sm opacity-90">{school.type}</p>
                  </div>
                </div>

                {/* School Details */}
                <div className="p-5">
                  <h4 className="font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {school.name}
                  </h4>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span>{school.location}, {school.country}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 text-emerald-500" />
                      <span>Fees: <span className="font-semibold text-gray-900">{school.fees}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4 text-emerald-500" />
                      <span>{school.cutoff}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span>Avg Package: <span className="font-semibold text-gray-900">{school.placementAvg}</span></span>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {school.specializations.slice(0, 3).map((spec) => (
                      <span
                        key={spec}
                        className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg text-xs font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                    {school.specializations.length > 3 && (
                      <span className="text-emerald-600 text-xs font-medium px-2 py-1">
                        +{school.specializations.length - 3} more
                      </span>
                    )}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredSchools.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No schools found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-16 mt-16"
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-3xl font-bold mb-4"
            >
              Ready to Start Your B-School Journey?
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-xl mb-8 text-white/90"
            >
              Get personalized guidance for your business school applications
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex gap-4 justify-center"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Get Free Consultation
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-800 transition-all duration-300 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                AI College Predictor
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* School Detail Modal */}
      <AnimatePresence>
        {selectedSchool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSchool(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSchool.name}</h2>
                  <p className="text-emerald-600 font-semibold">{selectedSchool.ranking}</p>
                </div>
                <button
                  onClick={() => setSelectedSchool(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Program Type</div>
                    <div className="font-semibold">{selectedSchool.type}</div>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Duration</div>
                    <div className="font-semibold">{selectedSchool.duration}</div>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Total Fees</div>
                    <div className="font-semibold">{selectedSchool.fees}</div>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Avg Placement</div>
                    <div className="font-semibold">{selectedSchool.placementAvg}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Specializations Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSchool.specializations.map((spec: string) => (
                      <span
                        key={spec}
                        className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Admission Requirements</h3>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-gray-700">{selectedSchool.cutoff}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                    Apply Now
                  </button>
                  <button className="flex-1 border-2 border-emerald-600 text-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300">
                    Download Brochure
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}