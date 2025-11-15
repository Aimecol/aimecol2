'use client'

import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Bookmark, 
  Heart, 
  MessageCircle,
  Brain,
  Zap,
  Code,
  Database,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface BlogPost {
  title: string
  date: string
  readTime: string
  category: string
  author: {
    name: string
    title: string
    image: string
  }
  views: number
  likes: number
  tags: string[]
  excerpt: string
}

const blogPost: BlogPost = {
  title: 'Integrating AI into Web Applications',
  date: '2024-08-25',
  readTime: '9 min read',
  category: 'Innovation',
  author: {
    name: 'Aime Claudien',
    title: 'Full-Stack Developer',
    image: '/avatars/aime.jpg'
  },
  views: 1123,
  likes: 95,
  tags: ['AI', 'Machine Learning', 'Web Development', 'APIs'],
  excerpt: 'Practical approaches to adding AI capabilities to web apps, from simple APIs to complex machine learning models.'
}

interface Section {
  id: string
  title: string
  icon: any
  content: string
}

const sections: Section[] = [
  {
    id: 'introduction',
    title: 'AI is No Longer Optional',
    icon: Brain,
    content: `
A year ago, AI integration felt like a distant, complex frontier reserved for data scientists and specialized ML engineers. Today, it's becoming table stakes—a expected feature rather than a differentiator.

But integrating AI doesn't mean building ML models from scratch or hiring a PhD. Modern web developers can leverage pre-built AI services, APIs, and lightweight models to add powerful capabilities to applications with relatively little effort.

In this post, I'll walk through practical approaches to AI integration ranging from using cloud APIs (simplest) to deploying edge ML models (most flexible). I'll cover real examples, common pitfalls, and when to use each approach.

The landscape has changed dramatically. Let me show you what's now possible for web developers.
    `
  },
  {
    id: 'approaches',
    title: 'Three Approaches to AI Integration',
    icon: Lightbulb,
    content: `
There are three main ways to add AI to web applications, each with different tradeoffs:

**1. Cloud AI APIs (Easiest)**

Use pre-built AI services from major cloud providers. You send data to their servers, get results back.

Examples:
- OpenAI GPT API for text generation
- Google Cloud Vision for image recognition
- AWS Rekognition for video/image analysis
- Anthropic Claude API for reasoning tasks

Pros: Easy to implement, powerful models, regularly updated
Cons: Requires API calls (latency), ongoing costs, data privacy concerns

**2. Edge ML Models (Most Flexible)**

Run ML models directly in the browser or on your server using frameworks like TensorFlow.js or ONNX.

Examples:
- Image classification without sending to server
- Text analysis in the browser
- Real-time speech recognition
- On-device language understanding

Pros: No API calls (fast), offline capability, data privacy, no ongoing costs
Cons: Slower initial load, limited model complexity, browser compatibility

**3. Hybrid Approach (Balanced)**

Use cloud APIs for complex tasks, edge models for simple ones. Combine both for optimal performance.

Examples:
- Quick intent classification on-device, complex reasoning in cloud
- Thumbnail generation on-device, detailed analysis on server
- Hybrid recommendation systems

Pros: Best performance/cost/latency tradeoff
Cons: More complex architecture

Let me dive deep into each.
    `
  },
  {
    id: 'cloud-apis',
    title: 'Cloud AI APIs - Quick Start',
    icon: Zap,
    content: `
**Using OpenAI GPT API**

The simplest starting point for AI integration. Here's a minimal example:

\`\`\`typescript
// app/api/generate-text/route.ts
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  const { prompt } = await request.json()

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { 
          role: 'system', 
          content: 'You are a helpful assistant.' 
        },
        { 
          role: 'user', 
          content: prompt 
        }
      ],
      max_tokens: 1000,
      temperature: 0.7, // Controls randomness (0-1)
    })

    return Response.json({
      text: completion.choices[0].message.content
    })
  } catch (error) {
    return Response.json(
      { error: 'Failed to generate text' },
      { status: 500 }
    )
  }
}
\`\`\`

**Using It in a React Component**

\`\`\`typescript
'use client'

import { useState } from 'react'

export function AITextGenerator() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        body: JSON.stringify({ prompt })
      })
      const data = await response.json()
      setResult(data.text)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
        className="w-full p-3 border rounded"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {result && <div className="p-4 bg-surface rounded">{result}</div>}
    </div>
  )
}
\`\`\`

**Streaming Responses for Better UX**

For long responses, stream them back to show results progressively:

\`\`\`typescript
// app/api/generate-text-stream/route.ts
export async function POST(request: Request) {
  const { prompt } = await request.json()

  const stream = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  })

  // Return streaming response
  const encoder = new TextEncoder()
  
  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || ''
          if (text) {
            controller.enqueue(encoder.encode(text))
          }
        }
        controller.close()
      }
    }),
    { 
      headers: { 
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      } 
    }
  )
}

// In component
async function* streamText(prompt: string) {
  const response = await fetch('/api/generate-text-stream', {
    method: 'POST',
    body: JSON.stringify({ prompt })
  })

  const reader = response.body?.getReader()
  if (!reader) return

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    
    const text = new TextDecoder().decode(value)
    yield text
  }
}
\`\`\`

**Cost Management Tips**

1. Use cheaper models for simple tasks (gpt-3.5-turbo vs gpt-4)
2. Implement caching to avoid duplicate API calls
3. Set token limits to prevent runaway costs
4. Monitor usage with rate limiting
5. Consider embedding local caching layer
    `
  },
  {
    id: 'edge-ml',
    title: 'Edge ML Models - Running AI Locally',
    icon: Code,
    content: `
**TensorFlow.js for In-Browser ML**

Run pre-trained models directly in the browser. No server required.

\`\`\`typescript
// Image classification example
import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'

export async function classifyImage(imageElement: HTMLImageElement) {
  // Load pre-trained model
  const model = await mobilenet.load()
  
  // Run inference
  const predictions = await model.classify(imageElement, 3)
  
  return predictions.map(p => ({
    className: p.className,
    probability: (p.probability * 100).toFixed(2)
  }))
}

// Usage in React
'use client'

import { useRef, useState } from 'react'

export function ImageClassifier() {
  const imageRef = useRef<HTMLImageElement>(null)
  const [predictions, setPredictions] = useState([])

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    const img = new Image()
    img.src = url

    img.onload = async () => {
      if (imageRef.current) {
        const results = await classifyImage(imageRef.current)
        setPredictions(results)
      }
    }

    if (imageRef.current) {
      imageRef.current.src = url
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block"
      />
      <img ref={imageRef} alt="Upload preview" className="w-64 h-64 object-cover" />
      
      <div className="space-y-2">
        {predictions.map((pred, i) => (
          <div key={i} className="flex justify-between">
            <span>{pred.className}</span>
            <span className="font-bold">{pred.probability}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
\`\`\`

**Sentence Transformers for Text Embedding**

Convert text to vectors for similarity matching, semantic search:

\`\`\`typescript
// Text similarity using Xenova transformers (browser-based)
import { pipeline } from '@xenova/transformers'

export async function getSimilarity(text1: string, text2: string) {
  // Create embeddings pipeline (downloads model on first run)
  const extractor = await pipeline(
    'feature-extraction',
    'Xenova/all-MiniLM-L6-v2'
  )

  // Get embeddings
  const [emb1, emb2] = await Promise.all([
    extractor(text1, { pooling: 'mean', normalize: true }),
    extractor(text2, { pooling: 'mean', normalize: true })
  ])

  // Calculate cosine similarity
  const dotProduct = emb1.data.reduce(
    (sum, a, i) => sum + (a * emb2.data[i]),
    0
  )
  
  return dotProduct // 0-1 similarity score
}

// Usage
const similarity = await getSimilarity(
  'I love this product',
  'This is amazing'
)
console.log('Similarity:', similarity) // ~0.9 (very similar)
\`\`\`

**Real-Time Speech Recognition**

\`\`\`typescript
'use client'

import { useEffect, useState } from 'react'

export function SpeechRecognizer() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')

  useEffect(() => {
    // Use Web Speech API
    const SpeechRecognition = 
      window.SpeechRecognition || 
      (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      console.error('Speech Recognition not supported')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true

    recognition.onresult = (event) => {
      let finalTranscript = ''
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        finalTranscript += transcript
      }

      setTranscript(finalTranscript)
    }

    if (isListening) {
      recognition.start()
    } else {
      recognition.stop()
    }

    return () => recognition.stop()
  }, [isListening])

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsListening(!isListening)}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <div className="p-4 bg-surface rounded">
        <p>{transcript || 'Waiting for speech...'}</p>
      </div>
    </div>
  )
}
\`\`\`

**Advantages of Edge ML**

- Instant results (no network latency)
- Works offline
- No recurring API costs
- Data stays on user's device
- No rate limiting issues
    `
  },
  {
    id: 'hybrid',
    title: 'Hybrid Approach - Best of Both Worlds',
    icon: Database,
    content: `
Combine cloud APIs for complex tasks and edge models for simple ones.

**Example: Smart Content Moderation**

\`\`\`typescript
// Hybrid content moderation pipeline
import { pipeline } from '@xenova/transformers'
import { OpenAI } from 'openai'

export async function moderateContent(text: string) {
  // Step 1: Quick local classification (edge ML)
  const classifier = await pipeline('zero-shot-classification', 'Xenova/distilbert-base-uncased-mnli')
  
  const classification = await classifier(text, [
    'spam',
    'inappropriate',
    'safe'
  ])

  const isSuspicious = classification.scores[0] > 0.7 || 
                       classification.scores[1] > 0.7

  // Step 2: If suspicious, send to cloud API for detailed analysis
  if (isSuspicious) {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'user',
        content: \`Analyze this text for content policy violations: "\${text}"\`
      }],
      max_tokens: 100,
    })

    return {
      quickCheck: classification.labels[0],
      detailedAnalysis: response.choices[0].message.content,
      requiresReview: true
    }
  }

  return {
    quickCheck: classification.labels[0],
    requiresReview: false
  }
}
\`\`\`

**Example: Semantic Search**

\`\`\`typescript
// Backend: Generate embeddings for documents
import { OpenAI } from 'openai'

const openai = new OpenAI()

export async function generateEmbeddings(documents: string[]) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: documents,
  })

  return response.data.map(item => ({
    embedding: item.embedding,
    index: item.index,
  }))
}

// Frontend: Local similarity search
export function findSimilarDocuments(
  query: string,
  queryEmbedding: number[],
  documents: Array<{ text: string; embedding: number[] }>
) {
  // Cosine similarity locally
  const similarities = documents.map(doc => ({
    text: doc.text,
    score: cosineSimilarity(queryEmbedding, doc.embedding)
  }))

  return similarities.sort((a, b) => b.score - a.score).slice(0, 5)
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, x, i) => sum + (x * b[i]), 0)
  const normA = Math.sqrt(a.reduce((sum, x) => sum + x * x, 0))
  const normB = Math.sqrt(b.reduce((sum, x) => sum + x * x, 0))
  return dotProduct / (normA * normB)
}
\`\`\`

**Decision Matrix**

Use cloud APIs when:
- Task requires complex reasoning
- You need latest model updates
- Speed isn't critical
- Model size too large for browser
- Specialized models not available locally

Use edge ML when:
- Low latency critical
- Offline capability needed
- User privacy paramount
- Cost sensitive (no API calls)
- Real-time interactivity needed
    `
  },
  {
    id: 'practical-considerations',
    title: 'Practical Considerations & Pitfalls',
    icon: AlertCircle,
    content: `
**Latency Management**

API calls add latency. Show loading states and optimize requests:

\`\`\`typescript
// Debounce AI API calls
import { useMemo } from 'react'
import { debounce } from 'lodash'

export function SearchWithAI() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const debouncedSearch = useMemo(
    () => debounce(async (q: string) => {
      if (q.length < 2) return
      
      const response = await fetch('/api/ai-search', {
        method: 'POST',
        body: JSON.stringify({ query: q })
      })
      const data = await response.json()
      setResults(data)
    }, 300),
    []
  )

  return (
    <div>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          debouncedSearch(e.target.value)
        }}
        placeholder="Search with AI..."
      />
      {results.map(result => (
        <div key={result.id}>{result.title}</div>
      ))}
    </div>
  )
}
\`\`\`

**Cost Management**

\`\`\`typescript
// Rate limiting and cost tracking
import Redis from 'ioredis'

const redis = new Redis()

export async function rateLimitedAICall(userId: string, apiCall: () => Promise<any>) {
  const key = \`ai-calls:\${userId}\`
  const count = await redis.incr(key)
  
  // Reset daily
  if (count === 1) {
    await redis.expire(key, 86400)
  }

  // Limit to 100 calls per day
  if (count > 100) {
    throw new Error('Rate limit exceeded')
  }

  // Track cost
  await redis.incrby(\`ai-cost:\${userId}\`, 1)

  return apiCall()
}
\`\`\`

**Error Handling**

\`\`\`typescript
export async function robustAICall(apiCall: () => Promise<any>, fallback: any) {
  const MAX_RETRIES = 3
  const RETRY_DELAY = 1000

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await apiCall()
    } catch (error) {
      if (attempt === MAX_RETRIES - 1) {
        console.error('AI API failed:', error)
        return fallback // Return safe default
      }
      
      // Exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, RETRY_DELAY * Math.pow(2, attempt))
      )
    }
  }
}
\`\`\`

**Data Privacy**

\`\`\`typescript
// Never send sensitive data to cloud APIs
function shouldUseCloudAPI(data: string): boolean {
  const sensitivePatterns = [
    /\d{3}-\d{2}-\d{4}/, // SSN
    /\d{13,19}/, // Credit card
    /password/i,
  ]
  
  return !sensitivePatterns.some(pattern => pattern.test(data))
}

// For sensitive data, use edge ML or encrypt before sending
\`\`\`

**Common Pitfalls**

1. **Forgetting to validate responses** - AI outputs aren't guaranteed to be correct
2. **Not handling timeouts** - API calls can be slow
3. **Assuming AI is always better** - Sometimes traditional algorithms are better
4. **Ignoring costs** - AI APIs add up quickly at scale
5. **No rate limiting** - One spike can blow your budget
6. **Poor error handling** - Users see cryptic errors when API fails
7. **Ignoring latency** - 500ms API call ruins UX
    `
  },
  {
    id: 'examples',
    title: 'Real-World Examples',
    icon: CheckCircle,
    content: `
**Example 1: AI-Powered Search**

\`\`\`typescript
// Semantic search combining embeddings + traditional search
export async function intelligentSearch(query: string) {
  // Get embedding for query
  const queryEmbedding = await generateEmbedding(query)

  // Search by:
  // 1. Semantic similarity (what does it mean?)
  const semanticResults = await database.search({
    vector: queryEmbedding,
    limit: 10
  })

  // 2. Keyword matching (traditional)
  const keywordResults = await database.search({
    text: { \$text: { \$search: query } }
  })

  // Combine and deduplicate
  const combined = [
    ...semanticResults,
    ...keywordResults
  ].filter((item, i, arr) => 
    arr.findIndex(x => x.id === item.id) === i
  )

  return combined.slice(0, 20)
}
\`\`\`

**Example 2: Smart Email Drafting**

\`\`\`typescript
export async function draftEmail(context: {
  recipient: string
  purpose: string
  tone: string
}) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: 'You are a professional email writer. Write concise, clear emails.'
    }, {
      role: 'user',
      content: \`Write a \${context.tone} email to \${context.recipient} about \${context.purpose}\`
    }],
    max_tokens: 300,
  })

  return response.choices[0].message.content
}
\`\`\`

**Example 3: Real-Time Content Recommendations**

\`\`\`typescript
export async function getRecommendations(userId: string, currentContent: string) {
  // Quick local classification of current content
  const classifier = await getClassifier()
  const classification = await classifier(currentContent, [
    'technology',
    'business',
    'design',
    'productivity'
  ])

  // Get similar content from database
  const category = classification.labels[0]
  const recommendations = await database.query({
    category,
    userId: { \$ne: userId }, // Not by same author
    score: { \$gt: 4 }
  }).limit(5)

  return recommendations
}
\`\`\`
    `
  },
  {
    id: 'future',
    title: 'The Future of Web AI',
    icon: TrendingUp,
    content: `
**What\'s Coming**

1. **Faster Models** - Distilled models run faster on-device
2. **Better Integration** - AI APIs becoming simpler to use
3. **Offline-First** - More capabilities available without internet
4. **Multimodal** - Audio, video, text in single model
5. **Privacy-First** - Encrypted inference, federated learning

**Best Practices Going Forward**

1. **Think about user value** - AI isn't magic, solve real problems
2. **Start simple** - Use APIs first, optimize to edge models if needed
3. **Measure impact** - Track how AI affects your metrics
4. **Be transparent** - Tell users when they're interacting with AI
5. **Handle failures gracefully** - Always have a fallback

**Getting Started Today**

Pick one of these to try:
1. Add ChatGPT to your app (1 hour setup)
2. Add image recognition with TensorFlow.js (2 hour setup)
3. Implement semantic search with embeddings (half day setup)

Start small, learn what works for your users, and iterate.

The AI revolution isn't coming to web development—it's already here. Developers who embrace AI integration thoughtfully will build the best products.
    `
  }
]

