'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
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
  X,
  Bell,
  User,
  LogOut,
  Settings,
  Database,
  PieChart,
  TrendingDown,
  IndianRupee,
  Heart,
  GitCompare,
  Calculator,
  Edit,
  Send,
  MessageCircle,
  Mail,
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
  ExternalLink,
  Plus,
  Minus,
  RefreshCw,
  Wifi,
  WifiOff
} from 'lucide-react';
import { topBusinessSchools } from './comprehensive-data';

// Types for better error handling
interface ErrorState {
  hasError: boolean;
  errorMessage: string;
  errorType: 'network' | 'data' | 'api' | 'unknown';
  retryCount: number;
}

interface LoadingState {
  isLoading: boolean;
  isRetrying: boolean;
  operation?: string;
}

export default function BSchoolPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedRanking, setSelectedRanking] = useState('all');
  const [selectedFeeRange, setSelectedFeeRange] = useState('all');
  const [activeFilter, setActiveFilter] = useState('2-year');
  const [activeSection, setActiveSection] = useState('2-year-mba');
  const [wishlistSchools, setWishlistSchools] = useState<number[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [compareSchools, setCompareSchools] = useState<number[]>([]);
  
  // Error handling and retry states
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    errorMessage: '',
    errorType: 'unknown',
    retryCount: 0
  });
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    isRetrying: false,
    operation: undefined
  });
  const [schools, setSchools] = useState(topBusinessSchools);
  const [isOnline, setIsOnline] = useState(true);

  // Network status detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Retry utility function with exponential backoff
  const retryWithBackoff = useCallback(async (
    operation: () => Promise<any>,
    maxRetries: number = 3,
    operationName: string = 'operation'
  ): Promise<any> => {
    setLoadingState(prev => ({ ...prev, isLoading: true, operation: operationName }));
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 1) {
          setLoadingState(prev => ({ ...prev, isRetrying: true }));
          setErrorState(prev => ({ ...prev, retryCount: attempt - 1 }));
          
          // Exponential backoff: 1s, 2s, 4s...
          const delay = Math.min(1000 * Math.pow(2, attempt - 2), 5000);
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        const result = await operation();
        
        // Success - clear error state
        setErrorState({
          hasError: false,
          errorMessage: '',
          errorType: 'unknown',
          retryCount: 0
        });
        
        setLoadingState({
          isLoading: false,
          isRetrying: false,
          operation: undefined
        });
        
        return result;
      } catch (error) {
        console.error(`Attempt ${attempt} failed for ${operationName}:`, error);
        
        if (attempt === maxRetries) {
          // Final failure
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          const errorType = !isOnline ? 'network' : 
                           errorMessage.includes('fetch') ? 'api' : 
                           errorMessage.includes('JSON') ? 'data' : 'unknown';
          
          setErrorState({
            hasError: true,
            errorMessage,
            errorType,
            retryCount: maxRetries
          });
          
          setLoadingState({
            isLoading: false,
            isRetrying: false,
            operation: undefined
          });
          
          throw error;
        }
      }
    }
  }, [isOnline]);

  // Load schools data with retry
  const loadSchoolsData = useCallback(async () => {
    return retryWithBackoff(async () => {
      // Simulate API call (replace with actual API when available)
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      if (!isOnline) {
        throw new Error('No internet connection');
      }
      
      // Simulate potential failure
      if (Math.random() < 0.1) { // 10% chance of failure for demo
        throw new Error('Failed to fetch school data');
      }
      
      setSchools(topBusinessSchools);
      return topBusinessSchools;
    }, 3, 'Loading school data');
  }, [retryWithBackoff, isOnline]);

  // Load data on component mount
  useEffect(() => {
    loadSchoolsData().catch(() => {
      // Error is already handled in retryWithBackoff
      console.log('Failed to load schools data after retries');
    });
  }, [loadSchoolsData]);

  // Manual retry function
  const handleRetry = useCallback(() => {
    loadSchoolsData().catch(() => {
      console.log('Manual retry failed');
    });
  }, [loadSchoolsData]);

  // Clear error state
  const clearError = useCallback(() => {
    setErrorState({
      hasError: false,
      errorMessage: '',
      errorType: 'unknown',
      retryCount: 0
    });
  }, []);

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

  // Component functions for different sections
  const ScoreCalculator = () => {
    const [examType, setExamType] = useState('CAT');
    const [score, setScore] = useState('');
    const [result, setResult] = useState<{ percentile: number; interpretation: string } | null>(null);

    const calculatePercentile = () => {
      const numScore = parseInt(score);
      if (!numScore) {
        alert('Please enter a valid score');
        return;
      }

      let percentile = 0;
      let interpretation = '';

      // Simplified percentile calculation based on exam type
      switch(examType) {
        case 'CAT':
          if (numScore >= 99) percentile = 99.5;
          else if (numScore >= 95) percentile = 99;
          else if (numScore >= 85) percentile = 95;
          else if (numScore >= 75) percentile = 85;
          else if (numScore >= 60) percentile = 70;
          else percentile = Math.max(numScore * 0.8, 10);
          break;
        case 'GMAT':
          if (numScore >= 760) percentile = 99;
          else if (numScore >= 720) percentile = 95;
          else if (numScore >= 680) percentile = 85;
          else if (numScore >= 640) percentile = 70;
          else if (numScore >= 600) percentile = 55;
          else percentile = Math.max((numScore - 200) / 6, 5);
          break;
        case 'XAT':
          if (numScore >= 99) percentile = 99.5;
          else if (numScore >= 95) percentile = 99;
          else if (numScore >= 85) percentile = 95;
          else if (numScore >= 75) percentile = 85;
          else percentile = Math.max(numScore * 0.85, 15);
          break;
        case 'MAT':
          if (numScore >= 750) percentile = 99;
          else if (numScore >= 650) percentile = 95;
          else if (numScore >= 550) percentile = 85;
          else if (numScore >= 450) percentile = 70;
          else percentile = Math.max(numScore / 8, 20);
          break;
      }

      // Generate interpretation
      if (percentile >= 95) interpretation = 'Excellent! You\'re in the top 5% of test takers.';
      else if (percentile >= 85) interpretation = 'Great score! Good chances at top-tier schools.';
      else if (percentile >= 70) interpretation = 'Good score. Consider target and safety schools.';
      else if (percentile >= 50) interpretation = 'Average score. Focus on other application strengths.';
      else interpretation = 'Consider retaking the exam for better school options.';

      setResult({ percentile: Math.round(percentile * 10) / 10, interpretation });
    };

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-4">Score vs Percentile Calculator</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
              <select 
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>CAT</option>
                <option>GMAT</option>
                <option>XAT</option>
                <option>MAT</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Score</label>
              <input 
                type="number" 
                placeholder="Enter your score" 
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>
          <button 
            onClick={calculatePercentile}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Calculate Percentile
          </button>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Result</h4>
            {result ? (
              <div>
                <p className="text-blue-700 font-semibold text-lg mb-2">
                  Your estimated percentile: {result.percentile}%
                </p>
                <p className="text-blue-600 text-sm">{result.interpretation}</p>
              </div>
            ) : (
              <p className="text-blue-700">Your estimated percentile will appear here</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CompareSchools = () => {
    const [selectedSchoolIds, setSelectedSchoolIds] = useState<string[]>(['', '', '']);
    const [showComparison, setShowComparison] = useState(false);

    const handleSchoolSelect = (slot: number, schoolId: string) => {
      const newSelections = [...selectedSchoolIds];
      newSelections[slot] = schoolId;
      setSelectedSchoolIds(newSelections);
    };

    const getSelectedSchools = () => {
      return selectedSchoolIds
        .filter(id => id !== '')
        .map(id => schools.find(school => school.id.toString() === id))
        .filter(school => school !== undefined);
    };

    const handleCompare = () => {
      const selected = getSelectedSchools();
      if (selected.length < 2) {
        alert('Please select at least 2 schools to compare');
        return;
      }
      setShowComparison(true);
    };

    const resetComparison = () => {
      setShowComparison(false);
      setSelectedSchoolIds(['', '', '']);
    };

    if (showComparison) {
      const selectedSchools = getSelectedSchools();
      return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">School Comparison</h3>
            <button 
              onClick={resetComparison}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              New Comparison
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 font-semibold bg-gray-50">Criteria</th>
                  {selectedSchools.map((school, index) => (
                    <th key={index} className="text-center p-4 font-semibold bg-blue-50 min-w-64">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mb-2">
                          {school.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                        </div>
                        <div className="font-bold text-sm">{school.name}</div>
                        <div className="text-xs text-gray-600">{school.location}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium bg-gray-50">Global Ranking</td>
                  {selectedSchools.map((school, index) => (
                    <td key={index} className="text-center p-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        #{school.ranking.global}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium bg-gray-50">Program Duration</td>
                  {selectedSchools.map((school, index) => (
                    <td key={index} className="text-center p-4">{school.programs.mba.duration}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium bg-gray-50">Tuition Fee</td>
                  {selectedSchools.map((school, index) => (
                    <td key={index} className="text-center p-4 font-semibold text-green-600">
                      {school.programs.mba.currency} {school.programs.mba.tuitionFee}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium bg-gray-50">Average Salary</td>
                  {selectedSchools.map((school, index) => (
                    <td key={index} className="text-center p-4 font-semibold">
                      {school.outcomes.averageSalary.currency} {school.outcomes.averageSalary.amount.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium bg-gray-50">GMAT Average</td>
                  {selectedSchools.map((school, index) => (
                    <td key={index} className="text-center p-4">{school.admissionRequirements.gmat.averageScore || 'N/A'}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium bg-gray-50">Employment Rate</td>
                  {selectedSchools.map((school, index) => (
                    <td key={index} className="text-center p-4 font-semibold text-green-600">{school.outcomes.employmentRate}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium bg-gray-50">Student Body</td>
                  {selectedSchools.map((school, index) => (
                    <td key={index} className="text-center p-4">{school.statistics.studentBody}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium bg-gray-50">International Students</td>
                  {selectedSchools.map((school, index) => (
                    <td key={index} className="text-center p-4">{school.statistics.internationalStudents}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium bg-gray-50">Work Experience Required</td>
                  {selectedSchools.map((school, index) => (
                    <td key={index} className="text-center p-4">{school.admissionRequirements.workExperience.minYears}+ years</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium bg-gray-50">Accreditation</td>
                  {selectedSchools.map((school, index) => (
                    <td key={index} className="text-center p-4">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {school.accreditation.map((acc, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {acc}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-medium bg-gray-50">Top Specializations</td>
                  {selectedSchools.map((school, index) => (
                    <td key={index} className="text-center p-4">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {school.specializations.slice(0, 3).map((spec, idx) => (
                          <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold mb-4">Compare Business Schools</h3>
        <div className="space-y-4">
          <p className="text-gray-600">Select up to 3 schools to compare side by side</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((slot) => (
              <div key={slot} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <div className="text-gray-500">School {slot + 1}</div>
                <select 
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={selectedSchoolIds[slot]}
                  onChange={(e) => handleSchoolSelect(slot, e.target.value)}
                >
                  <option value="">Select School</option>
                  {schools.map((school) => (
                    <option key={school.id} value={school.id}>{school.name}</option>
                  ))}
                </select>
                {selectedSchoolIds[slot] && (
                  <div className="mt-2 text-xs text-green-600 font-medium">
                    ✓ Selected
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button 
              onClick={handleCompare}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={getSelectedSchools().length < 2}
            >
              Compare Selected Schools ({getSelectedSchools().length}/3)
            </button>
          </div>
        </div>
      </div>
    );
  };

  const MBAExamCalculator = () => {
    const [examType, setExamType] = useState('GMAT');
    const [targetScore, setTargetScore] = useState('');
    const [verbalScore, setVerbalScore] = useState('');
    const [quantScore, setQuantScore] = useState('');
    const [overallScore, setOverallScore] = useState('');
    const [result, setResult] = useState<{
      verbalPercentile: number;
      quantPercentile: number;
      overallPercentile: number;
      recommendations: string[];
    } | null>(null);

    const calculateScore = () => {
      const verbal = parseInt(verbalScore);
      const quant = parseInt(quantScore);
      const total = parseInt(overallScore);

      if (!verbal && !quant && !total) {
        alert('Please enter at least verbal and quantitative scores or overall score');
        return;
      }

      let verbalPercentile = 0;
      let quantPercentile = 0;
      let overallPercentile = 0;
      let recommendations: string[] = [];

      // Calculate based on exam type
      if (examType === 'GMAT') {
        // GMAT scoring logic
        if (verbal) {
          if (verbal >= 42) verbalPercentile = 95;
          else if (verbal >= 38) verbalPercentile = 85;
          else if (verbal >= 34) verbalPercentile = 70;
          else if (verbal >= 30) verbalPercentile = 55;
          else verbalPercentile = Math.max(verbal * 1.5, 10);
        }
        
        if (quant) {
          if (quant >= 50) quantPercentile = 85;
          else if (quant >= 47) quantPercentile = 70;
          else if (quant >= 44) quantPercentile = 55;
          else if (quant >= 40) quantPercentile = 40;
          else quantPercentile = Math.max(quant * 1.2, 10);
        }

        if (total) {
          if (total >= 760) overallPercentile = 99;
          else if (total >= 720) overallPercentile = 95;
          else if (total >= 680) overallPercentile = 85;
          else if (total >= 640) overallPercentile = 70;
          else if (total >= 600) overallPercentile = 55;
          else overallPercentile = Math.max((total - 200) / 6, 5);

          // School recommendations based on GMAT score
          if (total >= 720) {
            recommendations = ['Harvard Business School', 'MIT Sloan', 'Columbia Business School', 'Stanford GSB'];
          } else if (total >= 680) {
            recommendations = ['NYU Stern', 'Georgetown McDonough', 'Cornell Johnson', 'UCLA Anderson'];
          } else if (total >= 640) {
            recommendations = ['Boston University', 'University of Rochester', 'Georgia Tech', 'University of Florida'];
          } else if (total >= 600) {
            recommendations = ['Arizona State', 'University of Iowa', 'University of Utah', 'Auburn University'];
          } else {
            recommendations = ['Consider retaking GMAT', 'Look at regional programs', 'Focus on other application strengths'];
          }
        }
      } else if (examType === 'CAT') {
        // CAT scoring logic (percentile-based)
        if (verbal && quant) {
          const avgSectional = (verbal + quant) / 2;
          if (avgSectional >= 95) verbalPercentile = quantPercentile = 95;
          else if (avgSectional >= 85) verbalPercentile = quantPercentile = 85;
          else if (avgSectional >= 75) verbalPercentile = quantPercentile = 75;
          else verbalPercentile = quantPercentile = avgSectional;
        }
        
        if (total) {
          overallPercentile = Math.min(total, 100);
          
          // IIM recommendations based on CAT percentile
          if (total >= 99) {
            recommendations = ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta'];
          } else if (total >= 95) {
            recommendations = ['IIM Lucknow', 'IIM Kozhikode', 'IIM Indore'];
          } else if (total >= 85) {
            recommendations = ['IIM Kashipur', 'IIM Udaipur', 'IIM Tiruchirappalli'];
          } else if (total >= 75) {
            recommendations = ['ISB Hyderabad', 'XLRI', 'FMS Delhi', 'MDI Gurgaon'];
          } else {
            recommendations = ['Regional IIMs', 'Good state universities', 'Consider other entrance exams'];
          }
        }
      }

      setResult({
        verbalPercentile: Math.round(verbalPercentile),
        quantPercentile: Math.round(quantPercentile), 
        overallPercentile: Math.round(overallPercentile),
        recommendations
      });
    };

    const resetCalculator = () => {
      setTargetScore('');
      setVerbalScore('');
      setQuantScore('');
      setOverallScore('');
      setResult(null);
    };

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold mb-4">MBA Exam Calculator</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
              <select 
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>GMAT</option>
                <option>CAT</option>
                <option>XAT</option>
                <option>SNAP</option>
                <option>NMAT</option>
                <option>MAT</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Score</label>
              <input 
                type="number" 
                placeholder="Enter target score" 
                value={targetScore}
                onChange={(e) => setTargetScore(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Verbal Score</label>
              <input 
                type="number" 
                placeholder={examType === 'GMAT' ? '0-51' : 'Percentile'} 
                value={verbalScore}
                onChange={(e) => setVerbalScore(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantitative Score</label>
              <input 
                type="number" 
                placeholder={examType === 'GMAT' ? '0-51' : 'Percentile'} 
                value={quantScore}
                onChange={(e) => setQuantScore(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Overall Score</label>
              <input 
                type="number" 
                placeholder={examType === 'GMAT' ? '200-800' : 'Percentile'} 
                value={overallScore}
                onChange={(e) => setOverallScore(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={calculateScore}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Calculate Score
            </button>
            <button 
              onClick={resetCalculator}
              className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">Score Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Verbal Percentile:</span>
                  <span className="font-medium">{result ? result.verbalPercentile + '%' : '--'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quant Percentile:</span>
                  <span className="font-medium">{result ? result.quantPercentile + '%' : '--'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Overall Percentile:</span>
                  <span className="font-medium">{result ? result.overallPercentile + '%' : '--'}</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">School Recommendations</h4>
              <div className="space-y-2 text-sm">
                {result && result.recommendations.length > 0 ? (
                  result.recommendations.map((school, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{school}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Good fit schools will appear here</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Based on your score range</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Exam Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Score Range:</span>
                <span className="ml-2 text-gray-600">
                  {examType === 'GMAT' ? '200-800' : examType === 'CAT' ? '0-100 percentile' : '0-100 percentile'}
                </span>
              </div>
              <div>
                <span className="font-medium">Average Score:</span>
                <span className="ml-2 text-gray-600">
                  {examType === 'GMAT' ? '565' : examType === 'CAT' ? '50th percentile' : '50th percentile'}
                </span>
              </div>
              <div>
                <span className="font-medium">Test Duration:</span>
                <span className="ml-2 text-gray-600">
                  {examType === 'GMAT' ? '3.5 hours' : examType === 'CAT' ? '3 hours' : '2-3 hours'}
                </span>
              </div>
              <div>
                <span className="font-medium">Valid For:</span>
                <span className="ml-2 text-gray-600">
                  {examType === 'GMAT' ? '5 years' : examType === 'CAT' ? '1 year' : '1-5 years'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WishlistManager = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-xl font-bold mb-4">My Wishlist ({wishlistSchools.length} schools)</h3>
      <div className="space-y-4">
        {wishlistSchools.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No schools in your wishlist yet</p>
            <p className="text-sm">Browse schools and click the star to add them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {schools.filter(school => wishlistSchools.includes(school.id)).map((school) => (
              <div key={school.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                    {school.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{school.name}</h4>
                    <p className="text-sm text-gray-600">{school.location}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setWishlistSchools(prev => prev.filter(id => id !== school.id))}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const CutoffPredictor = () => {
    const [exam, setExam] = useState('CAT');
    const [score, setScore] = useState('');
    const [category, setCategory] = useState('General');
    const [workExperience, setWorkExperience] = useState('');
    const [predictions, setPredictions] = useState<{
      safeSchools: string[];
      moderateSchools: string[];
      reachSchools: string[];
      admissionChance: string;
    } | null>(null);

    const predictAdmissionChances = () => {
      const numScore = parseInt(score);
      const experience = parseInt(workExperience) || 0;

      if (!numScore) {
        alert('Please enter your exam score');
        return;
      }

      let adjustedScore = numScore;
      let safeSchools: string[] = [];
      let moderateSchools: string[] = [];
      let reachSchools: string[] = [];
      let admissionChance = '';

      // Category-based score adjustment
      if (category === 'OBC') {
        adjustedScore = numScore * 0.95; // 5% adjustment
      } else if (category === 'SC') {
        adjustedScore = numScore * 0.85; // 15% adjustment
      } else if (category === 'ST') {
        adjustedScore = numScore * 0.80; // 20% adjustment
      }

      // Work experience boost
      if (experience >= 3) {
        adjustedScore += (exam === 'CAT' ? 2 : 20);
      }

      // Predict based on exam type
      if (exam === 'CAT') {
        if (adjustedScore >= 99) {
          admissionChance = '95%+ chance at top IIMs';
          safeSchools = ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta'];
          moderateSchools = ['ISB Hyderabad', 'XLRI Jamshedpur'];
          reachSchools = ['Top International Schools'];
        } else if (adjustedScore >= 95) {
          admissionChance = '85%+ chance at good IIMs';
          safeSchools = ['IIM Lucknow', 'IIM Kozhikode', 'IIM Indore'];
          moderateSchools = ['IIM Ahmedabad', 'IIM Bangalore'];
          reachSchools = ['Harvard Business School', 'Stanford GSB'];
        } else if (adjustedScore >= 90) {
          admissionChance = '70%+ chance at newer IIMs';
          safeSchools = ['IIM Kashipur', 'IIM Udaipur', 'IIM Tiruchirappalli'];
          moderateSchools = ['IIM Lucknow', 'IIM Kozhikode'];
          reachSchools = ['IIM Ahmedabad', 'IIM Bangalore'];
        } else if (adjustedScore >= 80) {
          admissionChance = '60%+ chance at regional schools';
          safeSchools = ['MDI Gurgaon', 'FMS Delhi', 'XLRI'];
          moderateSchools = ['Newer IIMs'];
          reachSchools = ['Top IIMs'];
        } else {
          admissionChance = 'Consider other entrance exams';
          safeSchools = ['Regional business schools', 'Private universities'];
          moderateSchools = ['Tier-2 colleges'];
          reachSchools = ['IIMs with lower cutoffs'];
        }
      } else if (exam === 'XAT') {
        if (adjustedScore >= 99) {
          admissionChance = '90%+ chance at XLRI';
          safeSchools = ['XLRI Jamshedpur', 'SPJIMR Mumbai'];
          moderateSchools = ['IMT Ghaziabad', 'TAPMI'];
          reachSchools = ['IIMs', 'ISB'];
        } else if (adjustedScore >= 95) {
          admissionChance = '75%+ chance at good schools';
          safeSchools = ['IMT Ghaziabad', 'TAPMI Manipal'];
          moderateSchools = ['XLRI Jamshedpur'];
          reachSchools = ['SPJIMR Mumbai'];
        } else if (adjustedScore >= 85) {
          admissionChance = '60%+ chance at decent schools';
          safeSchools = ['BIM Trichy', 'FORE New Delhi'];
          moderateSchools = ['IMT Ghaziabad'];
          reachSchools = ['XLRI'];
        }
      } else if (exam === 'MAT') {
        if (adjustedScore >= 95) {
          admissionChance = '80%+ chance at good colleges';
          safeSchools = ['JBIMS Mumbai', 'Sydenham Institute'];
          moderateSchools = ['K.J. Somaiya', 'Welingkar'];
          reachSchools = ['IIMs', 'XLRI'];
        } else if (adjustedScore >= 85) {
          admissionChance = '70%+ chance at decent colleges';
          safeSchools = ['MET Mumbai', 'PUMBA Pune'];
          moderateSchools = ['JBIMS Mumbai'];
          reachSchools = ['Top private schools'];
        }
      }

      setPredictions({
        safeSchools,
        moderateSchools, 
        reachSchools,
        admissionChance
      });
    };

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold mb-4">MBA Cutoff Predictor</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam</label>
              <select 
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>CAT</option>
                <option>XAT</option>
                <option>MAT</option>
                <option>SNAP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Score</label>
              <input 
                type="number" 
                placeholder={exam === 'CAT' ? 'Percentile (0-100)' : exam === 'MAT' ? 'Score (200-800)' : 'Percentile (0-100)'} 
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>General</option>
                <option>OBC</option>
                <option>SC</option>
                <option>ST</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Work Experience</label>
              <input 
                type="number" 
                placeholder="Years" 
                value={workExperience}
                onChange={(e) => setWorkExperience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>
          <button 
            onClick={predictAdmissionChances}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Predict Admission Chances
          </button>
          
          {predictions ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Admission Prediction</h4>
                <p className="text-green-700 font-medium">{predictions.admissionChance}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Safe Schools (High Chance)
                  </h5>
                  <ul className="space-y-1 text-sm text-blue-700">
                    {predictions.safeSchools.map((school, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                        {school}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h5 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Moderate Schools (Good Chance)
                  </h5>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    {predictions.moderateSchools.map((school, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-yellow-600 rounded-full"></span>
                        {school}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h5 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Reach Schools (Stretch Goals)
                  </h5>
                  <ul className="space-y-1 text-sm text-red-700">
                    {predictions.reachSchools.map((school, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                        {school}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-semibold text-gray-800 mb-2">Important Notes</h5>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Predictions are based on historical data and general trends</li>
                  <li>• Actual admissions depend on multiple factors including essays, interview performance, and overall profile</li>
                  <li>• Consider applying to schools across all three categories for best results</li>
                  <li>• Work experience and achievements can significantly improve your chances</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Predicted Schools</h4>
              <p className="text-green-700">Your admission predictions will appear here</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const EligibilityChecker = () => {
    const [graduationPercentage, setGraduationPercentage] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    const [examScore, setExamScore] = useState('');
    const [targetSchool, setTargetSchool] = useState('');
    const [eligibilityResult, setEligibilityResult] = useState<{
      isEligible: boolean;
      eligibilityScore: number;
      requirements: string[];
      recommendations: string[];
      missingRequirements: string[];
    } | null>(null);

    const checkEligibility = () => {
      const gradPercent = parseFloat(graduationPercentage);
      const experience = parseInt(workExperience) || 0;
      const score = parseInt(examScore);

      if (!gradPercent || !targetSchool) {
        alert('Please fill in graduation percentage and select a target school');
        return;
      }

      const selectedSchool = schools.find(school => school.name === targetSchool);
      if (!selectedSchool) {
        alert('Please select a valid school');
        return;
      }

      let eligibilityScore = 0;
      let requirements: string[] = [];
      let recommendations: string[] = [];
      let missingRequirements: string[] = [];

      // Check graduation percentage (typically 50%+ required)
      if (gradPercent >= 50) {
        eligibilityScore += 25;
        requirements.push(`✓ Graduation percentage: ${gradPercent}% (Minimum 50% required)`);
      } else {
        missingRequirements.push(`Graduation percentage is below 50% (Current: ${gradPercent}%)`);
      }

      // Check work experience
      const minExperience = selectedSchool.admissionRequirements.workExperience.minYears || 2;
      if (experience >= minExperience) {
        eligibilityScore += 25;
        requirements.push(`✓ Work experience: ${experience} years (Minimum ${minExperience} years required)`);
      } else {
        missingRequirements.push(`Need ${minExperience - experience} more years of work experience`);
      }

      // Check exam score (if provided)
      if (score) {
        const avgScore = selectedSchool.admissionRequirements.gmat.averageScore;
        if (avgScore && score >= avgScore * 0.9) { // 90% of average score
          eligibilityScore += 30;
          requirements.push(`✓ Entrance exam score: ${score} (Competitive for this school)`);
        } else if (avgScore && score >= avgScore * 0.8) { // 80% of average score
          eligibilityScore += 20;
          requirements.push(`✓ Entrance exam score: ${score} (Meets minimum requirements)`);
          recommendations.push('Consider retaking the exam for better chances');
        } else {
          eligibilityScore += 10;
          requirements.push(`⚠ Entrance exam score: ${score} (Below average for this school)`);
          missingRequirements.push('Entrance exam score needs improvement');
        }
      } else {
        eligibilityScore += 15;
        requirements.push('⚠ No entrance exam score provided');
        missingRequirements.push('Take GMAT/GRE or relevant entrance exam');
      }

      // Additional checks based on school ranking
      if (selectedSchool.ranking.global <= 10) {
        eligibilityScore += 20;
        recommendations.push('Top-tier school: Ensure strong essays and recommendations');
        recommendations.push('Consider leadership experience and unique achievements');
      } else if (selectedSchool.ranking.global <= 25) {
        eligibilityScore += 15;
        recommendations.push('Competitive school: Focus on demonstrating clear career goals');
      } else {
        eligibilityScore += 20;
        recommendations.push('Good chance of admission with current profile');
      }

      // General recommendations
      if (experience < 3) {
        recommendations.push('Consider gaining more work experience before applying');
      }
      if (gradPercent < 70) {
        recommendations.push('Consider additional certifications to strengthen academic profile');
      }

      recommendations.push('Prepare strong essays highlighting your unique value proposition');
      recommendations.push('Secure strong recommendation letters from supervisors');
      recommendations.push('Consider applying to multiple schools across different tiers');

      const isEligible = eligibilityScore >= 60 && missingRequirements.length <= 1;

      setEligibilityResult({
        isEligible,
        eligibilityScore,
        requirements,
        recommendations,
        missingRequirements
      });
    };

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold mb-4">MBA Eligibility Checker</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Percentage</label>
              <input 
                type="number" 
                placeholder="%" 
                value={graduationPercentage}
                onChange={(e) => setGraduationPercentage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Work Experience</label>
              <input 
                type="number" 
                placeholder="Years" 
                value={workExperience}
                onChange={(e) => setWorkExperience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Entrance Exam Score</label>
              <input 
                type="number" 
                placeholder="GMAT/GRE Score" 
                value={examScore}
                onChange={(e) => setExamScore(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target School</label>
              <select 
                value={targetSchool}
                onChange={(e) => setTargetSchool(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select School</option>
                {schools.map((school) => (
                  <option key={school.id} value={school.name}>{school.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <button 
            onClick={checkEligibility}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Check Eligibility
          </button>

          {eligibilityResult && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${
                eligibilityResult.isEligible 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <h4 className={`font-semibold mb-2 ${
                  eligibilityResult.isEligible ? 'text-green-800' : 'text-yellow-800'
                }`}>
                  Eligibility Result
                </h4>
                <div className="flex items-center gap-4">
                  <span className={`font-medium ${
                    eligibilityResult.isEligible ? 'text-green-700' : 'text-yellow-700'
                  }`}>
                    {eligibilityResult.isEligible ? '✅ Eligible' : '⚠️ Partially Eligible'}
                  </span>
                  <span className="text-sm text-gray-600">
                    Eligibility Score: {eligibilityResult.eligibilityScore}/100
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-800 mb-3">Requirements Status</h5>
                  <ul className="space-y-2 text-sm">
                    {eligibilityResult.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-blue-700">
                        <span className="text-xs mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h5 className="font-semibold text-purple-800 mb-3">Recommendations</h5>
                  <ul className="space-y-2 text-sm">
                    {eligibilityResult.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-purple-700">
                        <span className="text-xs mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {eligibilityResult.missingRequirements.length > 0 && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h5 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Missing Requirements
                  </h5>
                  <ul className="space-y-2 text-sm">
                    {eligibilityResult.missingRequirements.map((missing, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-red-700">
                        <span className="text-xs mt-1">•</span>
                        <span>{missing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-semibold text-gray-800 mb-2">Next Steps</h5>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Address any missing requirements listed above</li>
                  <li>• Research school-specific requirements and deadlines</li>
                  <li>• Prepare application essays and recommendation letters</li>
                  <li>• Consider applying to multiple schools with varying selectivity</li>
                  <li>• Schedule interviews and campus visits if possible</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const FeeCalculator = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-xl font-bold mb-4">MBA Fee Calculator</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Select School</option>
              {schools.map((school) => (
                <option key={school.id}>{school.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Living Expenses/Month</label>
            <input type="number" placeholder="Amount" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600">Tuition Fee</div>
            <div className="text-xl font-bold text-blue-800">$0</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-green-600">Total Cost</div>
            <div className="text-xl font-bold text-green-800">$0</div>
          </div>
        </div>
      </div>
    </div>
  );

  const ApplicationDeadlines = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-xl font-bold mb-4">Application Deadlines</h3>
      <div className="space-y-4">
        {schools.slice(0, 8).map((school) => (
          <div key={school.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                {school.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
              </div>
              <div>
                <h4 className="font-semibold">{school.shortName}</h4>
                <p className="text-sm text-gray-600">{school.location}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-red-600">Round 1</div>
              <div className="text-sm text-gray-600">{school.applicationDeadlines?.round1 || 'TBA'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ScholarshipInfo = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-xl font-bold mb-4">Scholarship Information</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schools.slice(0, 6).map((school) => (
            <div key={school.id} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">{school.shortName}</h4>
              <div className="space-y-1">
                {school.scholarships?.slice(0, 3).map((scholarship, idx) => (
                  <div key={idx} className="text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {scholarship}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const FAQSection = () => {
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
    
    const faqs = [
      {
        category: "GMAT & Test Requirements",
        questions: [
          {
            question: "What GMAT score do I need for top MBA programs in 2025?",
            answer: "Top MBA programs typically have average GMAT scores ranging from 700-740. Harvard Business School averages around 730, while MIT, Columbia, and Dartmouth require 720+. However, most schools don't set minimum scores and take a holistic approach to admissions."
          },
          {
            question: "Can I get GMAT waivers for MBA applications?",
            answer: "Yes, many schools offer test waivers. Cornell Johnson waives for STEM/business graduates with 3.0+ GPA or CPA/CFA holders. NYU Stern and other schools also provide waivers for qualified candidates. Each school has specific criteria."
          },
          {
            question: "Is GRE accepted instead of GMAT?",
            answer: "Most business schools accept both GMAT and GRE scores without preference. The choice between tests should be based on your strengths and which test format suits you better."
          }
        ]
      },
      {
        category: "Application Process",
        questions: [
          {
            question: "When do MBA application deadlines start for 2025-2026?",
            answer: "Applications typically open in July-August 2024. Round 1 deadlines are usually in September-October, Round 2 in January, and Round 3 in March-April. Start preparing 18-20 months before enrollment."
          },
          {
            question: "What essays are required for MBA applications?",
            answer: "Common essay types include: Goals essays (career aspirations), Personal statements (who you are), Behavioral questions (past experiences), and Contribution essays (value you'll add to the program). Each school has unique prompts."
          },
          {
            question: "How many recommendation letters do I need?",
            answer: "Most MBA programs require 2-3 letters of recommendation, typically from current or former supervisors who can speak to your professional achievements, leadership potential, and character."
          }
        ]
      },
      {
        category: "Costs & Financial Aid",
        questions: [
          {
            question: "How much does an MBA cost in 2025?",
            answer: "Total MBA costs range from $150,000-$250,000+ for top programs. Tuition alone is $50,000-$80,000 annually, plus $15,000-$30,000 for living expenses. European programs (12-15 months) cost less than US programs (24 months)."
          },
          {
            question: "Are scholarships available for international students?",
            answer: "Yes! About 50% of students at top schools receive merit-based aid. Harvard averages $46,000/year, Stanford $47,000/year. Merit scholarships, need-based aid, and fellowships are available for qualified international candidates."
          },
          {
            question: "Can international students get loans without US co-signers?",
            answer: "Yes, lenders like Prodigy Finance, MPOWER Financing, and Juno offer no-cosigner loans to international students at select business schools. Many schools also have partnerships with banks."
          }
        ]
      },
      {
        category: "Work Experience & Admissions",
        questions: [
          {
            question: "How much work experience do I need for MBA admission?",
            answer: "Most programs prefer 2-5 years of work experience, with the average being 4-5 years. Some programs accept fresh graduates, while Executive MBAs typically require 8-10+ years of experience."
          },
          {
            question: "What if I have a low GPA but strong work experience?",
            answer: "Business schools take a holistic approach. Strong GMAT scores, exceptional work experience, leadership roles, and compelling essays can compensate for a lower undergraduate GPA. Consider taking additional coursework to demonstrate academic ability."
          }
        ]
      },
      {
        category: "International Students",
        questions: [
          {
            question: "What visa do I need to study MBA in the US?",
            answer: "International MBA students typically need an F-1 student visa. You must be accepted into a SEVP-certified program. Start the visa application process immediately after admission acceptance."
          },
          {
            question: "Can I work in the US after completing my MBA?",
            answer: "Yes! F-1 students get 12 months of Optional Practical Training (OPT). STEM-designated MBA programs offer 36 months total. Many graduates transition to H-1B visas for longer-term work authorization."
          },
          {
            question: "What are the English proficiency requirements?",
            answer: "Most schools require TOEFL (100+ iBT) or IELTS (7.0+) scores. Some waive this requirement if you've studied in English or are from English-speaking countries. Check specific school requirements."
          }
        ]
      },
      {
        category: "Program Selection",
        questions: [
          {
            question: "What's the difference between 1-year and 2-year MBA programs?",
            answer: "2-year programs (common in US) include summer internships and more networking time. 1-year programs (common in Europe) are intensive and faster to market. Choose based on career goals and experience level."
          },
          {
            question: "Should I choose a specialized MBA or general MBA?",
            answer: "General MBAs offer broader exposure and flexibility. Specialized MBAs (Finance, Tech, Healthcare) provide deeper industry knowledge. Consider your career goals, current experience, and desired pivot magnitude."
          },
          {
            question: "How important are MBA rankings?",
            answer: "Rankings matter for recruiting and brand recognition, especially for consulting and investment banking. However, consider fit factors like culture, location, specializations, and alumni network strength in your target industry."
          }
        ]
      }
    ];

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h3>
          <p className="text-gray-600">Get answers to common questions about MBA admissions, costs, and requirements for 2025.</p>
        </div>
        
        <div className="space-y-6">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="border-b border-gray-100 pb-6 last:border-b-0">
              <h4 className="text-lg font-semibold text-blue-600 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                {category.category}
              </h4>
              <div className="space-y-3">
                {category.questions.map((faq, faqIndex) => {
                  const uniqueIndex = categoryIndex * 100 + faqIndex;
                  return (
                    <div 
                      key={faqIndex} 
                      className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors"
                    >
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === uniqueIndex ? null : uniqueIndex)}
                        className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                      >
                        <h5 className="font-medium text-gray-900 pr-4">{faq.question}</h5>
                        <ChevronDown 
                          className={`w-5 h-5 text-gray-500 transition-transform ${
                            expandedFAQ === uniqueIndex ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      {expandedFAQ === uniqueIndex && (
                        <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Still have questions?</h4>
              <p className="text-sm text-blue-700 mb-3">
                Can't find what you're looking for? Our admissions consultants are here to help with personalized guidance.
              </p>
              <Link 
                href="/#book-counseling"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Contact Our Experts
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ContactSupport = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-xl font-bold mb-4">Contact Support</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold">Phone Support</h4>
            <p className="text-sm text-gray-600">+91 99826 27466</p>
            <p className="text-xs text-gray-500">Mon-Fri: 9AM-6PM IST</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold">Live Chat</h4>
            <p className="text-sm text-gray-600">Available for counseling</p>
            <Link 
              href="/#book-counseling"
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm transition-colors inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              Start Chat
            </Link>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start gap-3 mb-4">
            <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold">Email Support</h4>
              <p className="text-sm text-gray-600">admission@admitverse.com</p>
              <p className="text-xs text-gray-500">We reply within 24 hours</p>
            </div>
          </div>
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold">Visit Our Office</h4>
              <p className="text-sm text-gray-600">WorkWorm Co-working Space, NHPC Chowk</p>
              <p className="text-sm text-gray-600">Block A, DLF Industrial Area, Sector 32</p>
              <p className="text-sm text-gray-600">Faridabad, Haryana 121003, India</p>
              <p className="text-xs text-gray-500">Visit by appointment</p>
            </div>
          </div>
          <div className="flex items-start gap-3 mb-4">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold">Office Hours</h4>
              <p className="text-sm text-gray-600">Monday - Friday: 9AM - 6PM</p>
              <p className="text-sm text-gray-600">Saturday: 10AM - 4PM</p>
              <p className="text-xs text-gray-500">IST (Indian Standard Time)</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Get Detailed Consultation</h4>
          <p className="text-sm text-gray-600 mb-4">
            Connect with our expert counsellors for personalized B-school guidance and comprehensive support throughout your MBA journey.
          </p>
          <Link 
            href="/#book-counseling"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2 w-full justify-center"
          >
            <MessageCircle className="w-4 h-4" />
            Book Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );

  const SelectionAdvisory = () => {
    const [userProfile, setUserProfile] = useState({
      gmatScore: '',
      workExperience: '',
      academicBackground: '',
      careerGoals: '',
      preferredLocation: '',
      budgetRange: '',
      targetRanking: ''
    });
    
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [showRecommendations, setShowRecommendations] = useState(false);

    const handleInputChange = (field: string, value: string) => {
      setUserProfile(prev => ({ ...prev, [field]: value }));
    };

    const generateRecommendations = () => {
      const gmat = parseInt(userProfile.gmatScore);
      const experience = parseInt(userProfile.workExperience);
      
      const scoredSchools = schools.map(school => {
        let score = 0;
        
        // GMAT Score matching (40% weight)
        const schoolGmat = school.admissionRequirements.gmat.averageScore || 0;
        if (gmat >= 700) {
          if (schoolGmat >= 650) score += 40;
          else score += 20;
        } else if (gmat >= 650) {
          if (schoolGmat >= 600 && schoolGmat <= 700) score += 40;
          else score += 25;
        } else if (gmat >= 600) {
          if (schoolGmat <= 650) score += 40;
          else score += 15;
        }
        
        // Work Experience matching (20% weight)
        if (experience >= 5) {
          if (school.name.toLowerCase().includes('executive') || school.name.toLowerCase().includes('kellogg')) score += 20;
          else score += 15;
        } else if (experience >= 3) {
          score += 20;
        } else {
          score += 10;
        }
        
        // Location preference (15% weight)
        if (userProfile.preferredLocation === 'any' || userProfile.preferredLocation === '') {
          score += 15;
        } else if (school.location.toLowerCase().includes(userProfile.preferredLocation.toLowerCase())) {
          score += 15;
        }
        
        // Budget matching (15% weight)
        const tuition = parseInt(school.programs.mba.tuitionFee.replace(/[^0-9]/g, ''));
        if (userProfile.budgetRange === 'under-50k' && tuition < 50000) score += 15;
        else if (userProfile.budgetRange === '50k-100k' && tuition >= 50000 && tuition <= 100000) score += 15;
        else if (userProfile.budgetRange === 'above-100k' && tuition > 100000) score += 15;
        else if (userProfile.budgetRange === 'any') score += 15;
        
        // Career goals alignment (10% weight)
        if (userProfile.careerGoals && school.specializations.some(spec => 
          spec.toLowerCase().includes(userProfile.careerGoals.toLowerCase())
        )) {
          score += 10;
        }
        
        return { ...school, fitScore: score };
      }).filter(school => school.fitScore > 50)
        .sort((a, b) => b.fitScore - a.fitScore)
        .slice(0, 8);
      
      setRecommendations(scoredSchools);
      setShowRecommendations(true);
    };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Selection Advisory</h1>
          <p className="text-blue-100">
            Get personalized school recommendations based on your profile and preferences
          </p>
        </div>

        {!showRecommendations ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Tell us about yourself</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GMAT Score
                </label>
                <input
                  type="number"
                  placeholder="e.g., 720"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userProfile.gmatScore}
                  onChange={(e) => handleInputChange('gmatScore', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Experience (years)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userProfile.workExperience}
                  onChange={(e) => handleInputChange('workExperience', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Background
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userProfile.academicBackground}
                  onChange={(e) => handleInputChange('academicBackground', e.target.value)}
                >
                  <option value="">Select background</option>
                  <option value="engineering">Engineering</option>
                  <option value="business">Business</option>
                  <option value="economics">Economics</option>
                  <option value="liberal-arts">Liberal Arts</option>
                  <option value="science">Science</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Career Goals
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userProfile.careerGoals}
                  onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                >
                  <option value="">Select career goal</option>
                  <option value="consulting">Consulting</option>
                  <option value="finance">Finance</option>
                  <option value="technology">Technology</option>
                  <option value="entrepreneurship">Entrepreneurship</option>
                  <option value="marketing">Marketing</option>
                  <option value="operations">Operations</option>
                  <option value="strategy">Strategy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Location
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userProfile.preferredLocation}
                  onChange={(e) => handleInputChange('preferredLocation', e.target.value)}
                >
                  <option value="">Any location</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="europe">Europe</option>
                  <option value="asia">Asia</option>
                  <option value="canada">Canada</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userProfile.budgetRange}
                  onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                >
                  <option value="">Select budget</option>
                  <option value="under-50k">Under $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="above-100k">Above $100,000</option>
                  <option value="any">Any budget</option>
                </select>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={generateRecommendations}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
              >
                Get My Recommendations
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Personalized Recommendations
              </h2>
              <button
                onClick={() => setShowRecommendations(false)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Update Profile
              </button>
            </div>

            {recommendations.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <p className="text-yellow-800">
                  No schools match your criteria perfectly. Try adjusting your preferences.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recommendations.map((school) => (
                  <div
                    key={school.id}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            {school.name.split(' ').map((word: string) => word[0]).join('').substring(0, 2)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {school.name}
                            </h3>
                            <p className="text-gray-600">{school.location}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Fit Score</p>
                            <p className="text-lg font-bold text-green-600">{school.fitScore}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">GMAT Average</p>
                            <p className="text-lg font-bold">{school.admissionRequirements.gmat.averageScore || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="text-lg font-bold">{school.programs.mba.duration}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Tuition</p>
                            <p className="text-lg font-bold">{school.programs.mba.currency} {school.programs.mba.tuitionFee}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 mb-4">
                          {school.specializations.slice(0, 3).map((spec: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => {
                            const currentWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
                            if (!currentWishlist.includes(school.id)) {
                              localStorage.setItem('wishlist', JSON.stringify([...currentWishlist, school.id]));
                            }
                          }}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          title="Add to Wishlist"
                        >
                          <Heart className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                          onClick={() => {
                            const currentComparison = JSON.parse(localStorage.getItem('comparison') || '[]');
                            if (!currentComparison.includes(school.id) && currentComparison.length < 3) {
                              localStorage.setItem('comparison', JSON.stringify([...currentComparison, school.id]));
                            }
                          }}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          title="Compare"
                        >
                          <GitCompare className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Program-specific page components
  const TwoYearMBAPrograms = () => {
    const twoYearSchools = schools.filter(school => 
      school.programs.mba.duration.includes('2 years') || school.programs.mba.duration.includes('2-year')
    );

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl">
          <h1 className="text-3xl font-bold mb-4">2-Year MBA Programs</h1>
          <p className="text-blue-100 text-lg">
            Comprehensive 2-year MBA programs offering deep specialization, extensive networking, 
            and leadership development opportunities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-blue-500/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Duration</h3>
              <p className="text-blue-100">24 months full-time</p>
            </div>
            <div className="bg-blue-500/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Total Schools</h3>
              <p className="text-blue-100">{twoYearSchools.length} programs</p>
            </div>
            <div className="bg-blue-500/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Best For</h3>
              <p className="text-blue-100">Career changers & leadership roles</p>
            </div>
          </div>
        </div>

        {/* Filters specific to 2-year programs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Filter 2-Year Programs</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>All Regions</option>
              <option>North America</option>
              <option>Europe</option>
              <option>Asia</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>All Specializations</option>
              <option>Finance</option>
              <option>Consulting</option>
              <option>Technology</option>
              <option>Healthcare</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>All Rankings</option>
              <option>Top 10</option>
              <option>Top 25</option>
              <option>Top 50</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>All Fee Ranges</option>
              <option>Under $50K</option>
              <option>$50K-$100K</option>
              <option>Above $100K</option>
            </select>
          </div>
        </div>

        {/* Schools List */}
        <div className="grid grid-cols-1 gap-6">
          {twoYearSchools.map((school) => (
            <div key={school.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {school.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{school.name}</h3>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {school.location}
                    </p>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      Rank #{school.ranking.global}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => wishlistSchools.includes(school.id) ? removeFromWishlist(school.id) : addToWishlist(school.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      wishlistSchools.includes(school.id)
                        ? 'bg-yellow-50 border-yellow-300 text-yellow-600'
                        : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-yellow-50 hover:border-yellow-300'
                    }`}
                    title={wishlistSchools.includes(school.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Star className={`w-4 h-4 ${wishlistSchools.includes(school.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    onClick={() => addToCompare(school.id)}
                    disabled={compareSchools.includes(school.id) || compareSchools.length >= 3}
                    className="p-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-50"
                    title={
                      compareSchools.includes(school.id) 
                        ? 'Already in comparison' 
                        : compareSchools.length >= 3 
                          ? 'Maximum 3 schools can be compared'
                          : 'Add to comparison'
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="font-semibold">{school.programs.mba.duration}</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Tuition Fee</div>
                  <div className="font-semibold text-blue-600">{school.programs.mba.currency} {school.programs.mba.tuitionFee}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Avg Salary</div>
                  <div className="font-semibold">{school.outcomes.averageSalary.currency} {school.outcomes.averageSalary.amount.toLocaleString()}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">GMAT Avg</div>
                  <div className="font-semibold">{school.admissionRequirements.gmat.averageScore || 'N/A'}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Employment Rate</div>
                  <div className="font-semibold text-green-600">{school.outcomes.employmentRate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const OneYearMBAPrograms = () => {
    const oneYearSchools = schools.filter(school => 
      school.programs.mba.duration.includes('1 year') || 
      school.programs.mba.duration.includes('10') ||
      school.programs.mba.duration.includes('12 months') ||
      school.programs.mba.duration.includes('16 months')
    );

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl">
          <h1 className="text-3xl font-bold mb-4">1-Year MBA Programs</h1>
          <p className="text-blue-100 text-lg">
            Intensive 1-year MBA programs designed for experienced professionals 
            seeking rapid career advancement with minimal time away from work.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-blue-500/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Duration</h3>
              <p className="text-blue-100">10-16 months full-time</p>
            </div>
            <div className="bg-blue-500/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Total Schools</h3>
              <p className="text-blue-100">{oneYearSchools.length} programs</p>
            </div>
            <div className="bg-blue-500/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Best For</h3>
              <p className="text-blue-100">Experienced professionals</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Why Choose 1-Year MBA?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Advantages</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Lower opportunity cost
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Faster return to workforce
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Intensive learning experience
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Lower total program cost
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-600 mb-2">Requirements</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  3+ years work experience
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  Higher GMAT/GRE scores
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  Clear career goals
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  Strong leadership experience
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Schools List */}
        <div className="grid grid-cols-1 gap-6">
          {oneYearSchools.length > 0 ? oneYearSchools.map((school) => (
            <div key={school.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {school.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{school.name}</h3>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {school.location}
                    </p>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      Rank #{school.ranking.global}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => wishlistSchools.includes(school.id) ? removeFromWishlist(school.id) : addToWishlist(school.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      wishlistSchools.includes(school.id)
                        ? 'bg-yellow-50 border-yellow-300 text-yellow-600'
                        : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-yellow-50 hover:border-yellow-300'
                    }`}
                    title={wishlistSchools.includes(school.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Star className={`w-4 h-4 ${wishlistSchools.includes(school.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    onClick={() => addToCompare(school.id)}
                    disabled={compareSchools.includes(school.id) || compareSchools.length >= 3}
                    className="p-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-50"
                    title={
                      compareSchools.includes(school.id) 
                        ? 'Already in comparison' 
                        : compareSchools.length >= 3 
                          ? 'Maximum 3 schools can be compared'
                          : 'Add to comparison'
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="font-semibold text-blue-600">{school.programs.mba.duration}</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Tuition Fee</div>
                  <div className="font-semibold text-blue-600">{school.programs.mba.currency} {school.programs.mba.tuitionFee}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Avg Salary</div>
                  <div className="font-semibold">{school.outcomes.averageSalary.currency} {school.outcomes.averageSalary.amount.toLocaleString()}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">GMAT Avg</div>
                  <div className="font-semibold">{school.admissionRequirements.gmat.averageScore || 'N/A'}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Work Exp Required</div>
                  <div className="font-semibold">{school.admissionRequirements.workExperience.minYears}+ years</div>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No 1-Year Programs Found</h3>
              <p className="text-gray-500">Most schools in our current database offer 2-year programs. Check back for updates!</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ProgramBySpecialization = () => {
    const specializations = [...new Set(schools.flatMap(school => school.specializations))].sort();
    const [selectedSpec, setSelectedSpec] = useState('Finance');
    
    const schoolsBySpecialization = specializations.map(spec => ({
      name: spec,
      schools: schools.filter(school => school.specializations.includes(spec)),
      count: schools.filter(school => school.specializations.includes(spec)).length
    })).sort((a, b) => b.count - a.count);

    const selectedSpecSchools = schools.filter(school => school.specializations.includes(selectedSpec));

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl">
          <h1 className="text-3xl font-bold mb-4">Programs by Specialization</h1>
          <p className="text-blue-100 text-lg">
            Find MBA programs that excel in your area of interest. 
            Explore schools by their strongest specializations and career outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Specializations List */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Specializations</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {schoolsBySpecialization.map((spec) => (
                <button
                  key={spec.name}
                  onClick={() => setSelectedSpec(spec.name)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedSpec === spec.name
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{spec.name}</span>
                    <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {spec.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Specialization Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold">{selectedSpec} Programs</h3>
              </div>
              <p className="text-gray-600 mb-4">
                {selectedSpecSchools.length} schools offering strong {selectedSpec} programs
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600">Top Schools</div>
                  <div className="font-semibold text-lg">{selectedSpecSchools.filter(s => s.ranking.global <= 25).length}</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600">Avg GMAT</div>
                  <div className="font-semibold text-lg">
                    {Math.round(selectedSpecSchools.reduce((acc, s) => acc + (s.admissionRequirements.gmat.averageScore || 0), 0) / selectedSpecSchools.length) || 'N/A'}
                  </div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600">Global Options</div>
                  <div className="font-semibold text-lg">{[...new Set(selectedSpecSchools.map(s => s.country))].length} countries</div>
                </div>
              </div>
            </div>

            {/* Schools offering selected specialization */}
            <div className="space-y-4">
              {selectedSpecSchools.slice(0, 10).map((school) => (
                <div key={school.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {school.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{school.name}</h4>
                        <p className="text-sm text-gray-600">{school.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => wishlistSchools.includes(school.id) ? removeFromWishlist(school.id) : addToWishlist(school.id)}
                        className={`p-2 rounded-lg border transition-colors ${
                          wishlistSchools.includes(school.id)
                            ? 'bg-yellow-50 border-yellow-300 text-yellow-600'
                            : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-yellow-50 hover:border-yellow-300'
                        }`}
                        title={wishlistSchools.includes(school.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      >
                        <Star className={`w-3 h-3 ${wishlistSchools.includes(school.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button 
                        onClick={() => addToCompare(school.id)}
                        disabled={compareSchools.includes(school.id) || compareSchools.length >= 3}
                        className="p-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-50"
                        title={
                          compareSchools.includes(school.id) 
                            ? 'Already in comparison' 
                            : compareSchools.length >= 3 
                              ? 'Maximum 3 schools can be compared'
                              : 'Add to comparison'
                        }
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                        Rank #{school.ranking.global}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Duration: </span>
                      <span className="font-medium">{school.programs.mba.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Tuition: </span>
                      <span className="font-medium">{school.programs.mba.currency} {school.programs.mba.tuitionFee}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">GMAT: </span>
                      <span className="font-medium">{school.admissionRequirements.gmat.averageScore || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Employment: </span>
                      <span className="font-medium text-green-600">{school.outcomes.employmentRate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ExecutiveMBAPrograms = () => {
    const executiveSchools = schools.filter(school => 
      school.programs.emba?.available || 
      school.name.toLowerCase().includes('executive') ||
      school.highlights?.some(h => h.toLowerCase().includes('executive'))
    );

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl">
          <h1 className="text-3xl font-bold mb-4">Executive MBA Programs</h1>
          <p className="text-blue-100 text-lg">
            Advanced MBA programs designed for senior professionals and executives 
            with significant work experience seeking strategic leadership skills.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-blue-500/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Target Audience</h3>
              <p className="text-blue-100">Senior managers & executives</p>
            </div>
            <div className="bg-blue-500/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Work Experience</h3>
              <p className="text-blue-100">8-15+ years required</p>
            </div>
            <div className="bg-blue-500/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Format</h3>
              <p className="text-blue-100">Part-time & modular</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Executive MBA Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-600 mb-3">Program Structure</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Weekend and evening classes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Modular intensive sessions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  International residencies
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Continue working full-time
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 mb-3">Curriculum Focus</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  Strategic leadership
                </li>
                <li className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  Global business perspective
                </li>
                <li className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  Digital transformation
                </li>
                <li className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  Innovation management
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Schools List */}
        <div className="grid grid-cols-1 gap-6">
          {executiveSchools.length > 0 ? executiveSchools.map((school) => (
            <div key={school.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {school.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{school.name}</h3>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {school.location}
                    </p>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      Rank #{school.ranking.global}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => wishlistSchools.includes(school.id) ? removeFromWishlist(school.id) : addToWishlist(school.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      wishlistSchools.includes(school.id)
                        ? 'bg-yellow-50 border-yellow-300 text-yellow-600'
                        : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-yellow-50 hover:border-yellow-300'
                    }`}
                    title={wishlistSchools.includes(school.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Star className={`w-4 h-4 ${wishlistSchools.includes(school.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    onClick={() => addToCompare(school.id)}
                    disabled={compareSchools.includes(school.id) || compareSchools.length >= 3}
                    className="p-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-50"
                    title={
                      compareSchools.includes(school.id) 
                        ? 'Already in comparison' 
                        : compareSchools.length >= 3 
                          ? 'Maximum 3 schools can be compared'
                          : 'Add to comparison'
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <div className="text-right">
                    {school.programs.emba?.available && (
                      <div>
                        <div className="text-sm text-gray-500">EMBA Duration</div>
                        <div className="font-semibold text-blue-600">{school.programs.emba.duration}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">EMBA Fee</div>
                  <div className="font-semibold text-green-600">
                    {school.programs.emba?.tuitionFee || school.programs.mba.currency + ' ' + school.programs.mba.tuitionFee}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Min Work Exp</div>
                  <div className="font-semibold">{Math.max(school.admissionRequirements.workExperience.minYears || 0, 8)}+ years</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Avg Age</div>
                  <div className="font-semibold">{Math.max(school.statistics.averageAge || 0, 32)} years</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Class Size</div>
                  <div className="font-semibold">{Math.floor((school.statistics.classSize || 0) * 0.3)}</div>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Executive Programs Found</h3>
              <p className="text-gray-500">Executive MBA programs are being updated. Please check back later!</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const GlobalMBAPrograms = () => {
    const continents = ['North America', 'Europe', 'Asia', 'Oceania'];
    const [selectedContinent, setSelectedContinent] = useState('North America');
    
    const schoolsByContinent = continents.map(continent => ({
      name: continent,
      schools: schools.filter(school => school.region === continent),
      countries: [...new Set(schools.filter(school => school.region === continent).map(school => school.country))]
    }));

    const selectedContinentSchools = schools.filter(school => school.region === selectedContinent);

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl">
          <h1 className="text-3xl font-bold mb-4">Global MBA Programs</h1>
          <p className="text-blue-100 text-lg">
            Explore MBA opportunities across the world. Compare programs by region, 
            understand cultural contexts, and find the perfect global destination for your MBA.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Continent Selector */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Regions
            </h3>
            <div className="space-y-2">
              {schoolsByContinent.map((continent) => (
                <button
                  key={continent.name}
                  onClick={() => setSelectedContinent(continent.name)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedContinent === continent.name
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{continent.name}</span>
                    <div className="text-right">
                      <div className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {continent.schools.length} schools
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {continent.countries.length} countries
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Region Details */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold mb-4">{selectedContinent} MBA Programs</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600">Total Schools</div>
                  <div className="font-semibold text-xl">{selectedContinentSchools.length}</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600">Countries</div>
                  <div className="font-semibold text-xl">
                    {[...new Set(selectedContinentSchools.map(s => s.country))].length}
                  </div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600">Top 25 Schools</div>
                  <div className="font-semibold text-xl">
                    {selectedContinentSchools.filter(s => s.ranking.global <= 25).length}
                  </div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600">Avg GMAT</div>
                  <div className="font-semibold text-xl">
                    {Math.round(selectedContinentSchools.reduce((acc, s) => acc + (s.admissionRequirements.gmat.averageScore || 0), 0) / selectedContinentSchools.length) || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Countries in selected region */}
              <div>
                <h4 className="font-semibold mb-3">Countries in {selectedContinent}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[...new Set(selectedContinentSchools.map(s => s.country))].map(country => {
                    const countrySchools = selectedContinentSchools.filter(s => s.country === country);
                    return (
                      <div key={country} className="border border-gray-200 rounded-lg p-3">
                        <div className="font-medium">{country}</div>
                        <div className="text-sm text-gray-600">{countrySchools.length} schools</div>
                        <div className="text-xs text-gray-500">
                          Top rank: #{Math.min(...countrySchools.map(s => s.ranking.global))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Top Schools in Selected Region */}
            <div className="space-y-4">
              <h4 className="font-semibold">Top Schools in {selectedContinent}</h4>
              {selectedContinentSchools
                .sort((a, b) => a.ranking.global - b.ranking.global)
                .slice(0, 10)
                .map((school) => (
                <div key={school.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {school.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{school.name}</h4>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {school.location}, {school.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => wishlistSchools.includes(school.id) ? removeFromWishlist(school.id) : addToWishlist(school.id)}
                        className={`p-2 rounded-lg border transition-colors ${
                          wishlistSchools.includes(school.id)
                            ? 'bg-yellow-50 border-yellow-300 text-yellow-600'
                            : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-yellow-50 hover:border-yellow-300'
                        }`}
                        title={wishlistSchools.includes(school.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      >
                        <Star className={`w-3 h-3 ${wishlistSchools.includes(school.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button 
                        onClick={() => addToCompare(school.id)}
                        disabled={compareSchools.includes(school.id) || compareSchools.length >= 3}
                        className="p-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-50"
                        title={
                          compareSchools.includes(school.id) 
                            ? 'Already in comparison' 
                            : compareSchools.length >= 3 
                              ? 'Maximum 3 schools can be compared'
                              : 'Add to comparison'
                        }
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                        Rank #{school.ranking.global}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Duration: </span>
                      <span className="font-medium">{school.programs.mba.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Tuition: </span>
                      <span className="font-medium">{school.programs.mba.currency} {school.programs.mba.tuitionFee}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">International: </span>
                      <span className="font-medium">{school.statistics.internationalStudents}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">GMAT: </span>
                      <span className="font-medium">{school.admissionRequirements.gmat.averageScore || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Employment: </span>
                      <span className="font-medium text-green-600">{school.outcomes.employmentRate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Error Display Component
  const ErrorDisplay = () => {
    const getErrorIcon = () => {
      switch (errorState.errorType) {
        case 'network':
          return <WifiOff className="w-12 h-12 text-red-500" />;
        case 'api':
          return <AlertCircle className="w-12 h-12 text-red-500" />;
        case 'data':
          return <Database className="w-12 h-12 text-red-500" />;
        default:
          return <AlertCircle className="w-12 h-12 text-red-500" />;
      }
    };

    const getErrorMessage = () => {
      switch (errorState.errorType) {
        case 'network':
          return 'Connection lost. Please check your internet connection.';
        case 'api':
          return 'Service temporarily unavailable. We\'re working on it.';
        case 'data':
          return 'Data loading error. Please try refreshing the page.';
        default:
          return errorState.errorMessage || 'Something went wrong. Please try again.';
      }
    };

    return (
      <div className="bg-white rounded-xl border border-red-200 p-8 text-center">
        <div className="mb-4 flex justify-center">
          {getErrorIcon()}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {errorState.errorType === 'network' ? 'No Connection' : 'Error Occurred'}
        </h3>
        <p className="text-gray-600 mb-4">
          {getErrorMessage()}
        </p>
        {errorState.retryCount > 0 && (
          <p className="text-sm text-gray-500 mb-4">
            Attempted {errorState.retryCount} time{errorState.retryCount > 1 ? 's' : ''}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleRetry}
            disabled={loadingState.isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
          >
            <RefreshCw className={`w-4 h-4 ${loadingState.isRetrying ? 'animate-spin' : ''}`} />
            {loadingState.isRetrying ? 'Retrying...' : 'Try Again'}
          </button>
          <button
            onClick={clearError}
            className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  };

  // Loading Display Component
  const LoadingDisplay = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
      <div className="mb-4 flex justify-center">
        <RefreshCw className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {loadingState.isRetrying ? 'Retrying...' : 'Loading...'}
      </h3>
      <p className="text-gray-600">
        {loadingState.operation || 'Loading B-School data...'}
      </p>
      {loadingState.isRetrying && errorState.retryCount > 0 && (
        <p className="text-sm text-gray-500 mt-2">
          Attempt {errorState.retryCount + 1} of 3
        </p>
      )}
    </div>
  );

  // Network Status Banner
  const NetworkStatusBanner = () => {
    if (isOnline) return null;
    
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
        <div className="flex items-center">
          <WifiOff className="w-5 h-5 text-red-400 mr-3" />
          <div>
            <p className="text-sm text-red-700">
              You're currently offline. Some features may not work properly.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false); // Close mobile menu when section is selected
  };

  const addToWishlist = (schoolId: number) => {
    if (!wishlistSchools.includes(schoolId)) {
      setWishlistSchools(prev => [...prev, schoolId]);
    }
  };

  const removeFromWishlist = (schoolId: number) => {
    setWishlistSchools(prev => prev.filter(id => id !== schoolId));
  };

  const addToCompare = (schoolId: number) => {
    if (compareSchools.length < 3 && !compareSchools.includes(schoolId)) {
      setCompareSchools(prev => [...prev, schoolId]);
    }
  };

  const renderMainContent = () => {
    // Show error display if there's an error
    if (errorState.hasError) {
      return <ErrorDisplay />;
    }
    
    // Show loading display if loading
    if (loadingState.isLoading) {
      return <LoadingDisplay />;
    }
    
    switch (activeSection) {
      // Program sections
      case '2-year-mba':
        return <TwoYearMBAPrograms />;
      case '1-year-mba':
        return <OneYearMBAPrograms />;
      case 'specialization-programs':
        return <ProgramBySpecialization />;
      case 'executive-mba':
        return <ExecutiveMBAPrograms />;
      case 'global-mba':
        return <GlobalMBAPrograms />;
      // Tool sections
      case 'score-calculator':
        return <ScoreCalculator />;
      case 'mba-exam-calculator':
        return <MBAExamCalculator />;
      case 'compare-schools':
        return <CompareSchools />;
      case 'wishlist':
        return <WishlistManager />;
      case 'cutoff-predictor':
        return <CutoffPredictor />;
      case 'eligibility-checker':
        return <EligibilityChecker />;
      case 'fee-calculator':
        return <FeeCalculator />;
      case 'selection-advisory':
        return <SelectionAdvisory />;
      case 'application-deadlines':
        return <ApplicationDeadlines />;
      case 'scholarship-info':
        return <ScholarshipInfo />;
      case 'faqs':
        return <FAQSection />;
      case 'contact-support':
        return <ContactSupport />;
      default:
        return renderSchoolDirectory();
    }
  };

  const renderSchoolDirectory = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
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
                <div className="flex gap-2">
                  <button 
                    onClick={() => wishlistSchools.includes(school.id) ? removeFromWishlist(school.id) : addToWishlist(school.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      wishlistSchools.includes(school.id)
                        ? 'bg-yellow-50 border-yellow-300 text-yellow-600'
                        : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-yellow-50 hover:border-yellow-300'
                    }`}
                    title={wishlistSchools.includes(school.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Star className={`w-4 h-4 ${wishlistSchools.includes(school.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    onClick={() => addToCompare(school.id)}
                    disabled={compareSchools.includes(school.id) || compareSchools.length >= 3}
                    className="p-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-50"
                    title={
                      compareSchools.includes(school.id) 
                        ? 'Already in comparison' 
                        : compareSchools.length >= 3 
                          ? 'Maximum 3 schools can be compared'
                          : 'Add to comparison'
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
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
    </>
  );

  const sidebarSections = {
    programs: [
      { icon: GraduationCap, label: "2-year MBA Programs", section: "2-year-mba", active: true },
      { icon: Clock, label: "1-year MBA Programs", section: "1-year-mba" },
      { icon: Target, label: "Program by Specialization", section: "specialization-programs" },
      { icon: Building2, label: "Executive MBA Programs", section: "executive-mba" },
      { icon: Globe, label: "Global MBA Programs", section: "global-mba" }
    ],
    tools: [
      { icon: Calculator, label: "Score vs Percentile Calculator", section: "score-calculator" },
      { icon: Calculator, label: "MBA Exam Calculator", section: "mba-exam-calculator" },
      { icon: TrendingUp, label: "Compare Schools", section: "compare-schools" },
      { icon: Star, label: "Wishlist Management", section: "wishlist" },
      { icon: BarChart3, label: "Cutoff Predictor", section: "cutoff-predictor" },
      { icon: Target, label: "Eligibility Checker", section: "eligibility-checker" }
    ],
    guidance: [
      { icon: Users, label: "Selection Advisory", section: "selection-advisory" },
      { icon: Calendar, label: "Application Deadlines", section: "application-deadlines" },
      { icon: FileText, label: "MBA CET Cutoffs", section: "cutoff-predictor" },
      { icon: Award, label: "Scholarship Information", section: "scholarship-info" },
      { icon: IndianRupee, label: "Fee Calculator", section: "fee-calculator" }
    ],
    faqs: [
      { icon: HelpCircle, label: "General FAQs", section: "faqs" },
      { icon: MessageCircle, label: "Ask Expert", section: "contact-support" },
      { icon: Phone, label: "Contact Support", section: "contact-support" },
      { icon: Info, label: "Admission Process", section: "faqs" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex w-72 bg-white shadow-sm border-r border-gray-200 flex-col fixed h-full overflow-y-auto z-30">
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
                  onClick={() => handleSectionClick(item.section)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors ${
                    activeSection === item.section 
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
                  onClick={() => handleSectionClick(item.section)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors ${
                    activeSection === item.section 
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

          {/* Guidance Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Guidance</h3>
            <div className="space-y-1">
              {sidebarSections.guidance.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSectionClick(item.section)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors ${
                    activeSection === item.section 
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

          {/* FAQs & Support Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Support</h3>
            <div className="space-y-1">
              {sidebarSections.faqs.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSectionClick(item.section)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors ${
                    activeSection === item.section 
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
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div className={`lg:hidden fixed left-0 top-0 h-full w-72 bg-white shadow-lg border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-bold">AV B-School Zone</h2>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 hover:bg-blue-700 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 space-y-6 overflow-y-auto">
            {/* Programs Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Programs</h3>
              <div className="space-y-1">
                {sidebarSections.programs.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSectionClick(item.section)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors ${
                      activeSection === item.section 
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
                    onClick={() => handleSectionClick(item.section)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors ${
                      activeSection === item.section 
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

            {/* Guidance Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Guidance</h3>
              <div className="space-y-1">
                {sidebarSections.guidance.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSectionClick(item.section)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors ${
                      activeSection === item.section 
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

            {/* Support Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Support</h3>
              <div className="space-y-1">
                {sidebarSections.faqs.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSectionClick(item.section)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors ${
                      activeSection === item.section 
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
          </div>
        </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 overflow-auto">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <Link 
              href="/#book-counseling"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md text-xs sm:text-sm transition-colors duration-200 font-medium flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Book a Free Counselling with AV
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <img src="/api/placeholder/60/40" alt="AV Logo" className="h-10" />
          </div>
        </div>

        {/* Content Header */}
        <div className="p-3 sm:p-4 lg:p-6">
          {/* Network Status Banner */}
          <NetworkStatusBanner />
          
          {/* Main Content */}
          {renderMainContent()}
        </div>
      </div>
      </div>
    </div>
  );
}