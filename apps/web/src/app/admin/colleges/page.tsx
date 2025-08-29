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
  MoreVertical, 
  Edit, 
  Eye,
  Trash2,
  Star,
  MapPin,
  GraduationCap
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

export default function CollegesManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [page, setPage] = useState(0)
  const pageSize = 20

  // Fetch colleges with filters
  // Mock data for now - replace with actual API calls later
  const collegesData = {
    colleges: [
      {
        id: '1',
        name: 'Harvard University',
        country: 'United States',
        city: 'Cambridge',
        status: 'ACTIVE',
        website: 'https://harvard.edu',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-02-01'),
        _count: {
          courses: 45
        }
      },
      {
        id: '2',
        name: 'Oxford University',
        country: 'United Kingdom',
        city: 'Oxford',
        status: 'ACTIVE',
        website: 'https://oxford.ac.uk',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-25'),
        _count: {
          courses: 32
        }
      },
      {
        id: '3',
        name: 'MIT',
        country: 'United States',
        city: 'Cambridge',
        status: 'ACTIVE',
        website: 'https://mit.edu',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-15'),
        _count: {
          courses: 28
        }
      }
    ],
    total: 3,
    totalPages: 1
  }
  const isLoading = false
  const refetch = () => console.log('Refetch called')

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(0) // Reset to first page
    refetch()
  }

  const handleToggleFeatured = async (id: string) => {
    try {
      await toggleFeaturedMutation.mutateAsync({ id })
    } catch (error) {
      // Error handled in mutation
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      try {
        await deleteMutation.mutateAsync({ id })
      } catch (error) {
        // Error handled in mutation
      }
    }
  }

  const colleges = collegesData?.colleges || []
  const totalPages = collegesData?.pagination?.pages || 0
  const hasMore = collegesData?.hasMore || false

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Colleges</h1>
          <p className="mt-2 text-gray-600">
            Manage universities and educational institutions
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/colleges/new">
            <Plus className="mr-2 h-4 w-4" />
            Add College
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search colleges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {collegesData?.total ? `${collegesData.total} Colleges` : 'Colleges'}
            </CardTitle>
            <div className="text-sm text-gray-500">
              Page {page + 1} of {totalPages}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading colleges...</p>
            </div>
          ) : colleges.length === 0 ? (
            <div className="text-center py-8">
              <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No colleges found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery || statusFilter ? 
                  'Try adjusting your search filters.' : 
                  'Get started by adding your first college.'
                }
              </p>
              {!searchQuery && !statusFilter && (
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/admin/colleges/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Add College
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          ) : (
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
                  {colleges.map((college) => (
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
                            {college.city}
                            {college.country?.name && `, ${college.country.name}`}
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
                          {college._count.courses} course{college._count.courses !== 1 ? 's' : ''}
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
                          disabled={toggleFeaturedMutation.isLoading}
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
                              <MoreVertical className="h-4 w-4" />
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
                              disabled={deleteMutation.isLoading}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Showing {page * pageSize + 1} to {Math.min((page + 1) * pageSize, collegesData?.total || 0)} of {collegesData?.total || 0} results
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0 || isLoading}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPage(page + 1)}
                  disabled={!hasMore || isLoading}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}