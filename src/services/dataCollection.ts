'use client'

// Types for different form submissions
export interface MobilePopupData {
  type: 'mobile_popup'
  mobile: string
  timestamp: string
  page: string
  sessionId: string
}

export interface HomepageFormData {
  type: 'homepage_form'
  name: string
  email: string
  phone: string
  message?: string
  timestamp: string
  page: string
  sessionId: string
}

export interface ContactFormData {
  type: 'contact_form'
  name: string
  email: string
  phone?: string
  country?: string
  interestedCountry?: string
  studyLevel?: string
  subject?: string
  message: string
  preferredTime?: string
  timestamp: string
  page: string
  sessionId: string
}

export interface GDPIPackageData {
  type: 'gdpi_package'
  name: string
  phone: string
  package: string
  timestamp: string
  page: string
  sessionId: string
}

export type FormSubmission = MobilePopupData | HomepageFormData | ContactFormData | GDPIPackageData

// Generate unique session ID
function generateSessionId(): string {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

// Get or create session ID
function getSessionId(): string {
  if (typeof window !== 'undefined') {
    let sessionId = sessionStorage.getItem('admitverse_session_id')
    if (!sessionId) {
      sessionId = generateSessionId()
      sessionStorage.setItem('admitverse_session_id', sessionId)
    }
    return sessionId
  }
  return generateSessionId()
}

// Central data collection service
class DataCollectionService {
  private apiEndpoint = '/api/collect-data' // You'll need to create this API endpoint
  private fallbackEndpoint = 'https://formspree.io/f/mdkwdnnb' // Formspree endpoint for all forms
  
  // Store data locally as backup
  private storeLocally(data: FormSubmission) {
    try {
      const stored = localStorage.getItem('admitverse_submissions') || '[]'
      const submissions = JSON.parse(stored)
      submissions.push(data)
      localStorage.setItem('admitverse_submissions', JSON.stringify(submissions))
    } catch (error) {
      console.error('Failed to store data locally:', error)
    }
  }

  // Send to analytics (Google Analytics, Facebook Pixel, etc.)
  private sendToAnalytics(data: FormSubmission) {
    try {
      // Google Analytics 4 Event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submission', {
          form_type: data.type,
          page_location: data.page,
          session_id: data.sessionId
        })
      }

      // Facebook Pixel Event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_category: data.type,
          content_name: data.page
        })
      }

      console.log('Analytics event sent:', data.type)
    } catch (error) {
      console.error('Failed to send analytics:', error)
    }
  }

  // Main submission handler
  async submitData(data: Omit<FormSubmission, 'timestamp' | 'page' | 'sessionId'>): Promise<boolean> {
    const submissionData = {
      ...data,
      timestamp: new Date().toISOString(),
      page: typeof window !== 'undefined' ? window.location.pathname : '/',
      sessionId: getSessionId()
    } as FormSubmission

    // Store locally first (immediate backup)
    this.storeLocally(submissionData)
    
    // Send to analytics
    this.sendToAnalytics(submissionData)

    // Track success of both endpoints
    let primarySuccess = false
    let formspreeSuccess = false

    // Try primary API endpoint
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      })

      if (response.ok) {
        console.log('Data submitted successfully to primary endpoint')
        primarySuccess = true
      }
    } catch (error) {
      console.error('Primary submission failed:', error)
    }

    // Always try Formspree as well (not just fallback)
    try {
      console.log('Attempting Formspree submission to:', this.fallbackEndpoint)
      
      // Convert to FormData for Formspree
      const formData = new FormData()
      
      // For mobile popup, create name and email placeholders
      if (submissionData.type === 'mobile_popup') {
        const mobileData = submissionData as MobilePopupData
        console.log('Mobile popup data:', mobileData)
        console.log('Mobile number being sent:', mobileData.mobile)
        
        // Ensure mobile number exists
        const phoneNumber = mobileData.mobile || ''
        if (!phoneNumber) {
          console.error('WARNING: No mobile number found in mobile popup data!')
        }
        
        formData.append('name', 'Mobile Popup User')
        formData.append('email', phoneNumber ? `mobile_${phoneNumber}@placeholder.com` : 'mobile_unknown@placeholder.com')
        formData.append('phone', phoneNumber)
        formData.append('message', `Mobile number submitted via popup: ${phoneNumber}`)
        
        // Log what we're sending
        console.log('FormData entries:')
        for (let [key, value] of formData.entries()) {
          console.log(`  ${key}: ${value}`)
        }
      } else if (submissionData.type === 'gdpi_package') {
        const gdpiData = submissionData as GDPIPackageData
        console.log('GDPI package data:', gdpiData)
        
        formData.append('name', gdpiData.name || '')
        formData.append('email', gdpiData.phone ? `gdpi_${gdpiData.phone}@placeholder.com` : 'gdpi_unknown@placeholder.com')
        formData.append('phone', gdpiData.phone || '')
        formData.append('message', `GDPI Package Interest: ${gdpiData.package} - Student: ${gdpiData.name} | Phone: ${gdpiData.phone}`)
        formData.append('package', gdpiData.package || '')
        
        console.log('GDPI FormData entries:')
        for (let [key, value] of formData.entries()) {
          console.log(`  ${key}: ${value}`)
        }
      } else {
        formData.append('name', (submissionData as any).name || '')
        formData.append('email', (submissionData as any).email || '')
        
        // Handle phone number field - mobile popup uses 'mobile', others use 'phone'
        const phoneNumber = (submissionData as any).phone || (submissionData as any).mobile || ''
        formData.append('phone', phoneNumber)
        
        formData.append('message', (submissionData as any).message || '')
      }
      
      formData.append('type', submissionData.type)
      formData.append('timestamp', submissionData.timestamp)
      formData.append('page', submissionData.page)
      
      // Add contact form specific fields
      if (submissionData.type === 'contact_form') {
        const contactData = submissionData as any
        formData.append('country', contactData.country || '')
        formData.append('interestedCountry', contactData.interestedCountry || '')
        formData.append('studyLevel', contactData.studyLevel || '')
        formData.append('subject', contactData.subject || '')
        formData.append('preferredTime', contactData.preferredTime || '')
      }
      
      const formspreeResponse = await fetch(this.fallbackEndpoint, {
        method: 'POST',
        body: formData
      })

      console.log('Formspree response status:', formspreeResponse.status)
      
      if (formspreeResponse.ok) {
        console.log('✅ Data submitted successfully to Formspree')
        formspreeSuccess = true
      } else {
        const errorText = await formspreeResponse.text()
        console.error('❌ Formspree submission failed with status:', formspreeResponse.status, errorText)
      }
    } catch (formspreeError) {
      console.error('❌ Formspree submission error:', formspreeError)
    }

    // Return true if at least one endpoint succeeded
    if (primarySuccess || formspreeSuccess) {
      return true
    }

    // If both fail, data is still stored locally
    console.log('Submission failed but data stored locally')
    return false
  }

  // Get all stored submissions (for admin/debugging)
  getStoredSubmissions(): FormSubmission[] {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('admitverse_submissions') || '[]'
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to retrieve stored submissions:', error)
    }
    return []
  }

  // Clear stored submissions (after successful sync)
  clearStoredSubmissions() {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admitverse_submissions')
      }
    } catch (error) {
      console.error('Failed to clear stored submissions:', error)
    }
  }
}

// Export singleton instance
export const dataCollectionService = new DataCollectionService()

// Convenience functions for each form type
export const submitMobilePopup = (mobile: string) => {
  return dataCollectionService.submitData({
    type: 'mobile_popup',
    mobile
  } as Omit<MobilePopupData, 'timestamp' | 'page' | 'sessionId'>)
}

export const submitHomepageForm = (name: string, email: string, phone: string, message?: string) => {
  return dataCollectionService.submitData({
    type: 'homepage_form',
    name,
    email,
    phone,
    message
  } as Omit<HomepageFormData, 'timestamp' | 'page' | 'sessionId'>)
}

export const submitContactForm = (formData: Omit<ContactFormData, 'type' | 'timestamp' | 'page' | 'sessionId'>) => {
  return dataCollectionService.submitData({
    type: 'contact_form',
    ...formData
  })
}

export const submitGDPIPackage = (name: string, phone: string, packageName: string) => {
  return dataCollectionService.submitData({
    type: 'gdpi_package',
    name,
    phone,
    package: packageName
  } as Omit<GDPIPackageData, 'timestamp' | 'page' | 'sessionId'>)
}