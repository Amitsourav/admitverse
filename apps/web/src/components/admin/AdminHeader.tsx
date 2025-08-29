'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Bell, Search, Menu, LogOut, User, Settings } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'

interface AdminHeaderProps {
  user: {
    id: string
    username: string
    role: string
  }
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST',
      })

      if (response.ok) {
        toast.success('Logged out successfully')
        router.push('/admin/login')
      } else {
        toast.error('Logout failed')
      }
    } catch (error) {
      toast.error('Network error')
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      toast.success(`Searching for: ${searchQuery}`)
    }
  }

  const getUserInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase()
  }

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-900/10 lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Search */}
        <form 
          className="relative flex flex-1 items-center"
          onSubmit={handleSearch}
        >
          <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 pl-3" />
          <Input
            className="h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Search colleges, courses..."
            type="search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Right section */}
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications */}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <Bell className="h-6 w-6" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gray-500 text-white text-xs">
                    {getUserInitials(user.username)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.username}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.role || 'Admin'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}