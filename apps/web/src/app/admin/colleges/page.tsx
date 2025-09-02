'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Eye,
  Trash2,
  Star,
  MapPin,
  GraduationCap,
  Globe,
  Users,
  TrendingUp,
  Building,
  Calendar,
  Download,
  Upload,
  Grid,
  List,
  BookOpen,
  Award
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// import { api } from '@/lib/trpc' // Temporarily disabled due to version compatibility
import { toast } from 'react-hot-toast'

const mockColleges = [
  {
    id: '1',
    name: 'Harvard University',
    shortName: 'Harvard',
    location: 'Cambridge, MA, USA',
    country: 'United States',
    website: 'harvard.edu',
    logo: null,
    status: 'ACTIVE',
    featured: true,
    ranking: { global: 1, national: 1 },
    stats: {
      courses: 45,
      students: 23000,
      acceptanceRate: 4.6,
      avgTuition: 51904
    },
    establishedYear: 1636,
    type: 'Private Research University',
    accreditation: 'NECHE',
    createdAt: '2024-01-15',
    updatedAt: '2024-02-20'
  },
  {
    id: '2',
    name: 'Stanford University',
    shortName: 'Stanford',
    location: 'Stanford, CA, USA',
    country: 'United States',
    website: 'stanford.edu',
    logo: null,
    status: 'ACTIVE',
    featured: true,
    ranking: { global: 2, national: 2 },
    stats: {
      courses: 38,
      students: 17000,
      acceptanceRate: 4.3,
      avgTuition: 56169
    },
    establishedYear: 1885,
    type: 'Private Research University',
    accreditation: 'WASC',
    createdAt: '2024-01-10',
    updatedAt: '2024-02-18'
  },
  {
    id: '3',
    name: 'Massachusetts Institute of Technology',
    shortName: 'MIT',
    location: 'Cambridge, MA, USA',
    country: 'United States',
    website: 'mit.edu',
    logo: null,
    status: 'ACTIVE',
    featured: false,
    ranking: { global: 3, national: 3 },
    stats: {
      courses: 42,
      students: 11520,
      acceptanceRate: 7.3,
      avgTuition: 53790
    },
    establishedYear: 1861,
    type: 'Private Research University',
    accreditation: 'NECHE',
    createdAt: '2024-01-05',
    updatedAt: '2024-02-15'
  },
  {
    id: '4',
    name: 'University of Oxford',
    shortName: 'Oxford',
    location: 'Oxford, England, UK',
    country: 'United Kingdom',
    website: 'ox.ac.uk',
    logo: null,
    status: 'DRAFT',
    featured: false,
    ranking: { global: 4, national: 1 },
    stats: {
      courses: 52,
      students: 24000,
      acceptanceRate: 17.5,
      avgTuition: 11500
    },
    establishedYear: 1096,
    type: 'Public Research University',
    accreditation: 'QAA',
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01'
  }
]

const statusColors = {
  ACTIVE: 'bg-green-500',
  INACTIVE: 'bg-red-500',
  DRAFT: 'bg-yellow-500',
}

