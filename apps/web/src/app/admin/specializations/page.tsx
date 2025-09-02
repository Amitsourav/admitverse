'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
  MoreHorizontal, 
  Edit, 
  Eye,
  Trash2,
  Target,
  TrendingUp,
  Building,
  Download,
  Upload,
  Grid,
  List,
  BookOpen,
  DollarSign
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'react-hot-toast'

interface Specialization {
  id: number
  course_id: number
  name: string
  code?: string
  about?: string
  description?: string
  requirements?: string
  career_prospects?: string
  syllabus?: any
  placement_rate?: number
  avg_package?: number
  top_recruiters?: any
  research_areas?: any
  lab_facilities?: any
  is_sample: boolean
  created_at: string
  updated_at?: string
  courses?: {
    name: string
    colleges?: {
      name: string
    }
  }
}

export default function SpecializationsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('all')
  const [selectedPlacement, setSelectedPlacement] = useState('all')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [specializations, setSpecializations] = useState<Specialization[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSpecializations()
  }, [])

  const fetchSpecializations = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/specializations')
      const result = await response.json()
      
      if (result.success) {
        setSpecializations(result.data)
      } else {
        console.error('Failed to fetch specializations:', result.error)
        toast.error('Failed to load specializations')
      }
    } catch (error) {
      console.error('Error fetching specializations:', error)
      toast.error('Error loading specializations')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" specialization?`)) {
      try {
        const response = await fetch(`/api/admin/specializations?id=${id}`, {
          method: 'DELETE'
        })
        
        const result = await response.json()
        
        if (result.success) {
          fetchSpecializations()
          toast.success('Specialization deleted successfully')
        } else {
          toast.error('Failed to delete specialization')
        }
      } catch (error) {
        console.error('Error deleting specialization:', error)
        toast.error('Failed to delete specialization')
      }
    }
  }

  const filteredSpecializations = specializations.filter(spec => {
    const courseName = spec.courses?.name || ''
    const collegeName = spec.courses?.colleges?.name || ''
    const matchesSearch = spec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collegeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (spec.code || '').toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCourse = selectedCourse === 'all' || courseName.toLowerCase().includes(selectedCourse.toLowerCase())
    
    const placementRate = spec.placement_rate || 0
    const matchesPlacement = selectedPlacement === 'all' || 
                           (selectedPlacement === 'high' && placementRate >= 80) ||
                           (selectedPlacement === 'medium' && placementRate >= 60 && placementRate < 80) ||
                           (selectedPlacement === 'low' && placementRate < 60)
    
    return matchesSearch && matchesCourse && matchesPlacement
  })

  const getPlacementBadgeVariant = (rate: number) => {
    if (rate >= 80) return 'default'
    if (rate >= 60) return 'secondary'
    return 'destructive'
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Specializations Management</h1>
            <p className="text-muted-foreground">
              Manage course specializations and career-focused programs
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={() => {
              const input = document.createElement('input')
              input.type = 'file'
              input.accept = '.csv'
              input.onchange = async (e) => {
                const file = (e.target as HTMLInputElement).files?.[0]
                if (!file) return

                const text = await file.text()
                const lines = text.split('\n').filter(line => line.trim())
                
                if (lines.length < 2) {
                  toast.error('CSV file must have header and at least one data row')
                  return
                }

                const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
                const specializations = []

                for (let i = 1; i < lines.length; i++) {
                  const values = lines[i].split(',').map(v => v.trim())
                  const spec: any = {}

                  headers.forEach((header, index) => {
                    const value = values[index] || ''
                    switch (header) {
                      case 'name':
                        spec.name = value
                        break
                      case 'code':
                        spec.code = value
                        break
                      case 'course_id':
                        spec.course_id = parseInt(value) || null
                        break
                      case 'about':
                        spec.about = value
                        break
                      case 'description':
                        spec.description = value
                        break
                      case 'requirements':
                        spec.requirements = value
                        break
                      case 'career_prospects':
                        spec.career_prospects = value
                        break
                      case 'placement_rate':
                        spec.placement_rate = parseFloat(value) || null
                        break
                      case 'avg_package':
                        spec.avg_package = parseInt(value) || null
                        break
                    }
                  })

                  if (spec.name && spec.course_id) {
                    specializations.push(spec)
                  }
                }

                if (specializations.length === 0) {
                  toast.error('No valid specializations found in CSV')
                  return
                }

                let imported = 0
                for (const spec of specializations) {
                  try {
                    const response = await fetch('/api/admin/specializations', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(spec)
                    })
                    
                    if (response.ok) {
                      imported++
                    }
                  } catch (error) {
                    console.error('Error importing specialization:', error)
                  }
                }

                if (imported > 0) {
                  toast.success(`Successfully imported ${imported} specialization(s)`)
                  fetchSpecializations()
                } else {
                  toast.error('Failed to import specializations')
                }
              }
              input.click()
            }}
          >
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              if (specializations.length === 0) {
                toast.error('No specializations to export')
                return
              }
              const csvData = specializations.map(spec => ({
                Name: spec.name,
                Code: spec.code || '',
                Course: spec.courses?.name || '',
                College: spec.courses?.colleges?.name || '',
                'Placement Rate': spec.placement_rate || '',
                'Avg Package': spec.avg_package || '',
                About: spec.about || '',
                Requirements: spec.requirements || ''
              }))
              const csvContent = 'data:text/csv;charset=utf-8,' + 
                Object.keys(csvData[0] || {}).join(',') + '\n' +
                csvData.map(row => Object.values(row).join(',')).join('\n')
              const link = document.createElement('a')
              link.href = encodeURI(csvContent)
              link.download = `specializations_${new Date().toISOString().split('T')[0]}.csv`
              link.click()
              toast.success('Export started!')
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Link href="/admin/specializations/new">
            <Button style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} className="hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Add New Specialization
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Specializations
            </CardTitle>
            <Target className="w-4 h-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{specializations.length}</div>
            <p className="text-xs text-muted-foreground">
              All specialized programs
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              High Placement Rate
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{specializations.filter(s => (s.placement_rate || 0) >= 80).length}</div>
            <p className="text-xs text-muted-foreground">
              Above 80% placement
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Package
            </CardTitle>
            <DollarSign className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {specializations.length > 0 
                ? '$' + Math.round(specializations.reduce((sum, s) => sum + (s.avg_package || 0), 0) / specializations.length).toLocaleString()
                : '$0'}
            </div>
            <p className="text-xs text-muted-foreground">
              Average salary package
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Courses
            </CardTitle>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(specializations.map(s => s.courses?.name || 'Unknown')).size}</div>
            <p className="text-xs text-muted-foreground">
              With specializations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search specializations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {Array.from(new Set(specializations.map(s => s.courses?.name).filter(Boolean))).map(course => (
                    <SelectItem key={course} value={course || ''}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedPlacement} onValueChange={setSelectedPlacement}>
                <SelectTrigger>
                  <SelectValue placeholder="All Placements" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Placements</SelectItem>
                  <SelectItem value="high">High (80%+)</SelectItem>
                  <SelectItem value="medium">Medium (60-80%)</SelectItem>
                  <SelectItem value="low">Low (&lt;60%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="rounded-r-none"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-l-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {filteredSpecializations.length} of {specializations.length} specializations
            </p>
            {(searchQuery || selectedCourse !== 'all' || selectedPlacement !== 'all') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCourse('all')
                  setSelectedPlacement('all')
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {loading ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mb-4"></div>
            <p className="text-muted-foreground">Loading specializations...</p>
          </CardContent>
        </Card>
      ) : filteredSpecializations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Target className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No specializations found</h3>
            <p className="text-muted-foreground text-center mb-6">Try adjusting your search criteria</p>
            <Button
              onClick={() => {
                setSearchQuery('')
                setSelectedCourse('all')
                setSelectedPlacement('all')
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === 'table' ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead className="text-center">Placement Rate</TableHead>
                  <TableHead className="text-center">Avg Package</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSpecializations.map((spec) => (
                  <TableRow key={spec.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{spec.name}</div>
                        {spec.code && (
                          <div className="text-sm text-muted-foreground">
                            Code: {spec.code}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{spec.courses?.name || 'Unknown Course'}</TableCell>
                    <TableCell>{spec.courses?.colleges?.name || 'Unknown College'}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getPlacementBadgeVariant(spec.placement_rate || 0)}>
                        {spec.placement_rate || 0}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      ${(spec.avg_package || 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => router.push(`/admin/specializations/${spec.id}`)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => router.push(`/admin/specializations/${spec.id}/edit`)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(spec.id, spec.name)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSpecializations.map((spec) => (
            <Card key={spec.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="line-clamp-1">{spec.name}</CardTitle>
                    {spec.code && (
                      <Badge variant="outline" className="text-xs">
                        {spec.code}
                      </Badge>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => router.push(`/admin/specializations/${spec.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push(`/admin/specializations/${spec.id}/edit`)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(spec.id, spec.name)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {spec.courses?.name || 'Unknown Course'}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Building className="w-4 h-4 mr-2" />
                    {spec.courses?.colleges?.name || 'Unknown College'}
                  </div>
                </div>
                
                {spec.about && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {spec.about}
                  </p>
                )}
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <Badge variant={getPlacementBadgeVariant(spec.placement_rate || 0)} className="text-xs">
                        {spec.placement_rate || 0}%
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        ${(spec.avg_package || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}