import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

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

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Don't apply authentication layout to the main admin page (login page)
  // This layout only applies to child routes like /admin/dashboard
  return (
    <>
      {children}
    </>
  )
}