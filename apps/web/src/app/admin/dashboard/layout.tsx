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

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect('/admin')
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      display: 'flex'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '256px',
        minHeight: '100vh',
        backgroundColor: 'white',
        borderRight: '1px solid #e5e7eb',
        position: 'fixed',
        left: 0,
        top: 0
      }}>
        <AdminSidebar />
      </div>
      
      {/* Main Content */}
      <div style={{ 
        flex: 1,
        paddingLeft: '256px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <AdminHeader user={user} />
        <main style={{ 
          flex: 1, 
          padding: '32px 16px'
        }}>
          <div style={{ 
            maxWidth: '1200px',
            margin: '0 auto' 
          }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}