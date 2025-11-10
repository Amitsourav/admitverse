import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getAllUniversities } from '@/lib/university-data'

// Secure OpenAI client initialization
const initializeOpenAI = () => {
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey) {
    console.warn('OPENAI_API_KEY environment variable not found')
    return null
  }
  
  if (apiKey.length < 20 || !apiKey.startsWith('sk-')) {
    console.warn('Invalid OpenAI API key format')
    return null
  }
  
  try {
    return new OpenAI({
      apiKey: apiKey,
      organization: process.env.OPENAI_ORGANIZATION || undefined,
    })
  } catch (error) {
    console.error('Failed to initialize OpenAI client:', error)
    return null
  }
}

const openai = initializeOpenAI()

// System prompt for AI matching
const SYSTEM_PROMPT = `You are an expert education counselor specializing in university admissions. 
Your role is to analyze student profiles and recommend the best matching universities.

Given a student profile, you should:
1. Evaluate their academic qualifications and test scores
2. Consider their budget and preferred locations
3. Match their field of study with university strengths
4. Assess admission chances based on their profile
5. Provide personalized recommendations

Return a JSON response with:
{
  "matches": [
    {
      "universityName": "string",
      "matchScore": number (0-100),
      "admissionChance": "High" | "Good" | "Moderate" | "Competitive",
      "reasons": ["reason1", "reason2", "reason3"],
      "keyStrengths": ["strength1", "strength2"],
      "recommendations": "personalized advice",
      "estimatedCost": "cost range",
      "scholarshipOpportunities": ["scholarship1", "scholarship2"]
    }
  ],
  "overallAnalysis": "comprehensive analysis of the student profile",
  "topRecommendations": ["key advice points"],
  "alternativeOptions": ["backup university suggestions"],
  "nextSteps": ["actionable steps for the student"]
}`

interface StudentProfile {
  academicScore: number
  preferredCountries: string[]
  fieldOfStudy: string
  degreeLevel: string
  budget: string
  englishTest: string
  englishScore: number
  workExperience: number
  priorities: string[]
}

interface UniversityMatch {
  universityName: string
  matchScore: number
  admissionChance: 'High' | 'Good' | 'Moderate' | 'Competitive'
  reasons: string[]
  keyStrengths: string[]
  recommendations: string
  estimatedCost: string
  scholarshipOpportunities: string[]
}

interface AIMatchResponse {
  matches: UniversityMatch[]
  overallAnalysis: string
  topRecommendations: string[]
  alternativeOptions: string[]
  nextSteps: string[]
}

export async function POST(request: NextRequest) {
  try {
    const profile: StudentProfile = await request.json()

    // Check if OpenAI is configured
    if (!openai) {
      console.warn('OpenAI not configured, using fallback matching')
      return fallbackMatching(profile)
    }

    // Get all universities from database
    const allUniversities = getAllUniversities()
    
    // Filter universities based on basic criteria
    const filteredUniversities = allUniversities.filter(uni => {
      // Filter by country if specified
      if (profile.preferredCountries.length > 0) {
        if (!profile.preferredCountries.includes(uni.country)) {
          return false
        }
      }
      
      // Filter by budget (rough estimation)
      if (profile.budget && profile.budget !== 'No specific budget') {
        const budgetMap: { [key: string]: number } = {
          'Under $20,000': 20000,
          '$20,000 - $40,000': 40000,
          '$40,000 - $60,000': 60000,
          '$60,000 - $80,000': 80000,
          '$80,000+': 100000
        }
        
        const maxBudget = budgetMap[profile.budget] || 100000
        const tuitionString = uni.tuition || ''
        const tuitionMatch = tuitionString.match(/\$?([\d,]+)/)
        if (tuitionMatch) {
          const tuition = parseInt(tuitionMatch[1].replace(/,/g, ''))
          if (tuition > maxBudget) {
            return false
          }
        }
      }
      
      return true
    })

    // Prepare context for OpenAI
    const universitiesContext = filteredUniversities.slice(0, 20).map(uni => ({
      name: uni.name,
      location: `${uni.location}, ${uni.country}`,
      ranking: uni.ranking,
      programs: Array.isArray(uni.programs) ? uni.programs : [],
      tuition: uni.tuition,
      acceptance: uni.acceptance,
      highlights: uni.highlights || []
    }))

    // Call OpenAI for intelligent matching
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `
            Student Profile:
            - Academic Score: ${profile.academicScore}%
            - Degree Level: ${profile.degreeLevel}
            - Field of Study: ${profile.fieldOfStudy}
            - Preferred Countries: ${profile.preferredCountries.join(', ') || 'Any'}
            - Budget: ${profile.budget}
            - English Test: ${profile.englishTest} (Score: ${profile.englishScore})
            - Work Experience: ${profile.workExperience} years
            - Priorities: ${profile.priorities.join(', ')}
            
            Available Universities:
            ${JSON.stringify(universitiesContext, null, 2)}
            
            Please analyze this profile and recommend the best matching universities with detailed reasoning.
          `
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    })

    const aiResponse = JSON.parse(completion.choices[0]?.message?.content || '{}') as AIMatchResponse

    // Enhance the response with actual university data
    const enhancedMatches = aiResponse.matches.map(match => {
      const university = allUniversities.find(uni => 
        uni.name.toLowerCase().includes(match.universityName.toLowerCase()) ||
        match.universityName.toLowerCase().includes(uni.name.toLowerCase())
      )
      
      if (university) {
        return {
          ...match,
          id: university.id.toString(),
          name: university.name,
          location: university.location,
          country: university.country,
          ranking: university.ranking,
          image: university.image,
          programs: Array.isArray(university.programs) ? university.programs : [],
          tuitionFee: university.tuition || match.estimatedCost,
          highlights: match.keyStrengths
        }
      }
      
      return {
        ...match,
        id: Math.random().toString(),
        name: match.universityName,
        location: 'Various Locations',
        country: profile.preferredCountries[0] || 'International',
        ranking: 0,
        image: '/default-university.jpg',
        programs: [profile.fieldOfStudy],
        tuitionFee: match.estimatedCost,
        highlights: match.keyStrengths
      }
    })

    return NextResponse.json({
      success: true,
      matches: enhancedMatches,
      analysis: {
        overall: aiResponse.overallAnalysis,
        recommendations: aiResponse.topRecommendations,
        alternatives: aiResponse.alternativeOptions,
        nextSteps: aiResponse.nextSteps
      },
      profile: profile,
      aiPowered: true
    })

  } catch (error) {
    console.error('AI Matching Error:', error)
    
    // Fallback to basic matching if AI fails
    const profile = await request.json().catch(() => ({}))
    return fallbackMatching(profile as StudentProfile)
  }
}

