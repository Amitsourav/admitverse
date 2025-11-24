import { NextRequest, NextResponse } from 'next/server'
import { openaiService, AI_PROMPTS } from '@/lib/openai-config'

interface SOPReviewRequest {
  content: string
  targetProgram?: string
  targetUniversity?: string
  applicantBackground?: string
  wordLimit?: number
}

interface SOPFeedback {
  overallScore: number // 0-100
  strengths: string[]
  improvements: string[]
  structureAnalysis: {
    introduction: { score: number; feedback: string }
    academicBackground: { score: number; feedback: string }
    careerGoals: { score: number; feedback: string }
    whyProgram: { score: number; feedback: string }
    conclusion: { score: number; feedback: string }
  }
  technicalAnalysis: {
    wordCount: number
    readabilityScore: number
    sentenceVariety: string
    vocabularyLevel: string
  }
  recommendations: string[]
  revisedVersion?: string
}

const SOP_REVIEW_PROMPT = `${AI_PROMPTS.ESSAY_REVIEW}

Analyze the Statement of Purpose and provide detailed feedback in the following JSON format:

{
  "overallScore": number (0-100),
  "strengths": ["strength1", "strength2", "strength3"],
  "improvements": ["improvement1", "improvement2", "improvement3"],
  "structureAnalysis": {
    "introduction": { "score": number (0-10), "feedback": "specific feedback" },
    "academicBackground": { "score": number (0-10), "feedback": "specific feedback" },
    "careerGoals": { "score": number (0-10), "feedback": "specific feedback" },
    "whyProgram": { "score": number (0-10), "feedback": "specific feedback" },
    "conclusion": { "score": number (0-10), "feedback": "specific feedback" }
  },
  "technicalAnalysis": {
    "wordCount": number,
    "readabilityScore": number (0-10),
    "sentenceVariety": "Poor/Fair/Good/Excellent",
    "vocabularyLevel": "Basic/Intermediate/Advanced/Sophisticated"
  },
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
  "revisedVersion": "improved version of the first paragraph as an example"
}

Focus on:
1. Clarity and coherence of arguments
2. Specific examples and evidence
3. Connection between past experiences and future goals
4. Demonstration of fit with the program
5. Personal voice and authenticity
6. Grammar, style, and flow`

export async function POST(request: NextRequest) {
  try {
    const body: SOPReviewRequest = await request.json()
    const { content, targetProgram, targetUniversity, applicantBackground, wordLimit } = body

    if (!content || content.trim().length < 100) {
      return NextResponse.json(
        { error: 'SOP content must be at least 100 characters long' },
        { status: 400 }
      )
    }

    // Check if OpenAI is available
    if (!openaiService.isReady()) {
      return fallbackSOPReview(content)
    }

    // Prepare context
    const context = []
    if (targetProgram) context.push(`Target Program: ${targetProgram}`)
    if (targetUniversity) context.push(`Target University: ${targetUniversity}`)
    if (applicantBackground) context.push(`Applicant Background: ${applicantBackground}`)
    if (wordLimit) context.push(`Word Limit: ${wordLimit} words`)

    const userPrompt = `
Statement of Purpose to Review:
"""
${content}
"""

Context:
${context.join('\n')}

Please provide comprehensive feedback following the specified JSON format.`

    // Call OpenAI
    const completion = await openaiService.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SOP_REVIEW_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
      stream: false
    })

    // Type assertion to ensure we have the non-streaming response
    const chatCompletion = completion as any
    const feedback = JSON.parse(chatCompletion.choices?.[0]?.message?.content || '{}') as SOPFeedback

    // Add actual word count
    const actualWordCount = content.trim().split(/\s+/).length
    feedback.technicalAnalysis.wordCount = actualWordCount

    return NextResponse.json({
      success: true,
      feedback,
      context: {
        targetProgram,
        targetUniversity,
        wordLimit,
        actualWordCount
      },
      aiPowered: true
    })

  } catch (error) {
    console.error('SOP Review Error:', error)
    
    // Fallback to basic analysis
    const body = await request.json().catch(() => ({ content: '' }))
    return fallbackSOPReview(body.content || '')
  }
}

function fallbackSOPReview(content: string) {
  const wordCount = content.trim().split(/\s+/).length
  
  // Basic analysis without AI
  const basicFeedback: SOPFeedback = {
    overallScore: 65,
    strengths: [
      'Content provided for review',
      'Appropriate length for analysis',
      'Ready for detailed feedback'
    ],
    improvements: [
      'AI-powered analysis not available - using basic review',
      'Consider professional SOP review services',
      'Focus on clear structure and specific examples'
    ],
    structureAnalysis: {
      introduction: { score: 6, feedback: 'Basic analysis - AI review recommended for detailed feedback' },
      academicBackground: { score: 6, feedback: 'Basic analysis - AI review recommended for detailed feedback' },
      careerGoals: { score: 6, feedback: 'Basic analysis - AI review recommended for detailed feedback' },
      whyProgram: { score: 6, feedback: 'Basic analysis - AI review recommended for detailed feedback' },
      conclusion: { score: 6, feedback: 'Basic analysis - AI review recommended for detailed feedback' }
    },
    technicalAnalysis: {
      wordCount,
      readabilityScore: 6,
      sentenceVariety: 'Fair',
      vocabularyLevel: 'Intermediate'
    },
    recommendations: [
      'Enable AI features for comprehensive analysis',
      'Ensure clear introduction with your motivation',
      'Include specific examples from your experience',
      'Clearly connect your goals to the program',
      'Proofread for grammar and clarity'
    ]
  }

  return NextResponse.json({
    success: true,
    feedback: basicFeedback,
    context: {
      actualWordCount: wordCount
    },
    aiPowered: false,
    fallbackMode: true,
    message: 'AI features not configured. Enable OpenAI for detailed analysis.'
  })
}