# OpenAI API Setup Guide

## Overview
The AdmitVerse application uses OpenAI's GPT-3.5-turbo model to provide intelligent search capabilities. This guide will help you set up the OpenAI API connection.

## Features Using OpenAI
- **AI-Powered Search**: Natural language understanding of search queries
- **Smart Recommendations**: Contextual suggestions based on user intent
- **Multi-database Search**: Searches across universities, courses, and countries
- **Fallback Mode**: Gracefully falls back to keyword search if API is unavailable

## Setup Instructions

### Step 1: Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/signup)
2. Sign up or log in to your account
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy the generated key (you won't be able to see it again!)

### Step 2: Configure Environment Variables

#### For Local Development:
Edit the `.env` file in the root directory:

```bash
# OpenAI API Configuration
OPENAI_API_KEY="sk-..." # Replace with your actual API key
```

#### For Production (Vercel):
1. Go to your Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the following:
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
   - Environment: Production (and Preview/Development if needed)

### Step 3: Verify Configuration

Test your API connection by running the development server:

```bash
npm run dev
```

Then test the AI search at http://localhost:3000 by:
1. Using the search bar on the homepage
2. Trying queries like:
   - "best universities for computer science"
   - "MBA programs in USA"
   - "study in Canada requirements"

## API Usage and Costs

### Current Configuration
- **Model**: GPT-3.5-turbo
- **Max Tokens**: 500 per request
- **Temperature**: 0.3 (for consistent results)

### Estimated Costs
- **GPT-3.5-turbo pricing**: ~$0.002 per 1K tokens
- **Average request**: ~800 tokens (input + output)
- **Cost per search**: ~$0.0016
- **Monthly estimate** (1000 searches): ~$1.60

### Cost Optimization Tips
1. **Use Fallback Mode**: The app automatically falls back to keyword search when API is unavailable
2. **Cache Results**: Consider implementing Redis or in-memory caching
3. **Rate Limiting**: Add rate limiting to prevent abuse
4. **Monitor Usage**: Check your OpenAI dashboard regularly

## Fallback Behavior

When OpenAI API is not configured or fails, the application:
1. **Automatically switches to keyword-based search**
2. **Searches across all databases locally**
3. **Returns results without AI interpretation**
4. **Logs the fallback mode in the response**

## Troubleshooting

### Common Issues and Solutions

#### 1. "OpenAI API key not configured properly"
**Solution**: 
- Verify your API key is set in `.env`
- Ensure the key starts with `sk-`
- Check you haven't hit your usage limits

#### 2. "401 Unauthorized" Error
**Solution**:
- Your API key is invalid or expired
- Generate a new key from OpenAI dashboard
- Update the environment variable

#### 3. "429 Rate Limit" Error
**Solution**:
- You've exceeded OpenAI's rate limits
- Wait a few minutes and try again
- Consider upgrading your OpenAI plan

#### 4. "503 Service Unavailable"
**Solution**:
- OpenAI service is temporarily down
- The app will use fallback search automatically
- Try again later

### Debug Mode

To enable detailed logging, you can modify the API route:

```typescript
// In src/app/api/ai-search/route.ts
const DEBUG = process.env.NODE_ENV === 'development'

if (DEBUG) {
  console.log('OpenAI Request:', { query, context })
  console.log('OpenAI Response:', aiResponse)
}
```

## Security Best Practices

1. **Never commit API keys**: Always use environment variables
2. **Use different keys**: Separate keys for development and production
3. **Set usage limits**: Configure spending limits in OpenAI dashboard
4. **Monitor usage**: Regularly check your API usage and costs
5. **Implement rate limiting**: Prevent abuse of your API endpoint

## Advanced Configuration

### Switching Models

To use GPT-4 (more expensive but more capable):

```typescript
// In src/app/api/ai-search/route.ts
const completion = await openai.chat.completions.create({
  model: 'gpt-4', // or 'gpt-4-turbo-preview'
  // ... rest of configuration
})
```

### Adjusting Response Quality

Modify temperature for different behaviors:
- **0.0-0.3**: More focused, deterministic (current: 0.3)
- **0.4-0.7**: Balanced creativity
- **0.8-1.0**: More creative, varied responses

### Custom System Prompts

You can modify the system prompt in `src/app/api/ai-search/route.ts` to change how the AI interprets searches.

## API Endpoint Documentation

### POST /api/ai-search

**Request Body:**
```json
{
  "query": "string", // Required: search query
  "context": "string" // Optional: additional context
}
```

**Success Response (with OpenAI):**
```json
{
  "success": true,
  "query": "original query",
  "interpretation": {
    "searchType": "university|course|country|mixed",
    "searchTerms": {...},
    "filters": {...},
    "intent": "description",
    "suggestions": [...]
  },
  "results": {
    "universities": [...],
    "courses": [...],
    "countries": [...]
  },
  "naturalResponse": "formatted response",
  "totalResults": 25
}
```

**Fallback Response (without OpenAI):**
```json
{
  "success": true,
  "query": "original query",
  "results": {...},
  "naturalResponse": "basic response",
  "fallbackMode": true
}
```

## Support

For issues or questions:
1. Check the error logs in your terminal or Vercel dashboard
2. Verify your OpenAI API key and billing status
3. Test with the fallback mode to isolate issues
4. Contact OpenAI support for API-specific problems

## Next Steps

After setting up OpenAI:
1. Test various search queries
2. Monitor API usage and costs
3. Consider implementing caching
4. Add rate limiting for production
5. Set up error tracking (e.g., Sentry)