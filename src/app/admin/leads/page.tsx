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
  Users,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Building,
  BookOpen,
  Target,
  Download,
  Upload,
  Grid,
  List,
  Filter
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'react-hot-toast'

interface Lead {
  id: number
  name: string
  email: string
  phone?: string
  message?: string
  status: string
  source?: string
  specializationId?: number
  userId?: number
  isSample: boolean
  createdAt: string
  updatedAt?: string
  specialization?: {
    id: number
    name: string
    course: {
      id: number
      name: string
      college: {
        id: number
        name: string
        location?: string
      }
    }
  }
  user?: {
    id: number
    username: string
    email: string
    fullName?: string
  }
}

const leadStatuses = [
  { value: 'new', label: 'New', color: '#3b82f6' },
  { value: 'contacted', label: 'Contacted', color: '#f59e0b' },
  { value: 'qualified', label: 'Qualified', color: '#10b981' },
  { value: 'converted', label: 'Converted', color: '#8b5cf6' },
  { value: 'lost', label: 'Lost', color: '#ef4444' }
]

export default function LeadsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedSource, setSelectedSource] = useState('all')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/leads')
      const result = await response.json()
      
      if (result.success) {
        setLeads(result.data)
      } else {
        console.error('Failed to fetch leads:', result.error)
        toast.error('Failed to load leads')
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
      toast.error('Error loading leads')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete lead from "${name}"?`)) {
      try {
        const response = await fetch(`/api/admin/leads?id=${id}`, {
          method: 'DELETE'
        })
        
        const result = await response.json()
        
        if (result.success) {
          fetchLeads()
          toast.success('Lead deleted successfully')
        } else {
          toast.error('Failed to delete lead')
        }
      } catch (error) {
        console.error('Error deleting lead:', error)
        toast.error('Failed to delete lead')
      }
    }
  }

  const handleStatusChange = async (leadId: number, newStatus: string) => {
    try {
      const lead = leads.find(l => l.id === leadId)
      if (!lead) return

      const response = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lead,
          id: leadId,
          status: newStatus
        })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Status updated successfully')
        fetchLeads()
      } else {
        toast.error('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (lead.phone || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (lead.specialization?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus
    const matchesSource = selectedSource === 'all' || lead.source === selectedSource
    
    return matchesSearch && matchesStatus && matchesSource
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = leadStatuses.find(s => s.value === status)
    return statusConfig || leadStatuses[0]
  }

  const getLeadStats = () => {
    const total = leads.length
    const newLeads = leads.filter(l => l.status === 'new').length
    const qualified = leads.filter(l => l.status === 'qualified').length
    const converted = leads.filter(l => l.status === 'converted').length
    
    return { total, newLeads, qualified, converted }
  }

  const stats = getLeadStats()

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Leads Management</h1>
            <p className="text-muted-foreground">
              Track and manage student inquiries and applications
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
                const leadsData = []

                for (let i = 1; i < lines.length; i++) {
                  const values = lines[i].split(',').map(v => v.trim())
                  const lead: any = {}

                  headers.forEach((header, index) => {
                    const value = values[index] || ''
                    switch (header) {
                      case 'name':
                        lead.name = value
                        break
                      case 'email':
                        lead.email = value
                        break
                      case 'phone':
                        lead.phone = value
                        break
                      case 'message':
                        lead.message = value
                        break
                      case 'status':
                        lead.status = value
                        break
                      case 'source':
                        lead.source = value
                        break
                      case 'specialization_id':
                        lead.specialization_id = parseInt(value) || null
                        break
                      case 'user_id':
                        lead.user_id = parseInt(value) || null
                        break
                    }
                  })

                  if (lead.name && lead.email) {
                    leadsData.push(lead)
                  }
                }

                if (leadsData.length === 0) {
                  toast.error('No valid leads found in CSV')
                  return
                }

                let imported = 0
                for (const lead of leadsData) {
                  try {
                    const response = await fetch('/api/admin/leads', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(lead)
                    })
                    
                    if (response.ok) {
                      imported++
                    }
                  } catch (error) {
                    console.error('Error importing lead:', error)
                  }
                }

                if (imported > 0) {
                  toast.success(`Successfully imported ${imported} lead(s)`)
                  fetchLeads()
                } else {
                  toast.error('Failed to import leads')
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
              if (leads.length === 0) {
                toast.error('No leads to export')
                return
              }
              const csvData = leads.map(lead => ({
                Name: lead.name,
                Email: lead.email,
                Phone: lead.phone || '',
                Status: lead.status,
                Source: lead.source || '',
                Specialization: lead.specialization?.name || '',
                Course: lead.specialization?.course?.name || '',
                College: lead.specialization?.course?.college?.name || '',
                Message: lead.message || '',
                'Created Date': new Date(lead.createdAt).toLocaleDateString()
              }))
              const csvContent = 'data:text/csv;charset=utf-8,' + 
                Object.keys(csvData[0] || {}).join(',') + '\n' +
                csvData.map(row => Object.values(row).map(v => `"${v}"`).join(',')).join('\n')
              const link = document.createElement('a')
              link.href = encodeURI(csvContent)
              link.download = `leads_${new Date().toISOString().split('T')[0]}.csv`
              link.click()
              toast.success('Export started!')
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Link href="/admin/leads/new">
            <Button 
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} 
              className="hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Lead
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Leads
            </CardTitle>
            <Users className="w-4 h-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              All inquiries received
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              New Leads
            </CardTitle>
            <Clock className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newLeads}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting response
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Qualified
            </CardTitle>
            <Target className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.qualified}</div>
            <p className="text-xs text-muted-foreground">
              Potential students
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Converted
            </CardTitle>
            <MessageSquare className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.converted}</div>
            <p className="text-xs text-muted-foreground">
              Successful enrollments
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
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {leadStatuses.map(status => (
                    <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSource} onValueChange={setSelectedSource}>
                <SelectTrigger>
                  <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {Array.from(new Set(leads.map(l => l.source).filter(Boolean))).map(source => (
                    <SelectItem key={source} value={source || ''}>{source}</SelectItem>
                  ))}
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
              Showing {filteredLeads.length} of {leads.length} leads
            </p>
            {(searchQuery || selectedStatus !== 'all' || selectedSource !== 'all') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedStatus('all')
                  setSelectedSource('all')
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-muted-foreground">Loading leads...</p>
          </CardContent>
        </Card>
      ) : filteredLeads.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Users className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No leads found</h3>
            <p className="text-muted-foreground text-center mb-6">Try adjusting your search criteria</p>
            <Button
              onClick={() => {
                setSearchQuery('')
                setSelectedStatus('all')
                setSelectedSource('all')
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
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => {
                  const statusConfig = getStatusBadge(lead.status)
                  return (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{lead.name}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              {lead.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {lead.specialization ? (
                          <div>
                            <div className="font-medium">{lead.specialization.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {lead.specialization.course.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {lead.specialization.course.college.name}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">General Inquiry</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={lead.status}
                          onValueChange={(value) => handleStatusChange(lead.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <Badge style={{ backgroundColor: statusConfig.color, color: 'white' }}>
                              {statusConfig.label}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            {leadStatuses.map(status => (
                              <SelectItem key={status.value} value={status.value}>
                                <Badge style={{ backgroundColor: status.color, color: 'white' }}>
                                  {status.label}
                                </Badge>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{lead.source || 'Direct'}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(lead.createdAt).toLocaleTimeString()}
                        </div>
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
                              onClick={() => router.push(`/admin/leads/${lead.id}`)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => router.push(`/admin/leads/${lead.id}/edit`)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(lead.id, lead.name)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLeads.map((lead) => {
            const statusConfig = getStatusBadge(lead.status)
            return (
              <Card key={lead.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="line-clamp-1">{lead.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        {lead.email}
                      </div>
                      {lead.phone && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </div>
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
                          onClick={() => router.push(`/admin/leads/${lead.id}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push(`/admin/leads/${lead.id}/edit`)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(lead.id, lead.name)}
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
                    {lead.specialization && (
                      <>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Target className="w-4 h-4 mr-2" />
                          {lead.specialization.name}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <BookOpen className="w-4 h-4 mr-2" />
                          {lead.specialization.course.name}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Building className="w-4 h-4 mr-2" />
                          {lead.specialization.course.college.name}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {lead.message && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {lead.message}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Badge style={{ backgroundColor: statusConfig.color, color: 'white' }}>
                        {statusConfig.label}
                      </Badge>
                      {lead.source && (
                        <Badge variant="outline">{lead.source}</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}