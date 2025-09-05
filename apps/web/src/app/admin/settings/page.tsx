'use client'

import { useState } from 'react'
import {
  Settings,
  User,
  Lock,
  Bell,
  Database,
  Globe,
  Shield,
  Key,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Upload,
  Download,
  Monitor,
  Moon,
  Sun,
  Server,
  Activity,
  HardDrive
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { toast } from 'react-hot-toast'

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  
  // Profile Settings State
  const [profile, setProfile] = useState({
    username: 'admin',
    email: 'admin@admitverse.com',
    fullName: 'Admin User',
    phone: '+1 234 567 8900',
    role: 'Super Admin',
    organization: 'AdmitVerse',
    avatar: null as string | null
  })

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showCurrent: false,
    showNew: false,
    showConfirm: false
  })

  // Application Settings State
  const [appSettings, setAppSettings] = useState({
    siteName: 'AdmitVerse',
    siteUrl: 'https://admitverse.com',
    siteDescription: 'Your Gateway to International Education',
    supportEmail: 'support@admitverse.com',
    contactPhone: '+1 800 123 4567',
    timeZone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    language: 'en',
    theme: 'light',
    autoSave: true,
    maintenanceMode: false
  })

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    newLeads: true,
    applicationUpdates: true,
    systemAlerts: true,
    marketingEmails: false,
    weeklyReports: true,
    monthlyDigest: true
  })

  // API Settings State
  const [apiSettings, setApiSettings] = useState({
    openaiKey: 'sk-proj-aUY6DxGzk41F-t96kD_IG2bYJfky_EuDzax...',
    supabaseUrl: 'https://tynarhtghrsldbgyevnf.supabase.co',
    supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    emailProvider: 'resend',
    emailApiKey: '',
    smsProvider: 'twilio',
    smsApiKey: '',
    storageProvider: 'supabase',
    cdnUrl: ''
  })

  // Database Stats
  const [dbStats, setDbStats] = useState({
    totalSize: '2.4 GB',
    collections: 5,
    documents: 10847,
    backupStatus: 'Completed',
    lastBackup: '2025-01-05 02:00 AM',
    nextBackup: '2025-01-06 02:00 AM'
  })

  const handleProfileUpdate = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Password changed successfully')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        showCurrent: false,
        showNew: false,
        showConfirm: false
      })
    } catch (error) {
      toast.error('Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  const handleAppSettingsUpdate = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Application settings updated')
    } catch (error) {
      toast.error('Failed to update settings')
    } finally {
      setLoading(false)
    }
  }

  const handleBackup = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Backup initiated successfully')
      setDbStats(prev => ({
        ...prev,
        backupStatus: 'In Progress'
      }))
    } catch (error) {
      toast.error('Backup failed')
    } finally {
      setLoading(false)
    }
  }

  const handleExportData = () => {
    toast.success('Export started. You will receive an email when ready.')
  }

  const statsCards = [
    { label: 'Total Size', value: dbStats.totalSize, icon: HardDrive, color: '#667eea' },
    { label: 'Collections', value: dbStats.collections, icon: Database, color: '#10b981' },
    { label: 'Documents', value: dbStats.documents.toLocaleString(), icon: Activity, color: '#f59e0b' },
    { label: 'Last Backup', value: dbStats.lastBackup, icon: Server, color: '#ef4444' }
  ]

  return (
    <div style={{
      padding: '32px'
    }}>
      
      {/* Header Section - Matching colleges/courses pattern */}
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
            <Settings style={{ width: '28px', height: '28px', color: 'white' }} />
          </div>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#111827',
              margin: 0,
              letterSpacing: '-0.5px'
            }}>
              Settings Management
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '4px 0 0 0'
            }}>
              Manage your account settings and application preferences
            </p>
          </div>
        </div>
        
        {/* Action buttons matching the pattern */}
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
            onClick={handleExportData}
          >
            <Download style={{ width: '16px', height: '16px' }} />
            Export Settings
          </button>
          
          <button 
            onClick={handleBackup}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              background: loading ? '#f3f4f6' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              fontSize: '14px',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <RefreshCw style={{ width: '16px', height: '16px' }} />
            {loading ? 'Backing up...' : 'Backup Now'}
          </button>
        </div>
      </div>

      {/* Stats Overview - Similar to courses page */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {statsCards.map(stat => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              style={{
                padding: '24px',
                borderRadius: '12px',
                background: 'white',
                border: '1px solid #f1f5f9',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}25 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon style={{ width: '24px', height: '24px', color: stat.color }} />
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', fontWeight: '500' }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: 0 }}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Controls Bar - Similar to courses page */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
        padding: '20px 24px',
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            padding: '8px 12px',
            background: '#f8fafc',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#475569'
          }}>
            Configure your system preferences
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            padding: '6px 12px',
            background: '#dcfce7',
            color: '#166534',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            All Systems Operational
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} style={{ marginTop: '32px' }}>
        <TabsList style={{
          background: 'white',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid #f1f5f9',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          height: 'auto'
        }}>
          <TabsTrigger value="profile" style={{ borderRadius: '8px', padding: '8px 16px', fontSize: '14px', fontWeight: '500' }}>
            <User style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" style={{ borderRadius: '8px', padding: '8px 16px', fontSize: '14px', fontWeight: '500' }}>
            <Lock style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Security
          </TabsTrigger>
          <TabsTrigger value="application" style={{ borderRadius: '8px', padding: '8px 16px', fontSize: '14px', fontWeight: '500' }}>
            <Globe style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Application
          </TabsTrigger>
          <TabsTrigger value="notifications" style={{ borderRadius: '8px', padding: '8px 16px', fontSize: '14px', fontWeight: '500' }}>
            <Bell style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="api" style={{ borderRadius: '8px', padding: '8px 16px', fontSize: '14px', fontWeight: '500' }}>
            <Key style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="database" style={{ borderRadius: '8px', padding: '8px 16px', fontSize: '14px', fontWeight: '500' }}>
            <Database style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Database
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" style={{ marginTop: '24px' }}>
          <Card style={{
            border: '1px solid #f1f5f9',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            background: 'white'
          }}>
            <CardHeader style={{ borderBottom: '1px solid #f1f5f9', padding: '24px' }}>
              <CardTitle style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
                Profile Information
              </CardTitle>
              <CardDescription style={{ color: '#6b7280', marginTop: '8px' }}>
                Update your personal information and account details
              </CardDescription>
            </CardHeader>
            <CardContent style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gap: '24px' }}>
                {/* Avatar Upload */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '36px',
                    fontWeight: '600'
                  }}>
                    {profile.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div>
                    <button style={{
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      background: 'white',
                      color: '#374151',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
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
                    }}>
                      <Upload style={{ width: '16px', height: '16px' }} />
                      Upload Photo
                    </button>
                    <p style={{ fontSize: '13px', color: '#6b7280' }}>
                      JPG, PNG or GIF. Max 5MB
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Profile Form */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  <div>
                    <Label htmlFor="username" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Username</Label>
                    <Input
                      id="username"
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fullName" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Full Name</Label>
                    <Input
                      id="fullName"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="organization" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Organization</Label>
                    <Input
                      id="organization"
                      value={profile.organization}
                      onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Role</Label>
                    <Input
                      id="role"
                      value={profile.role}
                      disabled
                      style={{ width: '100%', opacity: 0.6, background: '#f8fafc' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                  <button
                    onClick={handleProfileUpdate}
                    disabled={loading}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '8px',
                      background: loading ? '#f3f4f6' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.transform = 'translateY(-1px)'
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <Save style={{ width: '16px', height: '16px' }} />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" style={{ marginTop: '24px' }}>
          <Card style={{
            border: '1px solid #f1f5f9',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            background: 'white'
          }}>
            <CardHeader style={{ borderBottom: '1px solid #f1f5f9', padding: '24px' }}>
              <CardTitle style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
                Security Settings
              </CardTitle>
              <CardDescription style={{ color: '#6b7280', marginTop: '8px' }}>
                Manage your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gap: '32px' }}>
                {/* Change Password Section */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                    Change Password
                  </h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div>
                      <Label htmlFor="currentPassword" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                        Current Password
                      </Label>
                      <div style={{ position: 'relative' }}>
                        <Input
                          id="currentPassword"
                          type={passwordData.showCurrent ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          style={{ width: '100%', paddingRight: '40px' }}
                        />
                        <button
                          type="button"
                          onClick={() => setPasswordData({ ...passwordData, showCurrent: !passwordData.showCurrent })}
                          style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#6b7280'
                          }}
                        >
                          {passwordData.showCurrent ? 
                            <EyeOff style={{ width: '18px', height: '18px' }} /> : 
                            <Eye style={{ width: '18px', height: '18px' }} />
                          }
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="newPassword" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                        New Password
                      </Label>
                      <div style={{ position: 'relative' }}>
                        <Input
                          id="newPassword"
                          type={passwordData.showNew ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          style={{ width: '100%', paddingRight: '40px' }}
                        />
                        <button
                          type="button"
                          onClick={() => setPasswordData({ ...passwordData, showNew: !passwordData.showNew })}
                          style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#6b7280'
                          }}
                        >
                          {passwordData.showNew ? 
                            <EyeOff style={{ width: '18px', height: '18px' }} /> : 
                            <Eye style={{ width: '18px', height: '18px' }} />
                          }
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                        Confirm New Password
                      </Label>
                      <div style={{ position: 'relative' }}>
                        <Input
                          id="confirmPassword"
                          type={passwordData.showConfirm ? 'text' : 'password'}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          style={{ width: '100%', paddingRight: '40px' }}
                        />
                        <button
                          type="button"
                          onClick={() => setPasswordData({ ...passwordData, showConfirm: !passwordData.showConfirm })}
                          style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#6b7280'
                          }}
                        >
                          {passwordData.showConfirm ? 
                            <EyeOff style={{ width: '18px', height: '18px' }} /> : 
                            <Eye style={{ width: '18px', height: '18px' }} />
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handlePasswordChange}
                    disabled={loading}
                    style={{
                      marginTop: '20px',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: '1px solid #ef4444',
                      background: loading ? '#f3f4f6' : '#ef4444',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.transform = 'translateY(-1px)'
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <Lock style={{ width: '16px', height: '16px' }} />
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>

                <Separator />

                {/* Two-Factor Authentication */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                    Two-Factor Authentication
                  </h3>
                  <div style={{
                    padding: '20px',
                    borderRadius: '12px',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Shield style={{ width: '24px', height: '24px', color: '#16a34a' }} />
                        <div>
                          <p style={{ fontSize: '15px', fontWeight: '500', color: '#111827', margin: 0 }}>
                            2FA is currently disabled
                          </p>
                          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                            Add an extra layer of security to your account
                          </p>
                        </div>
                      </div>
                      <button style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: '1px solid #16a34a',
                        background: '#16a34a',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)'
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.3)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}>
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Sessions */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                    Active Sessions
                  </h3>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    <div style={{
                      padding: '20px',
                      borderRadius: '12px',
                      border: '1px solid #f1f5f9',
                      background: 'white',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ fontSize: '15px', fontWeight: '500', color: '#111827', margin: 0 }}>
                            Chrome on MacOS
                          </p>
                          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                            192.168.1.1 · Current session
                          </p>
                        </div>
                        <div style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          background: '#dcfce7',
                          color: '#166534',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          Active
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Application Tab */}
        <TabsContent value="application" style={{ marginTop: '24px' }}>
          <Card style={{
            border: '1px solid #f1f5f9',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            background: 'white'
          }}>
            <CardHeader style={{ borderBottom: '1px solid #f1f5f9', padding: '24px' }}>
              <CardTitle style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
                Application Settings
              </CardTitle>
              <CardDescription style={{ color: '#6b7280', marginTop: '8px' }}>
                Configure your application preferences and behavior
              </CardDescription>
            </CardHeader>
            <CardContent style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gap: '24px' }}>
                {/* General Settings */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                    General
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <div>
                      <Label htmlFor="siteName" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Site Name</Label>
                      <Input
                        id="siteName"
                        value={appSettings.siteName}
                        onChange={(e) => setAppSettings({ ...appSettings, siteName: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="siteUrl" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Site URL</Label>
                      <Input
                        id="siteUrl"
                        value={appSettings.siteUrl}
                        onChange={(e) => setAppSettings({ ...appSettings, siteUrl: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="supportEmail" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Support Email</Label>
                      <Input
                        id="supportEmail"
                        type="email"
                        value={appSettings.supportEmail}
                        onChange={(e) => setAppSettings({ ...appSettings, supportEmail: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Contact Phone</Label>
                      <Input
                        id="contactPhone"
                        value={appSettings.contactPhone}
                        onChange={(e) => setAppSettings({ ...appSettings, contactPhone: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Regional Settings */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                    Regional
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <div>
                      <Label htmlFor="timezone" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Time Zone</Label>
                      <Select value={appSettings.timeZone} onValueChange={(value) => setAppSettings({ ...appSettings, timeZone: value })}>
                        <SelectTrigger id="timezone" style={{ width: '100%' }}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (US)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (US)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (US)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT)</SelectItem>
                          <SelectItem value="Asia/Kolkata">India (IST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dateFormat" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Date Format</Label>
                      <Select value={appSettings.dateFormat} onValueChange={(value) => setAppSettings({ ...appSettings, dateFormat: value })}>
                        <SelectTrigger id="dateFormat" style={{ width: '100%' }}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="language" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Language</Label>
                      <Select value={appSettings.language} onValueChange={(value) => setAppSettings({ ...appSettings, language: value })}>
                        <SelectTrigger id="language" style={{ width: '100%' }}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Appearance */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                    Appearance
                  </h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      {[
                        { value: 'light', label: 'Light', icon: Sun },
                        { value: 'dark', label: 'Dark', icon: Moon },
                        { value: 'system', label: 'System', icon: Monitor }
                      ].map(theme => {
                        const Icon = theme.icon
                        const isSelected = appSettings.theme === theme.value
                        return (
                          <button
                            key={theme.value}
                            onClick={() => setAppSettings({ ...appSettings, theme: theme.value })}
                            style={{
                              padding: '12px 20px',
                              borderRadius: '8px',
                              border: isSelected ? '2px solid #667eea' : '1px solid #e5e7eb',
                              background: isSelected ? '#f0f4ff' : 'white',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.backgroundColor = '#f9fafb'
                                e.currentTarget.style.borderColor = '#d1d5db'
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.backgroundColor = 'white'
                                e.currentTarget.style.borderColor = '#e5e7eb'
                              }
                            }}
                          >
                            <Icon style={{ width: '20px', height: '20px', color: isSelected ? '#667eea' : '#6b7280' }} />
                            <span style={{ color: isSelected ? '#667eea' : '#6b7280', fontWeight: '500', fontSize: '14px' }}>
                              {theme.label}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Advanced Settings */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                    Advanced
                  </h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px',
                      borderRadius: '8px',
                      border: '1px solid #f1f5f9',
                      background: 'white'
                    }}>
                      <div>
                        <Label htmlFor="autoSave" style={{ fontSize: '15px', fontWeight: '500', color: '#111827' }}>
                          Auto-save
                        </Label>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                          Automatically save changes as you type
                        </p>
                      </div>
                      <Switch
                        id="autoSave"
                        checked={appSettings.autoSave}
                        onCheckedChange={(checked: boolean) => setAppSettings({ ...appSettings, autoSave: checked })}
                      />
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px',
                      borderRadius: '8px',
                      border: '1px solid #f1f5f9',
                      background: 'white'
                    }}>
                      <div>
                        <Label htmlFor="maintenance" style={{ fontSize: '15px', fontWeight: '500', color: '#111827' }}>
                          Maintenance Mode
                        </Label>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                          Temporarily disable public access to the site
                        </p>
                      </div>
                      <Switch
                        id="maintenance"
                        checked={appSettings.maintenanceMode}
                        onCheckedChange={(checked: boolean) => setAppSettings({ ...appSettings, maintenanceMode: checked })}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                  <button
                    onClick={handleAppSettingsUpdate}
                    disabled={loading}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '8px',
                      background: loading ? '#f3f4f6' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.transform = 'translateY(-1px)'
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <Save style={{ width: '16px', height: '16px' }} />
                    {loading ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" style={{ marginTop: '24px' }}>
          <Card style={{
            border: '1px solid #f1f5f9',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            background: 'white'
          }}>
            <CardHeader style={{ borderBottom: '1px solid #f1f5f9', padding: '24px' }}>
              <CardTitle style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
                Notification Preferences
              </CardTitle>
              <CardDescription style={{ color: '#6b7280', marginTop: '8px' }}>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gap: '16px' }}>
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                  { key: 'newLeads', label: 'New Leads', description: 'Get notified when new leads are submitted' },
                  { key: 'applicationUpdates', label: 'Application Updates', description: 'Updates about student applications' },
                  { key: 'systemAlerts', label: 'System Alerts', description: 'Important system and security alerts' },
                  { key: 'marketingEmails', label: 'Marketing Emails', description: 'Promotional content and newsletters' },
                  { key: 'weeklyReports', label: 'Weekly Reports', description: 'Weekly summary of activities' },
                  { key: 'monthlyDigest', label: 'Monthly Digest', description: 'Monthly performance digest' }
                ].map(item => (
                  <div key={item.key} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #f1f5f9',
                    background: notifications[item.key as keyof typeof notifications] ? '#f0f4ff' : 'white',
                    transition: 'all 0.2s ease'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Bell style={{ 
                        width: '20px', 
                        height: '20px', 
                        color: notifications[item.key as keyof typeof notifications] ? '#667eea' : '#6b7280' 
                      }} />
                      <div>
                        <Label htmlFor={item.key} style={{ 
                          fontSize: '15px', 
                          fontWeight: '500', 
                          color: '#111827',
                          cursor: 'pointer'
                        }}>
                          {item.label}
                        </Label>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      id={item.key}
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, [item.key]: checked })}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api" style={{ marginTop: '24px' }}>
          <Card style={{
            border: '1px solid #f1f5f9',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            background: 'white'
          }}>
            <CardHeader style={{ borderBottom: '1px solid #f1f5f9', padding: '24px' }}>
              <CardTitle style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
                API Configuration
              </CardTitle>
              <CardDescription style={{ color: '#6b7280', marginTop: '8px' }}>
                Manage your API keys and integrations
              </CardDescription>
            </CardHeader>
            <CardContent style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gap: '24px' }}>
                {/* AI Service */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                    AI Service
                  </h3>
                  <div>
                    <Label htmlFor="openaiKey" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>OpenAI API Key</Label>
                    <Input
                      id="openaiKey"
                      type="password"
                      value={apiSettings.openaiKey}
                      onChange={(e) => setApiSettings({ ...apiSettings, openaiKey: e.target.value })}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <Separator />

                {/* Database */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                    Database
                  </h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div>
                      <Label htmlFor="supabaseUrl" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Supabase URL</Label>
                      <Input
                        id="supabaseUrl"
                        value={apiSettings.supabaseUrl}
                        onChange={(e) => setApiSettings({ ...apiSettings, supabaseUrl: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="supabaseAnonKey" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Supabase Anon Key</Label>
                      <Input
                        id="supabaseAnonKey"
                        type="password"
                        value={apiSettings.supabaseAnonKey}
                        onChange={(e) => setApiSettings({ ...apiSettings, supabaseAnonKey: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Email Service */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                    Email Service
                  </h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div>
                      <Label htmlFor="emailProvider" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Provider</Label>
                      <Select value={apiSettings.emailProvider} onValueChange={(value) => setApiSettings({ ...apiSettings, emailProvider: value })}>
                        <SelectTrigger id="emailProvider" style={{ width: '100%' }}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="resend">Resend</SelectItem>
                          <SelectItem value="sendgrid">SendGrid</SelectItem>
                          <SelectItem value="mailgun">Mailgun</SelectItem>
                          <SelectItem value="ses">Amazon SES</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="emailApiKey" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>API Key</Label>
                      <Input
                        id="emailApiKey"
                        type="password"
                        placeholder="Enter your email service API key"
                        value={apiSettings.emailApiKey}
                        onChange={(e) => setApiSettings({ ...apiSettings, emailApiKey: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: '16px',
                  borderRadius: '8px',
                  background: '#fef3c7',
                  border: '1px solid #fde68a'
                }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <AlertCircle style={{ width: '20px', height: '20px', color: '#f59e0b', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: '14px', color: '#78350f' }}>
                        Keep your API keys secure. Never share them publicly or commit them to version control.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Database Tab */}
        <TabsContent value="database" style={{ marginTop: '24px' }}>
          <div style={{ display: 'grid', gap: '24px' }}>
            {/* Backup & Restore */}
            <Card style={{
              border: '1px solid #f1f5f9',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              background: 'white'
            }}>
              <CardHeader style={{ borderBottom: '1px solid #f1f5f9', padding: '24px' }}>
                <CardTitle style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
                  Backup & Restore
                </CardTitle>
                <CardDescription style={{ color: '#6b7280', marginTop: '8px' }}>
                  Manage your database backups and data exports
                </CardDescription>
              </CardHeader>
              <CardContent style={{ padding: '24px' }}>
                <div style={{ display: 'grid', gap: '24px' }}>
                  {/* Automatic Backups */}
                  <div style={{
                    padding: '20px',
                    borderRadius: '12px',
                    background: '#f8fafc',
                    border: '1px solid #f1f5f9'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                          Automatic Backups
                        </h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                          Your database is automatically backed up daily at 2:00 AM
                        </p>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6b7280', flexWrap: 'wrap' }}>
                          <span>Last backup: <strong style={{ color: '#111827' }}>{dbStats.lastBackup}</strong></span>
                          <span>Next backup: <strong style={{ color: '#111827' }}>{dbStats.nextBackup}</strong></span>
                        </div>
                      </div>
                      <div style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: dbStats.backupStatus === 'Completed' ? '#dcfce7' : '#fef3c7',
                        color: dbStats.backupStatus === 'Completed' ? '#166534' : '#92400e',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {dbStats.backupStatus}
                      </div>
                    </div>
                  </div>

                  {/* Manual Actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                    <button
                      onClick={handleBackup}
                      disabled={loading}
                      style={{
                        padding: '12px 20px',
                        borderRadius: '8px',
                        background: loading ? '#f3f4f6' : '#667eea',
                        color: 'white',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          e.currentTarget.style.transform = 'translateY(-1px)'
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <RefreshCw style={{ width: '16px', height: '16px' }} />
                      {loading ? 'Backing up...' : 'Backup Now'}
                    </button>
                    
                    <button
                      onClick={handleExportData}
                      style={{
                        padding: '12px 20px',
                        borderRadius: '8px',
                        background: 'white',
                        color: '#374151',
                        border: '1px solid #e5e7eb',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
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
                    >
                      <Download style={{ width: '16px', height: '16px' }} />
                      Export All Data
                    </button>
                  </div>

                  {/* Recent Backups */}
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                      Recent Backups
                    </h3>
                    <div style={{ display: 'grid', gap: '12px' }}>
                      {[
                        { date: '2025-01-05 02:00 AM', size: '2.4 GB', status: 'success' },
                        { date: '2025-01-04 02:00 AM', size: '2.3 GB', status: 'success' },
                        { date: '2025-01-03 02:00 AM', size: '2.3 GB', status: 'success' }
                      ].map((backup, index) => (
                        <div key={index} style={{
                          padding: '16px',
                          borderRadius: '8px',
                          border: '1px solid #f1f5f9',
                          background: 'white',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <CheckCircle2 style={{ width: '18px', height: '18px', color: '#16a34a' }} />
                            <div>
                              <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: 0 }}>
                                {backup.date}
                              </p>
                              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>
                                Size: {backup.size}
                              </p>
                            </div>
                          </div>
                          <button style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            background: 'none',
                            color: '#667eea',
                            border: '1px solid #667eea',
                            fontSize: '13px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f0f4ff'
                            e.currentTarget.style.transform = 'translateY(-1px)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.transform = 'translateY(0)'
                          }}>
                            Restore
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}