import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

// Force dynamic rendering for dashboard routes
export const dynamic = 'force-dynamic'

async function getUser() {
  const cookieStore = cookies()
  const token = cookieStore.get('admitverse_session')?.value

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    return decoded
  } catch (error) {
    return null
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Since the main admin layout now handles authentication and layout,
  // this dashboard layout just needs to render children
  return <>{children}</>
}