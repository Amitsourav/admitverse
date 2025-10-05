'use client'

import { useState, useEffect, useCallback } from 'react'

export function useMobilePopup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [mobileSubmitted, setMobileSubmitted] = useState(false)
  const [lastClosed, setLastClosed] = useState<number | null>(null)

  // Check if mobile number was already submitted
  useEffect(() => {
    const submitted = localStorage.getItem('mobile_submitted')
    if (submitted === 'true') {
      setMobileSubmitted(true)
    }
    
    const lastClosedTime = localStorage.getItem('popup_last_closed')
    if (lastClosedTime) {
      setLastClosed(parseInt(lastClosedTime))
    }
  }, [])

  // Setup interval for popup
  useEffect(() => {
    if (mobileSubmitted) return

    // Show popup after 30 seconds initially
    const initialTimer = setTimeout(() => {
      setIsPopupOpen(true)
    }, 30000)

    // Setup recurring popup timer
    let nextTimer: NodeJS.Timeout

    const scheduleNextPopup = () => {
      if (mobileSubmitted) return
      
      // Check if popup was recently closed (within 2 minutes)
      const now = Date.now()
      if (lastClosed && (now - lastClosed) < 120000) {
        // Wait longer if recently closed
        const extraDelay = 120000 - (now - lastClosed)
        setTimeout(scheduleNextPopup, extraDelay)
        return
      }
      
      // Fixed 10 second interval for subsequent popups
      const delay = 10000
      
      nextTimer = setTimeout(() => {
        if (!mobileSubmitted) {
          setIsPopupOpen(true)
          scheduleNextPopup() // Schedule the next one
        }
      }, delay)
    }

    // Start the recurring popup cycle after initial popup (30s + 10s = 40s total)
    const startRecurringTimer = setTimeout(() => {
      scheduleNextPopup()
    }, 30000 + 10000) // After initial popup + 10 seconds

    return () => {
      clearTimeout(initialTimer)
      clearTimeout(nextTimer)
      clearTimeout(startRecurringTimer)
    }
  }, [mobileSubmitted, lastClosed])

  const closePopup = useCallback(() => {
    setIsPopupOpen(false)
    const now = Date.now()
    setLastClosed(now)
    localStorage.setItem('popup_last_closed', now.toString())
  }, [])

  const submitMobile = useCallback(async (mobile: string) => {
    // Store in localStorage
    localStorage.setItem('user_mobile', mobile)
    localStorage.setItem('mobile_submitted', 'true')
    localStorage.setItem('mobile_submitted_at', new Date().toISOString())
    
    setMobileSubmitted(true)
    setIsPopupOpen(false)
    
    try {
      // Use data collection service
      const { submitMobilePopup } = await import('@/services/dataCollection')
      const success = await submitMobilePopup(mobile)
      
      if (!success) {
        console.log('Mobile data stored locally as backup')
      }
    } catch (error) {
      console.error('Mobile popup submission error:', error)
    }
  }, [])

  return {
    isPopupOpen,
    mobileSubmitted,
    closePopup,
    submitMobile
  }
}