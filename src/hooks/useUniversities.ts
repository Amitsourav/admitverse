import { useState, useEffect } from 'react'
import { University } from '@/lib/university-data'

interface UseUniversitiesOptions {
  search?: string
  country?: string
  ranking?: string
  autoFetch?: boolean
}

interface UseUniversitiesReturn {
  universities: University[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useUniversities = (options: UseUniversitiesOptions = {}): UseUniversitiesReturn => {
  const { search = '', country = 'all', ranking = 'all', autoFetch = true } = options
  
  const [universities, setUniversities] = useState<University[]>([])
  const [loading, setLoading] = useState(autoFetch)
  const [error, setError] = useState<string | null>(null)

  const fetchUniversities = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (country !== 'all') params.append('country', country)
      if (ranking !== 'all') params.append('ranking', ranking)

      const response = await fetch(`/api/universities?${params.toString()}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch universities')
      }

      setUniversities(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      setUniversities([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (autoFetch) {
      fetchUniversities()
    }
  }, [search, country, ranking, autoFetch])

  return {
    universities,
    loading,
    error,
    refetch: fetchUniversities
  }
}

interface UseUniversityReturn {
  university: University | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useUniversity = (slug: string): UseUniversityReturn => {
  const [university, setUniversity] = useState<University | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUniversity = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/universities/${slug}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch university')
      }

      setUniversity(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      setUniversity(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) {
      fetchUniversity()
    }
  }, [slug])

  return {
    university,
    loading,
    error,
    refetch: fetchUniversity
  }
}