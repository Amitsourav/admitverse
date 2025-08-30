'use client'

import { useState } from 'react'
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
  List
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

  const filteredColleges = mockColleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || college.status.toLowerCase() === statusFilter
    const matchesCountry = countryFilter === 'all' || college.country.toLowerCase().includes(countryFilter.toLowerCase())
    
    return matchesSearch && matchesStatus && matchesCountry
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return '#10b981'
      case 'DRAFT': return '#f59e0b' 
      case 'INACTIVE': return '#ef4444'
      default: return '#6b7280'
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
        deleteMutation.mutate({ id })
      } catch (error) {
        // Error handled in mutation
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
        
        {/* Top Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px'
            }}>
              <div style={{
                padding: '8px',
                backgroundColor: '#eff6ff',
                borderRadius: '8px'
              }}>
                <GraduationCap style={{
                  height: '24px',
                  width: '24px',
                  color: '#2563eb'
                }} />
              </div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#111827',
                margin: 0,
                letterSpacing: '-1px'
              }}>
                Colleges
              </h1>
            </div>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: 0,
              lineHeight: 1.5
            }}>
              Manage university partnerships and course offerings across {mockColleges.length} institutions
            </p>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb'
              e.currentTarget.style.borderColor = '#9ca3af'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
              e.currentTarget.style.borderColor = '#d1d5db'
            }}>
              <Upload style={{ height: '16px', width: '16px' }} />
              Import
            </button>
            
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb'
              e.currentTarget.style.borderColor = '#9ca3af'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
              e.currentTarget.style.borderColor = '#d1d5db'
            }}>
              <Download style={{ height: '16px', width: '16px' }} />
              Export
            </button>
            
            <Link 
              href="/admin/colleges/new"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(102, 126, 234, 0.2)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(102, 126, 234, 0.2)'
              }}
            >
              <Plus style={{ height: '16px', width: '16px' }} />
              Add College
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          {[
            {
              title: 'Total Colleges',
              value: mockColleges.length,
              icon: Building,
              color: '#3b82f6',
              bgColor: '#eff6ff'
            },
            {
              title: 'Active Colleges',
              value: mockColleges.filter(c => c.status === 'ACTIVE').length,
              icon: GraduationCap,
              color: '#10b981',
              bgColor: '#ecfdf5'
            },
            {
              title: 'Featured',
              value: mockColleges.filter(c => c.featured).length,
              icon: Star,
              color: '#f59e0b',
              bgColor: '#fefbeb'
            },
            {
              title: 'Countries',
              value: new Set(mockColleges.map(c => c.country)).size,
              icon: Globe,
              color: '#8b5cf6',
              bgColor: '#f5f3ff'
            }
          ].map((stat, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e5e7eb',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <div style={{
                  padding: '10px',
                  backgroundColor: stat.bgColor,
                  borderRadius: '8px'
                }}>
                  <stat.icon style={{
                    height: '20px',
                    width: '20px',
                    color: stat.color
                  }} />
                </div>
                <TrendingUp style={{
                  height: '16px',
                  width: '16px',
                  color: '#10b981'
                }} />
              </div>
              <div>
                <p style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#111827',
                  margin: '0 0 4px 0'
                }}>
                  {stat.value}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  {stat.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 140px 140px auto',
          gap: '16px',
          alignItems: 'end'
        }}>
          {/* Search */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Search Colleges
            </label>
            <div style={{ position: 'relative' }}>
              <Search style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                height: '18px',
                width: '18px',
                color: '#9ca3af'
              }} />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1'
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div style={{ position: 'relative', zIndex: 20 }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer',
                outline: 'none',
                position: 'relative',
                zIndex: 20
              }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Country Filter */}
          <div style={{ position: 'relative', zIndex: 19 }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Country
            </label>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer',
                outline: 'none',
                position: 'relative',
                zIndex: 19
              }}
            >
              <option value="all">All Countries</option>
              <option value="united states">United States</option>
              <option value="united kingdom">United Kingdom</option>
              <option value="canada">Canada</option>
              <option value="australia">Australia</option>
            </select>
          </div>

          {/* View Toggle */}
          <div style={{
            display: 'flex',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            padding: '4px'
          }}>
            <button
              onClick={() => setSelectedView('table')}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: selectedView === 'table' ? 'white' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedView === 'table' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              <List style={{
                height: '16px',
                width: '16px',
                color: selectedView === 'table' ? '#6366f1' : '#6b7280'
              }} />
            </button>
            <button
              onClick={() => setSelectedView('grid')}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: selectedView === 'grid' ? 'white' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedView === 'grid' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              <Grid style={{
                height: '16px',
                width: '16px',
                color: selectedView === 'grid' ? '#6366f1' : '#6b7280'
              }} />
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        
        {/* Results Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827',
              margin: '0 0 4px 0'
            }}>
              {filteredColleges.length} College{filteredColleges.length !== 1 ? 's' : ''}
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0
            }}>
              Showing active partnerships and draft entries
            </p>
          </div>
          <div style={{
            fontSize: '13px',
            color: '#6b7280'
          }}>
            Last updated 2 hours ago
          </div>
        </div>

        {/* Table View */}
        {selectedView === 'table' && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>College</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredColleges.map((college) => (
                  <TableRow key={college.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{college.name}</div>
                        {college.establishedYear && (
                          <div className="text-sm text-gray-500">
                            Est. {college.establishedYear}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {college.location}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {college.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {college.stats.courses} course{college.stats.courses !== 1 ? 's' : ''}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={`text-white ${statusColors[college.status as keyof typeof statusColors]}`}
                      >
                        {statusLabels[college.status as keyof typeof statusLabels]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleToggleFeatured(college.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Star 
                          className={`h-4 w-4 ${
                            college.featured 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </button>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/colleges/${college.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/colleges/${college.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(college.id, college.name)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Empty State */}
        {filteredColleges.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#f3f4f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <GraduationCap style={{
                height: '40px',
                width: '40px',
                color: '#9ca3af'
              }} />
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
              margin: '0 0 32px 0',
              maxWidth: '400px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              {searchTerm || statusFilter !== 'all' || countryFilter !== 'all' 
                ? 'Try adjusting your search filters to find more colleges.'
                : 'Get started by adding your first college to the platform.'
              }
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {(searchTerm || statusFilter !== 'all' || countryFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('all')
                    setCountryFilter('all')
                  }}
                  style={{
                    padding: '10px 16px',
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#374151',
                    cursor: 'pointer'
                  }}
                >
                  Clear Filters
                </button>
              )}
              <Link
                href="/admin/colleges/new"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}
              >
                <Plus style={{ height: '16px', width: '16px' }} />
                Add College
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}