export default function AIIntegrationPage() {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <div className="min-h-screen py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {blogPost.category}
            </span>
            {blogPost.tags.map(tag => (
              <span
                key={tag}
                className="px-4 py-2 bg-surface border border-white/10 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {blogPost.title}
          </h1>

          <p className="text-xl text-foreground-secondary mb-8 leading-relaxed">
            {blogPost.excerpt}
          </p>

          <div className="flex flex-col md:flex-row md:items-center gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div>
                <p className="font-semibold">{blogPost.author.name}</p>
                <p className="text-sm text-foreground-secondary">{blogPost.author.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-foreground-secondary text-sm md:ml-auto">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(blogPost.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {blogPost.readTime}
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {blogPost.views} views
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 h-96 bg-gradient-to-br from-accent/20 via-primary/10 to-accent/20 rounded-2xl border border-white/10 flex items-center justify-center"
        >
          <div className="text-center">
            <Brain className="w-24 h-24 mx-auto text-accent mb-4 opacity-50" />
            <p className="text-foreground-secondary">AI Integration for Web Apps</p>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-20 mb-20">
          {sections.map((section, index) => {
            const IconComponent = section.icon
            return (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="scroll-mt-24"
                id={section.id}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-3xl font-bold">{section.title}</h2>
                </div>

                <div className="prose prose-invert max-w-none space-y-4">
                  {section.content.split('\n\n').map((paragraph, i) => {
                    // Handle code blocks
                    if (paragraph.includes('```')) {
                      const parts = paragraph.split('```')
                      return (
                        <div key={i} className="space-y-2">
                          {parts.map((part, j) => {
                            if (j % 2 === 0 && part.trim()) {
                              return (
                                <p
                                  key={j}
                                  className="text-foreground-secondary leading-relaxed"
                                >
                                  {part.trim()}
                                </p>
                              )
                            } else if (j % 2 === 1) {
                              const code = part.split('\n').slice(1).join('\n')
                              return (
                                <pre
                                  key={j}
                                  className="bg-surface-darker border border-white/10 rounded-lg p-4 overflow-x-auto"
                                >
                                  <code className="text-sm text-green-400 font-mono">
                                    {code}
                                  </code>
                                </pre>
                              )
                            }
                            return null
                          })}
                        </div>
                      )
                    }

                    // Handle bullet lists
                    if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n').filter(item => item.trim())
                      return (
                        <ul key={i} className="space-y-2 ml-4">
                          {items.map((item, idx) => (
                            <li key={idx} className="text-foreground-secondary leading-relaxed">
                              {item.replace(/^- /, '• ')}
                            </li>
                          ))}
                        </ul>
                      )
                    }

                    // Handle bold text
                    if (paragraph.includes('**')) {
                      const parts = paragraph.split(/(\*\*[^*]+\*\*)/g)
                      return (
                        <p key={i} className="text-foreground-secondary leading-relaxed">
                          {parts.map((part, idx) =>
                            part.startsWith('**') ? (
                              <span key={idx} className="font-bold">
                                {part.replace(/\*\*/g, '')}
                              </span>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      )
                    }

                    // Regular paragraphs
                    if (paragraph.trim()) {
                      return (
                        <p
                          key={i}
                          className="text-foreground-secondary leading-relaxed"
                        >
                          {paragraph.trim()}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              </motion.section>
            )
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-16" />

        {/* Footer Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLiked(!liked)}
              className={`p-3 rounded-full transition-all duration-200 ${
                liked
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-surface text-foreground-secondary hover:text-red-400'
              }`}
            >
              <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-3 rounded-full transition-all duration-200 ${
                bookmarked
                  ? 'bg-primary/20 text-primary'
                  : 'bg-surface text-foreground-secondary hover:text-primary'
              }`}
            >
              <Bookmark className={`w-6 h-6 ${bookmarked ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-surface text-foreground-secondary hover:text-primary transition-colors duration-200"
            >
              <Share2 className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="flex items-center gap-4 text-sm text-foreground-secondary">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>{blogPost.likes} likes</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>28 comments</span>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-16"
        >
          <h2 className="text-3xl font-bold mb-12">Related Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Building VendorFlow: Fraud Detection in React',
                excerpt: 'How we implemented real-time fraud detection using machine learning.',
                link: '/blog/building-vendorflow-fraud-detection'
              },
              {
                title: 'Next.js Performance: From Good to Great',
                excerpt: 'Advanced techniques for optimizing Next.js applications.',
                link: '/blog/nextjs-performance-optimization'
              }
            ].map((post, index) => (
              <motion.article
                key={index}
                whileHover={{ y: -5 }}
                className="p-6 bg-surface rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300"
              >
                <Link href={post.link} className="group">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-foreground-secondary mb-4">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all duration-200">
                    Read Article <ArrowLeft className="w-4 h-4 rotate-180" />
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