// Fallback matching algorithm
function fallbackMatching(profile: StudentProfile) {
  const allUniversities = getAllUniversities()
  
  // Simple scoring based on profile
  const scoredUniversities = allUniversities.map(uni => {
    let score = 50 // Base score
    
    // Country preference matching
    if (profile.preferredCountries.length > 0) {
      if (profile.preferredCountries.includes(uni.country)) {
        score += 20
      } else {
        score -= 30
      }
    }
    
    // Academic score consideration
    if (profile.academicScore >= 80) {
      if (uni.ranking <= 50) score += 15
    } else if (profile.academicScore >= 60) {
      if (uni.ranking > 50 && uni.ranking <= 200) score += 10
    }
    
    // Budget matching
    if (profile.budget && profile.budget !== 'No specific budget') {
      const budgetMap: { [key: string]: number } = {
        'Under $20,000': 20000,
        '$20,000 - $40,000': 40000,
        '$40,000 - $60,000': 60000,
        '$60,000 - $80,000': 80000,
        '$80,000+': 100000
      }
      
      const maxBudget = budgetMap[profile.budget] || 100000
      const tuitionString = uni.tuition || ''
      const tuitionMatch = tuitionString.match(/\$?([\d,]+)/)
      
      if (tuitionMatch) {
        const tuition = parseInt(tuitionMatch[1].replace(/,/g, ''))
        if (tuition <= maxBudget) {
          score += 10
        } else {
          score -= 20
        }
      }
    }
    
    // Field of study matching (basic)
    if (profile.fieldOfStudy && Array.isArray(uni.programs)) {
      const hasRelevantProgram = uni.programs.some(program => 
        program.toLowerCase().includes(profile.fieldOfStudy.toLowerCase()) ||
        profile.fieldOfStudy.toLowerCase().includes(program.toLowerCase())
      )
      if (hasRelevantProgram) score += 15
    }
    
    return {
      ...uni,
      matchScore: Math.min(Math.max(score, 0), 100)
    }
  })
  
  // Sort by match score and take top matches
  const topMatches = scoredUniversities
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10)
    .map(uni => ({
      id: uni.id.toString(),
      name: uni.name,
      location: uni.location,
      country: uni.country,
      ranking: uni.ranking,
      matchScore: uni.matchScore,
      tuitionFee: uni.tuition || 'Contact for details',
      programs: Array.isArray(uni.programs) ? uni.programs : [],
      highlights: uni.highlights || [],
      admissionChance: uni.matchScore >= 80 ? 'Good' : 
                       uni.matchScore >= 60 ? 'Moderate' : 'Competitive',
      image: uni.image,
      reasons: [
        'Matches your academic profile',
        'Within your preferred location',
        'Offers programs in your field of interest'
      ],
      recommendations: 'Consider applying with a strong application package'
    }))
  
  return NextResponse.json({
    success: true,
    matches: topMatches,
    analysis: {
      overall: 'Based on your profile, we found universities that match your preferences.',
      recommendations: [
        'Focus on universities with match scores above 70%',
        'Prepare strong application materials',
        'Consider applying to 5-7 universities'
      ],
      alternatives: ['Consider expanding your country preferences', 'Look into scholarship opportunities'],
      nextSteps: ['Research specific programs', 'Prepare for English tests', 'Start application process']
    },
    profile: profile,
    aiPowered: false,
    fallbackMode: true
  })
}