const statusLabels = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  DRAFT: 'Draft',
}

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [countryFilter, setCountryFilter] = useState('all')
  const [selectedView, setSelectedView] = useState<'grid' | 'table'>('table')

  const [colleges, setColleges] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchColleges = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/admin/colleges')
        const result = await response.json()
        
        if (result.success && result.data) {
          setColleges(result.data)
        }
      } catch (error) {
        console.error('Error fetching colleges:', error)
        toast.error('Failed to load colleges')
      } finally {
        setIsLoading(false)
      }
    }
    fetchColleges()
  }, [])

  const filteredColleges = colleges.filter(college => {
    if (!college || !college.name) return false
    const searchableText = [college.name, college.location, college.city, college.country].filter(Boolean).join(' ').toLowerCase()
    const matchesSearch = !searchTerm || searchableText.includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ((college.status || 'ACTIVE').toLowerCase() === statusFilter)
    const matchesCountry = countryFilter === 'all' || (college.country && college.country.toLowerCase().includes(countryFilter.toLowerCase()))
    
    return matchesSearch && matchesStatus && matchesCountry
  })

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE': return '#10b981'
      case 'DRAFT': return '#f59e0b' 
      case 'INACTIVE': return '#ef4444'
      default: return '#10b981'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Mock mutations - replace with actual API calls later
  const toggleFeaturedMutation = {
    mutate: (data: any) => {
      console.log('Toggle featured:', data)
      toast.success('Featured status updated')
    }
  }

  const deleteMutation = {
    mutate: (data: any) => {
      console.log('Delete college:', data)
      toast.success('College deleted successfully')
    }
  }

  const handleToggleFeatured = async (id: string) => {
    try {
      toggleFeaturedMutation.mutate({ id })
    } catch (error) {
      // Error handled in mutation
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      try {
        const response = await fetch(`/api/admin/colleges?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if (response.ok) {
          toast.success('College deleted successfully')
          // Refresh the colleges list
          const refreshResponse = await fetch('/api/admin/colleges')
          const result = await refreshResponse.json()
          if (result.success && result.data) {
            setColleges(result.data)
          }
        } else {
          toast.error('Failed to delete college')
        }
      } catch (error) {
        console.error('Delete error:', error)
        toast.error('An error occurred while deleting')
      }
    }
  }

  return (
    <div style={{
      padding: '32px',
      maxWidth: '100%'
    }}>
      
      {/* Header with Stats */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        marginBottom: '32px'
      }}>
        
        {/* Header Section */}
        <div style={{
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}>
              <GraduationCap style={{ width: '28px', height: '28px', color: 'white' }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#111827',
                margin: 0,
                letterSpacing: '-0.5px'
              }}>
                Colleges Management
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: '4px 0 0 0'
              }}>
                Manage university partnerships and course offerings across institutions
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                background: 'white',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb'
                e.currentTarget.style.borderColor = '#d1d5db'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              onClick={() => alert('Import functionality coming soon!')}
            >
              <Upload style={{ width: '16px', height: '16px' }} />
              Import
            </button>
            
            <button 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                background: 'white',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb'
                e.currentTarget.style.borderColor = '#d1d5db'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              onClick={() => {
                const csvData = colleges.map(college => ({
                  Name: college.name,
                  Location: college.location || '',
                  Country: college.country || '',
                  Ranking: college.ranking || '',
                  'Acceptance Rate': college.acceptanceRate || '',
                  Status: college.status || 'ACTIVE'
                }))
                const csvContent = 'data:text/csv;charset=utf-8,' + 
                  Object.keys(csvData[0] || {}).join(',') + '\n' +
                  csvData.map(row => Object.values(row).join(',')).join('\n')
                const link = document.createElement('a')
                link.href = encodeURI(csvContent)
                link.download = `colleges_${new Date().toISOString().split('T')[0]}.csv`
                link.click()
              }}
            >
              <Download style={{ width: '16px', height: '16px' }} />
              Export
            </button>

            <button 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 24px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              onClick={() => window.location.href = '/admin/colleges/new'}
            >
              <Plus style={{ width: '18px', height: '18px' }} />
              Add New College
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {[
            {
              title: 'Total Colleges',
              value: colleges.length.toString(),
              subtitle: 'All partner institutions',
              icon: Building,
              color: '#3b82f6',
              bgColor: '#eff6ff'
            },
            {
              title: 'Active Colleges',
              value: colleges.filter(c => (c.status || 'ACTIVE') === 'ACTIVE').length.toString(),
              subtitle: 'Currently accepting',
              icon: GraduationCap,
              color: '#10b981',
              bgColor: '#f0fdf4'
            },
            {
              title: 'Featured',
              value: colleges.filter(c => c.featured).length.toString(),
              subtitle: 'Highlighted institutions',
              icon: Star,
              color: '#f59e0b',
              bgColor: '#fffbeb'
            },
            {
              title: 'Countries',
              value: new Set(colleges.map(c => c.country).filter(Boolean)).size.toString(),
              subtitle: 'Global presence',
              icon: Globe,
              color: '#8b5cf6',
              bgColor: '#faf5ff'
            }
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <div 
                key={index} 
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#6b7280',
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {stat.title}
                  </h3>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: stat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon style={{ width: '20px', height: '20px', color: stat.color }} />
                  </div>
                </div>
                <p style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#111827',
                  margin: '0 0 4px 0',
                  lineHeight: '1'
                }}>
                  {stat.value}
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  {stat.subtitle}
                </p>
              </div>
            )
          })}
        </div>
      </div>

        {/* Search and Filters */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1', minWidth: '300px' }}>
              <div style={{ position: 'relative', flex: '1', maxWidth: '400px' }}>
                <Search style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '18px',
                  height: '18px',
                  color: '#6b7280'
                }} />
                <input
                  type="text"
                  placeholder="Search colleges, locations, or universities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 46px',
                    border: '2px solid #f3f4f6',
                    borderRadius: '10px',
                    fontSize: '14px',
                    backgroundColor: '#f9fafb',
                    color: '#111827',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.backgroundColor = 'white'
                    e.target.style.borderColor = '#667eea'
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = '#f9fafb'
                    e.target.style.borderColor = '#f3f4f6'
                  }}
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '2px solid #f3f4f6',
                  borderRadius: '10px',
                  fontSize: '14px',
                  backgroundColor: '#f9fafb',
                  color: '#111827',
                  cursor: 'pointer',
                  minWidth: '120px'
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '2px solid #f3f4f6',
                  borderRadius: '10px',
                  fontSize: '14px',
                  backgroundColor: '#f9fafb',
                  color: '#111827',
                  cursor: 'pointer',
                  minWidth: '140px'
                }}
              >
                <option value="all">All Countries</option>
                <option value="united states">United States</option>
                <option value="united kingdom">United Kingdom</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                display: 'flex',
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                padding: '4px'
              }}>
                <button
                  onClick={() => setSelectedView('table')}
                  style={{
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: selectedView === 'table' ? 'white' : 'transparent',
                    color: selectedView === 'table' ? '#111827' : '#6b7280',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <List style={{ width: '14px', height: '14px' }} />
                  Table
                </button>
                <button
                  onClick={() => setSelectedView('grid')}
                  style={{
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: selectedView === 'grid' ? 'white' : 'transparent',
                    color: selectedView === 'grid' ? '#111827' : '#6b7280',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Grid style={{ width: '14px', height: '14px' }} />
                  Grid
                </button>
              </div>
            </div>
          </div>

          <div style={{
            fontSize: '13px',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            Showing <strong>{filteredColleges.length}</strong> of <strong>{colleges.length}</strong> colleges
          </div>
        </div>

      {/* Content Area */}
      {filteredColleges.length === 0 ? (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '64px 32px',
          textAlign: 'center',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '32px',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto'
          }}>
            <Search style={{ width: '28px', height: '28px', color: '#9ca3af' }} />
          </div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 8px 0'
          }}>
            No colleges found
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            Try adjusting your search criteria or filters
          </p>
        </div>
      ) : selectedView === 'table' ? (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#374151',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    College
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#374151',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Location
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#374151',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Courses
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#374151',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Ranking
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#374151',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Status
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#374151',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: '1px solid #e5e7eb',
                    width: '120px'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredColleges.map((college, index) => {
                  const statusColor = getStatusColor(college.status || 'ACTIVE')
                  return (
                    <tr 
                      key={college.id}
                      style={{
                        borderBottom: index < filteredColleges.length - 1 ? '1px solid #f3f4f6' : 'none',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafbfc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <GraduationCap style={{ width: '20px', height: '20px', color: 'white' }} />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <p style={{
                              fontSize: '15px',
                              fontWeight: '600',
                              color: '#111827',
                              margin: '0 0 2px 0',
                              lineHeight: '1.2'
                            }}>
                              {college.name}
                            </p>
                            <p style={{
                              fontSize: '13px',
                              color: '#6b7280',
                              margin: 0,
                              lineHeight: '1.2'
                            }}>
                              {college.type || 'University'} • {college.ranking ? `Rank #${college.ranking}` : 'Unranked'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <MapPin style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                          <span style={{ fontSize: '14px', color: '#111827' }}>
                            {college.location || `${college.city || ''}, ${college.country || ''}`.replace(/^,\s*/, '').trim()}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <BookOpen style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                          <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                            {college.stats?.courses || college.courses?.length || 0}
                          </span>
                          <span style={{ fontSize: '13px', color: '#6b7280' }}>
                            programs
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#111827'
                        }}>
                          {college.ranking ? `#${college.ranking}` : 'Unranked'}
                        </span>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: statusColor === '#10b981' ? '#dcfce7' : statusColor === '#f59e0b' ? '#fef3c7' : '#fee2e2',
                          color: statusColor === '#10b981' ? '#166534' : statusColor === '#f59e0b' ? '#92400e' : '#dc2626',
                          border: `1px solid ${statusColor === '#10b981' ? '#bbf7d0' : statusColor === '#f59e0b' ? '#fde68a' : '#fecaca'}`,
                          textTransform: 'capitalize'
                        }}>
                          {college.status || 'Active'}
                        </span>
                      </td>
                      <td style={{ padding: '20px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                          <button
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '8px 14px',
                              borderRadius: '8px',
                              border: '1px solid #e5e7eb',
                              backgroundColor: 'white',
                              color: '#374151',
                              fontSize: '12px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#f9fafb'
                              e.currentTarget.style.borderColor = '#d1d5db'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'white'
                              e.currentTarget.style.borderColor = '#e5e7eb'
                            }}
                            onClick={() => window.location.href = `/admin/colleges/${college.id}`}
                          >
                            <Eye style={{ width: '14px', height: '14px' }} />
                            View
                          </button>
                          <button
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '8px 14px',
                              borderRadius: '8px',
                              border: '1px solid #e5e7eb',
                              backgroundColor: 'white',
                              color: '#374151',
                              fontSize: '12px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#f9fafb'
                              e.currentTarget.style.borderColor = '#d1d5db'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'white'
                              e.currentTarget.style.borderColor = '#e5e7eb'
                            }}
                            onClick={() => window.location.href = `/admin/colleges/${college.id}/edit`}
                          >
                            <Edit style={{ width: '14px', height: '14px' }} />
                            Edit
                          </button>
                          <button
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '8px 14px',
                              borderRadius: '8px',
                              border: '1px solid #e5e7eb',
                              backgroundColor: 'white',
                              color: '#dc2626',
                              fontSize: '12px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#fee2e2'
                              e.currentTarget.style.borderColor = '#fca5a5'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'white'
                              e.currentTarget.style.borderColor = '#e5e7eb'
                            }}
                            onClick={() => handleDelete(college.id, college.name)}
                          >
                            <Trash2 style={{ width: '14px', height: '14px' }} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '24px'
        }}>
          {filteredColleges.map((college) => {
            const statusColor = getStatusColor(college.status || 'ACTIVE')
            return (
              <div 
                key={college.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb',
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <GraduationCap style={{ width: '20px', height: '20px', color: 'white' }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <h3 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#111827',
                          margin: '0 0 4px 0',
                          lineHeight: '1.2'
                        }}>
                          {college.name}
                        </h3>
                        <p style={{
                          fontSize: '13px',
                          color: '#6b7280',
                          margin: 0
                        }}>
                          {college.type || 'University'}
                        </p>
                      </div>
                    </div>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '16px',
                      fontSize: '11px',
                      fontWeight: '600',
                      backgroundColor: statusColor === '#10b981' ? '#dcfce7' : statusColor === '#f59e0b' ? '#fef3c7' : '#fee2e2',
                      color: statusColor === '#10b981' ? '#166534' : statusColor === '#f59e0b' ? '#92400e' : '#dc2626',
                      border: `1px solid ${statusColor === '#10b981' ? '#bbf7d0' : statusColor === '#f59e0b' ? '#fde68a' : '#fecaca'}`,
                      textTransform: 'capitalize',
                      flexShrink: 0
                    }}>
                      {college.status || 'Active'}
                    </span>
                  </div>

                  <p style={{
                    fontSize: '13px',
                    color: '#6b7280',
                    margin: '0 0 16px 0',
                    lineHeight: '1.4'
                  }}>
                    {college.description || college.about || 'Leading educational institution providing quality higher education.'}
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginBottom: '20px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                      <div>
                        <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</p>
                        <p style={{ fontSize: '13px', fontWeight: '500', color: '#111827', margin: 0 }}>
                          {college.location || `${college.city || ''}, ${college.country || ''}`.replace(/^,\s*/, '').trim()}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BookOpen style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                      <div>
                        <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Courses</p>
                        <p style={{ fontSize: '13px', fontWeight: '500', color: '#111827', margin: 0 }}>
                          {college.stats?.courses || college.courses?.length || 0} Programs
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Award style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                      <div>
                        <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ranking</p>
                        <p style={{ fontSize: '13px', fontWeight: '500', color: '#111827', margin: 0 }}>
                          {college.ranking ? `#${college.ranking}` : 'Unranked'}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Star style={{ 
                        width: '16px', 
                        height: '16px', 
                        color: college.featured ? '#f59e0b' : '#6b7280',
                        fill: college.featured ? '#f59e0b' : 'none'
                      }} />
                      <div>
                        <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Featured</p>
                        <p style={{ fontSize: '13px', fontWeight: '500', color: '#111827', margin: 0 }}>
                          {college.featured ? 'Yes' : 'No'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid #f3f4f6'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb',
                          backgroundColor: 'white',
                          color: '#374151',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f9fafb'
                          e.currentTarget.style.borderColor = '#d1d5db'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white'
                          e.currentTarget.style.borderColor = '#e5e7eb'
                        }}
                        onClick={() => window.location.href = `/admin/colleges/${college.id}`}
                      >
                        <Eye style={{ width: '14px', height: '14px' }} />
                        View
                      </button>
                      <button
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb',
                          backgroundColor: 'white',
                          color: '#374151',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f9fafb'
                          e.currentTarget.style.borderColor = '#d1d5db'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white'
                          e.currentTarget.style.borderColor = '#e5e7eb'
                        }}
                        onClick={() => window.location.href = `/admin/colleges/${college.id}/edit`}
                      >
                        <Edit style={{ width: '14px', height: '14px' }} />
                        Edit
                      </button>
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {college.website && (
                        <a href={college.website} target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'none' }}>
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}