'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Users,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Award,
  Calendar,
  FileText,
  HelpCircle,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Menu,
  Bell,
  User,
  LogOut,
  Settings,
  Database,
  PieChart,
  TrendingDown,
  IndianRupee,
  Calculator,
  Edit,
  Send,
  MessageCircle,
  Target,
  TrendingUp,
  Star,
  GraduationCap,
  Building2,
  BarChart3,
  Home,
  ClipboardList,
  Globe,
  Info,
  Download,
  ExternalLink
} from 'lucide-react';
import { topBusinessSchools } from './comprehensive-data';

export default function BSchoolPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedRanking, setSelectedRanking] = useState('all');
  const [selectedFeeRange, setSelectedFeeRange] = useState('all');
  const [activeFilter, setActiveFilter] = useState('2-year');

  const schools = topBusinessSchools;

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.specializations.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRegion = selectedRegion === 'all' || school.region === selectedRegion;
    const matchesCountry = selectedCountry === 'all' || school.country === selectedCountry;
    
    const matchesDuration = selectedDuration === 'all' || 
                           (selectedDuration === '1-year' && (school.programs.mba.duration.includes('10') || school.programs.mba.duration.includes('1 year'))) ||
                           (selectedDuration === '2-year' && school.programs.mba.duration.includes('2 years'));

    const matchesRanking = selectedRanking === 'all' ||
                          (selectedRanking === 'top-10' && school.ranking.global <= 10) ||
                          (selectedRanking === 'top-25' && school.ranking.global <= 25) ||
                          (selectedRanking === 'top-50' && school.ranking.global <= 50);

    const matchesFeeRange = selectedFeeRange === 'all' ||
                           (selectedFeeRange === 'low' && getFeeInUSD(school) < 50000) ||
                           (selectedFeeRange === 'medium' && getFeeInUSD(school) >= 50000 && getFeeInUSD(school) <= 100000) ||
                           (selectedFeeRange === 'high' && getFeeInUSD(school) > 100000);

    const matchesActiveFilter = activeFilter === 'all' ||
                               (activeFilter === '1-year' && (school.programs.mba.duration.includes('10') || school.programs.mba.duration.includes('1 year'))) ||
                               (activeFilter === '2-year' && school.programs.mba.duration.includes('2 years'));

    return matchesSearch && matchesRegion && matchesCountry && matchesDuration && matchesRanking && matchesFeeRange && matchesActiveFilter;
  });

  const getFeeInUSD = (school: any) => {
    const fee = parseInt(school.programs.mba.tuitionFee.replace(/,/g, ''));
    if (school.programs.mba.currency === 'USD') return fee;
    if (school.programs.mba.currency === 'GBP') return fee * 1.25; // Approximate conversion
    if (school.programs.mba.currency === 'EUR') return fee * 1.1;
    if (school.programs.mba.currency === 'INR') return fee / 83; // Approximate conversion
    return fee;
  };

  const sidebarSections = {
    programs: [
      { icon: GraduationCap, label: "2-year MBA Programs", active: true },
      { icon: Clock, label: "1-year MBA Programs" },
      { icon: Target, label: "Program by Specialization" },
      { icon: Building2, label: "Executive MBA Programs" },
      { icon: Globe, label: "Global MBA Programs" }
    ],
    tools: [
      { icon: Calculator, label: "Score vs Percentile Calculator" },
      { icon: Calculator, label: "MBA Exam Calculator" },
      { icon: TrendingUp, label: "Compare Schools" },
      { icon: Star, label: "Wishlist Management" },
      { icon: BarChart3, label: "Cutoff Predictor" },
      { icon: Target, label: "Eligibility Checker" }
    ],
    guidance: [
      { icon: Users, label: "Selection Advisory" },
      { icon: Calendar, label: "Application Deadlines" },
      { icon: FileText, label: "MBA CET Cutoffs" },
      { icon: Award, label: "Scholarship Information" },
      { icon: IndianRupee, label: "Fee Calculator" }
    ],
    faqs: [
      { icon: HelpCircle, label: "General FAQs" },
      { icon: MessageCircle, label: "Ask Expert" },
      { icon: Phone, label: "Contact Support" },
      { icon: Info, label: "Admission Process" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar */}
      <div className="w-72 bg-white shadow-sm border-r border-gray-200 flex flex-col fixed h-full overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <h2 className="text-lg font-bold">AV B-School Zone</h2>
        </div>

        <div className="flex-1 p-4 space-y-6">
          {/* Programs Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Programs</h3>
            <div className="space-y-1">
              {sidebarSections.programs.map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors ${
                    item.active 
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tools Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Tools</h3>
            <div className="space-y-1">
              {sidebarSections.tools.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors text-gray-700 hover:bg-gray-50"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Guidance Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Guidance</h3>
            <div className="space-y-1">
              {sidebarSections.guidance.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors text-gray-700 hover:bg-gray-50"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* FAQs & Support Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Support</h3>
            <div className="space-y-1">
              {sidebarSections.faqs.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors text-gray-700 hover:bg-gray-50"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-72 overflow-auto">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md">
              Book a Free Counselling with AV
            </button>
          </div>
          <div className="flex items-center gap-4">
            <img src="/api/placeholder/60/40" alt="AV Logo" className="h-10" />
          </div>
        </div>

        {/* Content Header */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Business School Directory
              </h1>
              <p className="text-gray-600">
                Discover top business schools worldwide with comprehensive data and advanced filtering
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Showing</div>
              <div className="text-2xl font-bold text-blue-600">{filteredSchools.length}</div>
              <div className="text-sm text-gray-500">schools</div>
            </div>
          </div>

          {/* Advanced Search & Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search schools by name, location, or specialization..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
              {[
                { key: 'all', label: 'All Programs' },
                { key: '2-year', label: '2-Year MBA' },
                { key: '1-year', label: '1-Year MBA' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === tab.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Region Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Regions</option>
                  <option value="North America">North America</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia">Asia</option>
                  <option value="Oceania">Oceania</option>
                </select>
              </div>

              {/* Country Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Countries</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="India">India</option>
                  <option value="France">France</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="Spain">Spain</option>
                  <option value="Switzerland">Switzerland</option>
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">Any Duration</option>
                  <option value="1-year">1 Year</option>
                  <option value="2-year">2 Years</option>
                </select>
              </div>

              {/* Ranking Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Global Ranking</label>
                <select
                  value={selectedRanking}
                  onChange={(e) => setSelectedRanking(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Rankings</option>
                  <option value="top-10">Top 10</option>
                  <option value="top-25">Top 25</option>
                  <option value="top-50">Top 50</option>
                </select>
              </div>

              {/* Fee Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fee Range (USD)</label>
                <select
                  value={selectedFeeRange}
                  onChange={(e) => setSelectedFeeRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">Any Range</option>
                  <option value="low">Under $50K</option>
                  <option value="medium">$50K - $100K</option>
                  <option value="high">Above $100K</option>
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRegion('all');
                  setSelectedCountry('all');
                  setSelectedDuration('all');
                  setSelectedRanking('all');
                  setSelectedFeeRange('all');
                  setActiveFilter('all');
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Schools List */}
          <div className="space-y-6">
            {filteredSchools.map((school) => (
              <div key={school.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                          {school.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {school.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {school.location}
                            </span>
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                              Rank #{school.ranking.global}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Program</div>
                      <div className="font-semibold text-gray-900">{school.programs.mba.duration} MBA</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Total Fees</div>
                      <div className="font-semibold text-gray-900">{school.programs.mba.currency} {school.programs.mba.tuitionFee}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Avg Salary</div>
                      <div className="font-semibold text-green-600">{school.outcomes.averageSalary.currency} {school.outcomes.averageSalary.amount.toLocaleString()}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">GMAT Avg</div>
                      <div className="font-semibold text-gray-900">{school.admissionRequirements.gmat.averageScore || 'N/A'}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Student Body: </span>
                      <span className="font-medium">{school.statistics.studentBody}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">International: </span>
                      <span className="font-medium">{school.statistics.internationalStudents}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Accreditation: </span>
                      <span className="font-medium">{school.accreditation.join(', ')}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-2">Specializations:</div>
                    <div className="flex flex-wrap gap-2">
                      {school.specializations.slice(0, 4).map((spec, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                      {school.specializations.length > 4 && (
                        <span className="text-blue-600 text-xs font-medium px-3 py-1">
                          +{school.specializations.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}