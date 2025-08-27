import { Metadata } from 'next'
import Link from 'next/link'
import { 
  BarChart3, 
  Building2, 
  BookOpen, 
  Users, 
  PenTool, 
  Settings,
  TrendingUp,
  Eye
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Dashboard - AdmitVerse Admin',
  description: 'Content Management System Dashboard',
}

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Colleges',
      value: '0',
      description: 'Colleges in database',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Courses',
      value: '0',
      description: 'Courses available',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Blog Posts',
      value: '0',
      description: 'Published articles',
      icon: PenTool,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Page Views',
      value: '0',
      description: 'This month',
      icon: Eye,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ]

  const quickActions = [
    {
      title: 'Add New College',
      description: 'Add a new university or college to the database',
      href: '/colleges/add',
      icon: Building2,
      color: 'bg-blue-600',
    },
    {
      title: 'Write Blog Post',
      description: 'Create and publish a new blog article',
      href: '/blog/editor',
      icon: PenTool,
      color: 'bg-purple-600',
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      href: '/users',
      icon: Users,
      color: 'bg-green-600',
    },
    {
      title: 'View Analytics',
      description: 'Check website performance and statistics',
      href: '/analytics',
      icon: BarChart3,
      color: 'bg-orange-600',
    },
  ]

  return (
    <div className="admin-main">
      {/* Header */}
      <div className="admin-header">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to AdmitVerse Admin Panel</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link href="/" target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              View Website
            </Link>
          </Button>
          <Button asChild>
            <Link href="/colleges/add">
              <Building2 className="h-4 w-4 mr-2" />
              Add College
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="admin-content">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks to get you started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link key={action.title} href={action.href}>
                    <div className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                      <div className={`p-2 rounded-full ${action.color}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{action.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates and changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent activity</p>
                <p className="text-sm">Start by adding colleges or creating blog posts</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Getting Started
            </CardTitle>
            <CardDescription>
              Set up your AdmitVerse platform in a few simple steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Add Your First College</h4>
                  <p className="text-sm text-muted-foreground">
                    Start by adding universities and colleges to your database
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/colleges/add">Add College</Link>
                </Button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Create Course Listings</h4>
                  <p className="text-sm text-muted-foreground">
                    Add courses and specializations for each college
                  </p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Coming Soon
                </Button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Publish Blog Content</h4>
                  <p className="text-sm text-muted-foreground">
                    Write and publish articles to engage your audience
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog/editor">Write Post</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}